import { browser } from '$app/environment'
import { readable } from 'svelte/store'

type Size = {
	width: number
	height: number
}

export function clientSizeStore(element: HTMLElement) {
	return readable<Size>(
		{ width: element.clientWidth, height: element.clientHeight },
		function start(set) {
			function setSize() {
				set({ width: element.clientWidth, height: element.clientHeight })
			}
			if (browser && 'ResizeObserver' in window) {
				const resizeObserver = new ResizeObserver(setSize)
				resizeObserver.observe(element)
				return () => resizeObserver.unobserve(element)
			} else {
				window.addEventListener('resize', setSize)
				return () => window.removeEventListener('resize', setSize)
			}
		}
	)
}
