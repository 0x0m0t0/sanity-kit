<script lang="ts">
	import { onMount, onDestroy} from 'svelte';

	import { page } from '$app/stores';
	import KeenSlider from 'keen-slider';
	import ResImage from './ResImage.svelte';

	export let images: any;

	let slider: any;

	let isSliderInitialized = false;

	function WheelControls(slider) {
			var touchTimeout;
			var position;
			var wheelActive;

			function dispatch(e, name) {
				position.x -= e.deltaX;
				// position.y -= e.deltaY
				position.y = 0;
				slider.container.dispatchEvent(
					new CustomEvent(name, {
						detail: {
							x: position.x,
							y: position.y
						}
					})
				);
			}

			function wheelStart(e) {
				position = {
					x: e.pageX,
					y: e.pageY
				};
				dispatch(e, 'ksDragStart');
			}

			function wheel(e) {
				dispatch(e, 'ksDrag');
			}

			function wheelEnd(e) {
				dispatch(e, 'ksDragEnd');
			}

			// function eventWheel(e) {
			//   e.preventDefault()
			//   if (!wheelActive) {
			//     wheelStart(e)
			//     wheelActive = true
			//   }
			//   wheel(e)
			//   clearTimeout(touchTimeout)
			//   touchTimeout = setTimeout(() => {
			//     wheelActive = false
			//     wheelEnd(e)
			//   }, 50)
			// }

			function eventWheel(e) {
				// Check if the scroll is primarily along the X-axis
				if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
					e.preventDefault(); // Prevent the default behavior only for X-axis scrolling
					if (!wheelActive) {
						wheelStart(e);
						wheelActive = true;
					}
					wheel(e);
					clearTimeout(touchTimeout);
					touchTimeout = setTimeout(() => {
						wheelActive = false;
						wheelEnd(e);
					}, 50);
				}
			}

			slider.on('created', () => {
				slider.container.addEventListener('wheel', eventWheel, {
					passive: false
				});
			});
		}

	const slideToClicked = (slider) => {
			slider.on('created', () => {
				slider.slides.forEach((element, idx) => {
					element.addEventListener('click', () => {
						const rel = slider.track.details.rel;
						if (rel !== idx) slider.moveToIdx(idx);
					});
				});
			});
		};
		let url :string;
	onMount(() => {
		url = $page.params.slug
		slider = new KeenSlider(
			'#my-keen-slider',
			{
				loop: true,
				mode: 'free-snap',
				slides: {
					perView: 3,
					origin: 'center',
					spacing: 15
				}
			},
			[slideToClicked, WheelControls]
		);
		isSliderInitialized = true;

	});

	onDestroy(() => {

 if (slider && url !== $page.params.slug) {
	slider.destroy();
 }
		if (slider && url == $page.params.slug) {
			slider.destroy();
				slider = new KeenSlider(
    '#my-keen-slider',
    {
      loop: true,
      mode: 'free-snap',
      slides: {
        perView: 3,
        origin: 'center',
        spacing: 15
      }
    },
    [slideToClicked, WheelControls]
  );
		}
	});




</script>

<div id="my-keen-slider" class="keen-slider" class:initialized={isSliderInitialized}>
	{#each images as image}
		<div class="keen-slider__slide w-[33vw] cursor-pointer">
			<ResImage {image} sizes={'33vw'} alt={image.caption ? image.caption : 'Cover image'} />
		</div>
	{/each}
</div>




<style>

.keen-slider:not(.initialized) {
    visibility: hidden;
  }

.keen-slider:not([data-keen-slider-disabled]) {
  align-content: flex-start;
  display: flex;
  overflow: hidden;
  position: relative;
  -webkit-user-select: none;
     -moz-user-select: none;
      -ms-user-select: none;
          user-select: none;
  -webkit-touch-callout: none;
  -khtml-user-select: none;
  touch-action: pan-y;
  -webkit-tap-highlight-color: transparent;
  width: 100%;
}
.keen-slider:not([data-keen-slider-disabled]) .keen-slider__slide {
  position: relative;
  overflow: hidden;
  width: 100%;
  min-height: 100%;
}
.keen-slider:not([data-keen-slider-disabled])[data-keen-slider-reverse] {
  flex-direction: row-reverse;
}
.keen-slider:not([data-keen-slider-disabled])[data-keen-slider-v] {
  flex-wrap: wrap;
}
</style>

<!-- sizes={'(max-width: 600px) 480px, 80vw'} -->