import type { HasRelativePos, PanEvent, PEvent } from '$lib/addMoreEvents'
import type { Shape } from './sizes'
import { Vec2 } from './vec2'
export type Element<ShapeType = Shape> = {
	size: ShapeType
	draw(ctx: CanvasRenderingContext2D): void
	_parent?: Element
	_children: Element[]
}

type HasId = {
	_id: string
}

type ElementWithId = Element & HasId

type HasChildren = {
	_children: ElementWithId[]
	addChild(child: Element): number // returns ID
	removeChild(child: ElementWithId): void
	addChildren(children: Element[]): number[] // return IDs
}

export type UsesPTap = {
	onPTap: (e: PEvent) => void
}

export type UsesPPan = {
	onPPan: (e: PanEvent) => boolean
}

export type UsesPPanStart = {
	onPPanStart: (e: PEvent) => void
}

export type UsesPMove = {
	onPMove: (e: PointerEvent & HasRelativePos) => void
}

export type UsesPPanUp = {
	onPPanUp: (e: PEvent) => void
}

export type ElementWithChildren = Element & HasChildren

export const getGlobalPosition: (element: Element) => Vec2 = (element: Element) => {
	const out = new Vec2(element.size.x, element.size.y)
	// base case
	if (!element._parent) {
		return out
	}
	return out.addVec(getGlobalPosition(element._parent))
}

export type Selectable = {
	_selected: boolean
	set selected(v: boolean)
	get selected(): boolean
}

export type HasStates = {
	_state: string
	set state(v: string)
	get state(): string
}
