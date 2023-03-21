<script lang="ts">
	import { browser } from '$app/environment'

	import type { Element, HasStates, Selectable } from '../PannableCanvas/element'
	import PannableCanvas from '../PannableCanvas'
	import { Rect } from '../PannableCanvas/sizes'
	import colors from '../colors'
	import { writable, type Writable } from 'svelte/store'
	import type { PanEvent, PEvent, PointersDict } from '../addMoreEvents'
	import { getCursorElement } from './CursorElement'

	let canvas: HTMLCanvasElement
	let panCanvas: PannableCanvas

	function resize(canvas: HTMLCanvasElement) {
		if (!canvas) return
		canvas.removeAttribute('width')
		canvas.removeAttribute('height')

		canvas.width = canvas.clientWidth
		canvas.height = canvas.clientHeight

		panCanvas.draw()
	}

	const square: Element = {
		draw(ctx: CanvasRenderingContext2D) {
			ctx.fillStyle = colors.violet500 + '20'
			ctx.fillRect(-50, -50, 100, 100)
		},
		size: new Rect(-50, -50, 100, 100),
		_children: []
	}

	const dots: Element = {
		size: new Rect(0, 0, 0, 0),
		draw: function (ctx: CanvasRenderingContext2D) {
			this.size = panCanvas.getScreenSize(ctx)
			ctx.fillStyle = colors.violet900
			const { x, y, width, height } = this.size as Rect
			const { max } = (this.size as Rect).toBounds()
			if (width > 10000 || height > 10000) return
			// draw dots on the grid
			const startingX = Math.floor(x / 100) * 100
			const startingY = Math.floor(y / 100) * 100
			for (let i = startingX; i < max.x + 2 * panCanvas.getScale(); i += 100) {
				for (let j = startingY; j < max.y + 2 * panCanvas.getScale(); j += 100) {
					ctx.beginPath()
					ctx.arc(i, j, 2, 0, 2 * Math.PI)
					ctx.fill()
				}
			}
		},
		_children: []
	}

	$: cursor = getCursorElement(panCanvas)

	$: browser && resize(canvas)
</script>

<svelte:window on:resize={() => resize(canvas)} />

<PannableCanvas
	children={[dots, cursor]}
	bind:this={panCanvas}
	bind:canvas
	pPan={(e) => cursor.onPPan(e.detail)}
	on:ptap={(e) => cursor.onPTap(e.detail)}
	on:ppanstart={(e) => cursor.onPPanStart(e.detail)}
	on:pmove={(e) => cursor.onPMove(e.detail)}
	on:ppanup={(e) => cursor.onPPanUp(e.detail)}
/>

<slot />
