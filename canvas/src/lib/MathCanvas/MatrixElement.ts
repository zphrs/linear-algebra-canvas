import type PannableCanvas__SvelteComponent_ from '$lib/PannableCanvas'
import type { Element, UsesPMove, UsesPPan } from '$lib/PannableCanvas/element'
import { Rect } from '$lib/PannableCanvas/sizes'

type MatrixElement = Element &
	UsesPMove &
	UsesPPan & {
		selecting: boolean
		width: number
		height: number
	}
export function makeMatrixElement(panCanvas: PannableCanvas__SvelteComponent_): MatrixElement {
	const out: MatrixElement = {
		size: new Rect(0, 0, 0, 0),
		width: 0,
		height: 0,
		selecting: true,
		draw: (ctx: CanvasRenderingContext2D) => {
			// TODO
		},
		_children: [],
		onPMove: (e) => {},
		onPPan: (e) => {
			return true
		}
	}
	return out
}
