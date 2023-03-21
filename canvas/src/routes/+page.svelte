<script lang="ts">
	import MathCanvas from '$lib/MathCanvas/MathCanvas.svelte'
	import './styles/global.css'
	import './styles/reset.css'
	import init, { m1_op_to_matrix } from 'linear-algebra'
	import { onMount } from 'svelte'
	onMount(async () => {
		await init()
		console.log(
			m1_op_to_matrix(
				[
					[1, 2, 3],
					[4, 5, 6],
					[7, 8, 9]
				],
				'rref'
			)
		)
	})
</script>

<MathCanvas />
