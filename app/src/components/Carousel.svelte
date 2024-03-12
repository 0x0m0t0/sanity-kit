<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
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
		// 	// Check if the scroll is primarily along the X-axis
		// 	if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
		// 		e.preventDefault(); // Prevent the default behavior only for X-axis scrolling
		// 		if (!wheelActive) {
		// 			wheelStart(e);
		// 			wheelActive = true;
		// 		}
		// 		wheel(e);
		// 		clearTimeout(touchTimeout);
		// 		touchTimeout = setTimeout(() => {
		// 			wheelActive = false;
		// 			wheelEnd(e);
		// 		}, 50);
		// 	}
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

        slider.slides.forEach((slide, idx) => {
            const img = slide.children[0]; 
            if (slider.track.details.rel === idx) {
                img.classList.add('focused');
            } else {
                img.classList.remove('focused');
            }
        });
    }
}
		slider.on('created', () => {
			slider.container.addEventListener('wheel', eventWheel, {
				passive: false
			});
			slider.slides[0].children[0].classList.add('focused');
			slider.slides[1].children[0].style.transformOrigin = 'top right';

		});
	}



	const slideToClicked = (slider) => {
		slider.on('created', () => {
			slider.slides.forEach((element, idx:number) => {
				element.addEventListener('click', () => {
					const rel = slider.track.details.rel;
					// console.log(rel, idx);
					if (rel !== idx) {
						slider.slides.forEach((slide) => {
							slide.children[0].classList.remove('focused'); // children[0]
						});
						slider.moveToIdx(idx);
						element.children[0].classList.add('focused');
					}
				});
			});
		});
	};
	let url: string;


	const updateTransformOrigin = (slider) => {
    slider.on('slideChanged', () => {
        const rel = slider.track.details.rel;
        slider.slides.forEach((slide, idx) => {
            const img = slide.children[0];
            if (idx === rel) {
                // img.classList.add('focused');
                img.style.transformOrigin = 'center center';
            } else if (rel === slider.slides.length - 1 && idx < rel && idx !== 0) {
				img.style.transformOrigin = 'top left';
			}
			else if (rel === slider.slides.length - 1 && idx == 0) {
				img.style.transformOrigin = 'top right';
			}
			else if (idx < rel || rel === 0 && idx === slider.slides.length - 1) {
                // img.classList.remove('focused');
                img.style.transformOrigin = 'top left';
            } else {
                // img.classList.remove('focused');
                img.style.transformOrigin = 'top right';
				console.log('aaaaa')
            }
        });
    });
};


	onMount(() => {
		url = $page.params.slug;
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
			[slideToClicked, WheelControls,updateTransformOrigin]
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

<!-- sizes={'(max-width: 600px) 480px, 80vw'} -->

<style>
	:global(.keen-slider__slide) {
		min-width: calc(100% + 0px);
		max-width: calc(100% + 0px);
		transform: translate3d(0, 0, 0);
	}

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
		/* overflow: hidden; */
		/* width: 100%; */
		/* min-height: 100%; */
	}
	.keen-slider:not([data-keen-slider-disabled])[data-keen-slider-reverse] {
		flex-direction: row-reverse;
	}
	.keen-slider:not([data-keen-slider-disabled])[data-keen-slider-v] {
		flex-wrap: wrap;
	}

	:global(.keen-slider__slide img) {
		/* transform: scale(0.2); */
		transform: scale(0.3);
		opacity: 0.4;
		transition: opacity 1s ease;
		transform-origin: top left;
	}
	:global(.keen-slider__slide img.focused) {
		opacity: 1;
		border: 3px solid red;
		transform: scale(1);
		/* width: 100px; */
		transition: transform 0.5s steps(80);
		transform-origin: center center;
	}
</style>
