import colors from '$lib/colors'
import type {
	Selectable,
	HasStates,
	UsesPPan,
	UsesPPanStart,
	UsesPTap,
	UsesPMove,
	UsesPPanUp
} from '$lib/PannableCanvas/element'
import { Circle } from '$lib/PannableCanvas/sizes'
import { Vec2 } from '$lib/PannableCanvas/vec2'
import type { Element } from '$lib/PannableCanvas/element'
import type { PEvent, PointersDict } from '$lib/addMoreEvents'
import type { Writable } from 'svelte/store'
import type PannableCanvas__SvelteComponent_ from '$lib/PannableCanvas'

function drawWhenSelectingMatrixSize(ctx: CanvasRenderingContext2D) {}

const GRID_SIZE = 100

const ACTIVE_CIRCLE_SIZE = 15

function drawWhenTentative(cursor: CursorElement, pointer: Vec2, ctx: CanvasRenderingContext2D) {
	const { x, y, radius } = cursor.size as Circle
	ctx.beginPath()
	ctx.fillStyle = colors.violet500 + '20'
	ctx.arc(x, y, radius, 0, 2 * Math.PI)
	ctx.fill()

	ctx.beginPath()
	ctx.fillStyle = colors.violet500 + '20'
	ctx.arc(x, y, GRID_SIZE, 0, 2 * Math.PI)
	ctx.fill()

	const fromCenter = pointer.sub(x, y)

	const activePointerNormalized = fromCenter.normalize()
	const fromCenterMag = fromCenter.mag()
	const xOffset = (activePointerNormalized.x * fromCenterMag) / 2
	const yOffset = (activePointerNormalized.y * fromCenterMag) / 2
	ctx.beginPath()
	ctx.arc(x + xOffset, y + yOffset, ACTIVE_CIRCLE_SIZE, 0, 2 * Math.PI)
	ctx.fillStyle = colors.violet900
	ctx.fill()
}

function drawWhenSelecting(cursor: CursorElement, pointer: Vec2, ctx: CanvasRenderingContext2D) {
	const { x, y, radius } = cursor.size as Circle
	ctx.beginPath()
	ctx.fillStyle = colors.violet500 + '40'
	ctx.arc(x, y, radius, 0, 2 * Math.PI)
	ctx.fill()

	const fromCenter = pointer.sub(x, y)

	const activePointerNormalized = fromCenter.normalize()
	const fromCenterMag = fromCenter.mag()
	const magnitude = Math.min(fromCenterMag - ACTIVE_CIRCLE_SIZE, GRID_SIZE - ACTIVE_CIRCLE_SIZE)
	const xOffset = activePointerNormalized.x * magnitude
	const yOffset = activePointerNormalized.y * magnitude
	ctx.beginPath()
	ctx.arc(x + xOffset, y + yOffset, ACTIVE_CIRCLE_SIZE, 0, 2 * Math.PI)
	ctx.fillStyle = colors.violet900
	ctx.fill()
}

function drawWhenMaking(cursor: CursorElement, pointer: Vec2, ctx: CanvasRenderingContext2D) {
	// TODO
}

function drawWhenMakingMatrix(
	cursor: CursorElement,
	pointer: Vec2,
	ctx: CanvasRenderingContext2D
) {}

function drawWhenSelected(cursor: CursorElement, pointer: Vec2, ctx: CanvasRenderingContext2D) {
	if (cursor.state == TENTATIVE) {
		drawWhenTentative(cursor, pointer, ctx)
	} else if (cursor.state == SELECTING) {
		drawWhenSelecting(cursor, pointer, ctx)
	}
}

function drawWhenNotSelected(cursor: CursorElement, ctx: CanvasRenderingContext2D) {
	ctx.fillStyle = colors.violet900
	ctx.beginPath()
	const { x, y, radius } = cursor.size as Circle
	ctx.arc(x, y, radius, 0, 2 * Math.PI)
	ctx.fill()
}

function setRadiusWhenUnselected(cursor: CursorElement, pointer: Vec2) {
	const pos = pointer.map((x) => {
		// added 1/2 to make the grid snap on half-lines.
		// improves user experience compared to snapping
		// to top right of square
		const decCoord = x / GRID_SIZE + 1 / 2
		return Math.floor(decCoord) * GRID_SIZE
	})
	const dist = pos.distanceTo(pointer)
	let radius = Vec2.lerpFunc(2, ACTIVE_CIRCLE_SIZE, 1 - dist / ACTIVE_CIRCLE_SIZE)
	if (radius < 0) radius = 0
	cursor.size = new Circle(pos.x, pos.y, radius)
}

function onPMove(cursor: CursorElement, pointer: Vec2) {
	if (!cursor.selected) return

	const fromCenter = cursor.size.getCenter().subVec(pointer)
	const distFromCenter = fromCenter.mag()

	if (cursor.state == TENTATIVE && distFromCenter > 50) {
		cursor.state = SELECTING
	} else if (cursor.state == SELECTING && distFromCenter > 100) {
		cursor.state = MAKING
	}
}
function onPPan(cursor: CursorElement, pointer: Vec2) {
	if (!cursor.selected) {
		return true
	}
	const fromCenter = cursor.size.getCenter().subVec(pointer)
	const distFromCenter = fromCenter.mag()

	if (cursor.state == TENTATIVE && distFromCenter > 50) {
		cursor.state = SELECTING
	} else if (cursor.state == SELECTING && distFromCenter > 100) {
		cursor.state = MAKING
	}
	if (cursor.typeOfSelect == DRAGGING) {
		return false
	}

	if (cursor.typeOfSelect == OPENED && cursor.size.contains(cursor.downCoords)) {
		return false
	}
	return true
}

function onPPanUp(cursor: CursorElement, pointer: Vec2) {
	if (cursor.typeOfSelect == DRAGGING && cursor.state != MAKING) {
		cursor.selected = false
	}
	if (
		cursor.typeOfSelect == OPENED &&
		cursor.state == SELECTING &&
		!cursor.size.contains(pointer)
	) {
		cursor.selected = false
	}
}
function onPPanStart(cursor: CursorElement, pointer: Vec2) {
	cursor.downCoords = pointer.copy()
	if (!cursor.selected && cursor.size.contains(pointer)) {
		cursor.selected = true
		cursor.typeOfSelect = DRAGGING
		cursor.state = TENTATIVE
	}
}
function onPTap(cursor: CursorElement, pointer: Vec2) {
	if (cursor.selected) {
		// if tap outside select circle then deselect
		if (cursor.typeOfSelect == OPENED && cursor.state != MAKING && !cursor.size.contains(pointer)) {
			cursor.selected = false
			return
		}

		// if initially a drag which was released before dragging far
		if (cursor.typeOfSelect == DRAGGING && cursor.state == TENTATIVE) {
			cursor.typeOfSelect = OPENED
			return
		}

		// Toggle closed if still tentative
		if (cursor.typeOfSelect == OPENED && cursor.state == TENTATIVE) {
			cursor.selected = false
		}
	} else {
		// if tap near center and not selected
		if (cursor.size.contains(pointer)) {
			cursor.typeOfSelect = OPENED
			cursor.selected = true
		}
	}
}

// typeOfSelect
const OPENED = 0 // 001 = 1
const DRAGGING = 1 // 010 = 2

// state
const TENTATIVE = 0 // before committing
const SELECTING = 1 // after dragging outside inner circle; selecting action
const MAKING = 2 // after dragging outside outer circle; selecting matrix size
export type CursorElement = Element &
	Selectable &
	UsesPPan &
	UsesPPanStart &
	UsesPTap &
	UsesPMove &
	UsesPPanUp & {
		_typeOfSelect: 0 | 1 // OPENED | DRAGGING
		set typeOfSelect(v: 0 | 1)
		get typeOfSelect()

		_state: 0 | 1 | 2 // TENATIVE | SELECTING | MAKING
		set state(v: 0 | 1 | 2)
		get state()
	} & {
		downCoords: Vec2
	}

export function getCursorElement(panCanvas: PannableCanvas__SvelteComponent_): CursorElement {
	let activePointer: Vec2 | null = null
	const out: CursorElement = {
		size: new Circle(0, 0, 0),
		draw: function (ctx: CanvasRenderingContext2D) {
			if (!activePointer) return
			if (out.selected) {
				drawWhenSelected(out, activePointer, ctx)
				return
			}
			drawWhenNotSelected(out, ctx)
		},
		get selected() {
			return out._selected
		},
		set selected(val: boolean) {
			out._selected = val
			out.state = TENTATIVE
			if (activePointer && !val) {
				const pos = activePointer.map((x) => Math.floor((x + 50) / 100) * 100)
				let radius = 0
				out.size = new Circle(pos.x, pos.y, radius)
			}
			panCanvas.draw()
		},
		_selected: false,
		_children: [],
		onPPan: (e) => {
			const ctx = panCanvas.getContext()
			if (!ctx) return true
			activePointer = panCanvas.vecScreenSpaceToCanvasSpace(new Vec2(e.relativeX, e.relativeY), ctx)
			if (!activePointer) return true
			if (!out.selected) {
				setRadiusWhenUnselected(out, activePointer)
			}
			const o = onPPan(out, activePointer)
			panCanvas.draw()
			return o
		},
		onPPanStart: (e) => {
			const ctx = panCanvas.getContext()
			if (!ctx) return
			activePointer = panCanvas.vecScreenSpaceToCanvasSpace(new Vec2(e.relativeX, e.relativeY), ctx)
			if (!out.selected && activePointer) {
				setRadiusWhenUnselected(out, activePointer)
			}
			if (activePointer) onPPanStart(out, activePointer)
		},
		onPTap: (e) => {
			if (activePointer) onPTap(out, activePointer)
			panCanvas.draw()
		},
		onPMove: (e) => {
			const ctx = panCanvas.getContext()
			if (!ctx) return
			activePointer = panCanvas.vecScreenSpaceToCanvasSpace(new Vec2(e.relativeX, e.relativeY), ctx)
			if (!out.selected && activePointer) {
				setRadiusWhenUnselected(out, activePointer)
			}
			if (activePointer) onPMove(out, activePointer)

			panCanvas.draw()
		},
		onPPanUp: (e) => {
			if (activePointer) onPPanUp(out, activePointer)
		},

		_state: 0,
		set state(v: 0 | 1 | 2) {
			switch (v) {
				case TENTATIVE:
					;(out.size as Circle).radius = GRID_SIZE / 2
					break
				case SELECTING:
					;(out.size as Circle).radius = GRID_SIZE
					break
				case MAKING:
					break
			}
			out._state = v
		},
		get state() {
			return out._state
		},

		_typeOfSelect: 0,
		set typeOfSelect(v: 0 | 1) {
			switch (v) {
				case OPENED:
					break
				case DRAGGING:
					break
			}
			out._typeOfSelect = v
		},
		get typeOfSelect() {
			return out._typeOfSelect
		},

		downCoords: Vec2.zero
	}

	return out
}
