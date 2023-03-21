<script lang="ts">
	import type {
		ZoomEvent,
		PanEvent,
		PEvent,
		PPinchEvent,
		PointersDict,
		HasRelativePos
	} from '$lib/addMoreEvents'
	import { createEventDispatcher } from 'svelte'
	import { detach } from 'svelte/internal'
	import { writable, type Writable } from 'svelte/store'
	import GestureCanvas from '../GestureCanvas.svelte'
	import type { Element } from './element'
	import { Rect } from './sizes'
	import { Vec2 } from './vec2'
	export let canvas: HTMLCanvasElement
	export let children: Element[]
	export let pointersWritable: Writable<PointersDict> = writable({})
	export let pointersWritableProxy: Writable<PointersDict> = writable({})
	export let pPan: (e: CustomEvent<PanEvent>, ctx: CanvasRenderingContext2D) => boolean = () => true
	const dispatch = createEventDispatcher<{
		ppanstart: PEvent
		ppinchdown: PPinchEvent
		ppinchup: PPinchEvent
		pholdup: PEvent
		ppanup: PEvent
		ppinch: PPinchEvent
		zoom: ZoomEvent
		pmove: PointerEvent & HasRelativePos
		ppan: PanEvent
		ptap: PEvent
		initialized: void
	}>()
	let ctx: CanvasRenderingContext2D | null
	$: {
		ctx = canvas?.getContext('2d')
		if (ctx) {
			dispatch('initialized')
			drawWithContext(ctx)
		}
	}
	let zoomAmount = 1
	let zoomTranslate = new Vec2(0, 0)

	pointersWritableProxy.subscribe((pointers) => {
		// deep copy
		const pointersCopy: PointersDict = JSON.parse(JSON.stringify(pointers))
		Object.values(pointersCopy).forEach((pointer) => {
			if (!ctx) return
			const relative = screenSpaceToCanvasSpace(pointer.relativeX, pointer.relativeY, ctx)
			pointer.relativeX = relative.x
			pointer.relativeY = relative.y
		})
		pointersWritable.set(pointersCopy)
	})

	function drawWithContext(ctx: CanvasRenderingContext2D) {
		ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
		ctx.save()
		ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2)
		ctx.scale(zoomAmount, zoomAmount)
		ctx.translate(zoomTranslate.x, zoomTranslate.y)
		children.map((child) => child.draw(ctx))
		ctx.restore()
	}

	export function draw() {
		if (!ctx) return
		drawWithContext(ctx)
	}

	export function drawElement(element: Element) {
		if (!ctx) return
		console.log('drawElement')
		ctx.save()
		ctx.translate(ctx.canvas.width / 2, ctx.canvas.height / 2)
		ctx.scale(zoomAmount, zoomAmount)
		ctx.translate(zoomTranslate.x, zoomTranslate.y)
		element.draw(ctx)
		ctx.restore()
	}

	export function screenSpaceToCanvasSpace(x: number, y: number, ctx: CanvasRenderingContext2D) {
		return vecScreenSpaceToCanvasSpace(new Vec2(x, y), ctx)
	}

	export function vecScreenSpaceToCanvasSpace(vec: Vec2, ctx: CanvasRenderingContext2D) {
		return vec
			.sub(ctx.canvas.width / 2, ctx.canvas.height / 2)
			.divScalar(zoomAmount)
			.subVec(zoomTranslate)
	}

	export function getScale() {
		return zoomAmount
	}

	export function getContext() {
		return ctx
	}

	export function canvasSpaceToScreenSpace(x: number, y: number) {
		if (!ctx) return
		return new Vec2(
			(x + zoomTranslate.x) * zoomAmount + ctx.canvas.width / 2,
			(y + zoomTranslate.y) * zoomAmount + ctx.canvas.height / 2
		)
	}

	export function vecCanvasSpaceToScreenSpace(vec: Vec2) {
		if (!ctx) return
		return vec
			.addVec(zoomTranslate)
			.mulScalar(zoomAmount)
			.add(ctx.canvas.width / 2, ctx.canvas.height / 2)
	}

	export function getScreenSize(ctx: CanvasRenderingContext2D) {
		const xy = screenSpaceToCanvasSpace(0, 0, ctx)
		return new Rect(xy.x, xy.y, ctx.canvas.width / zoomAmount, ctx.canvas.height / zoomAmount)
	}

	let zoomTranslateOnDown: Vec2 | null = null
	function saveZoomTranslate() {
		zoomTranslateOnDown = zoomTranslate.copy()
	}

	function onZoom(e: CustomEvent<ZoomEvent>) {
		if (!ctx || !canvas) return
		const { scaleAmount, relativeX, relativeY } = e.detail
		const oldZoom = zoomAmount
		zoomAmount *= scaleAmount
		const newZoom = zoomAmount
		const xOffset = relativeX - ctx.canvas.width / 2
		const yOffset = relativeY - ctx.canvas.height / 2
		zoomTranslate = zoomTranslate.add(
			xOffset / newZoom - xOffset / oldZoom,
			yOffset / newZoom - yOffset / oldZoom
		)
		drawWithContext(ctx)
		dispatch('zoom', e.detail)
	}
	function onPPan(e: CustomEvent<PanEvent>) {
		if (!ctx || !canvas || !pPan(e, ctx) || !zoomTranslateOnDown) return
		const { relativeX, relativeY, downX, downY } = e.detail
		const deltaX = relativeX - downX
		const deltaY = relativeY - downY
		zoomTranslate = zoomTranslateOnDown.add(deltaX / zoomAmount, deltaY / zoomAmount)
		drawWithContext(ctx)
		dispatch('ppan', e.detail)
	}
</script>

<GestureCanvas
	bind:canvas
	on:ppanstart={(e) => {
		saveZoomTranslate()
		dispatch('ppanstart', e.detail)
	}}
	on:zoom={onZoom}
	on:ppan={onPPan}
	on:ppanup
	on:pholdup
	on:ptap
	on:pmove
/>
