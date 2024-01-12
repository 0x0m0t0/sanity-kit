<script lang="ts">
	import { onMount } from 'svelte';
  	import type { PageData } from './$types';

  	import 'keen-slider/keen-slider.min.css'
  	import KeenSlider from 'keen-slider'

  	export let image: any;
  	
	let slider: any;

  onMount(() => {
  
	function WheelControls(slider) {
        var touchTimeout
        var position
        var wheelActive

        function dispatch(e, name) {
          position.x -= e.deltaX
          position.y -= e.deltaY
          slider.container.dispatchEvent(
            new CustomEvent(name, {
              detail: {
                x: position.x,
                y: position.y,
              },
            })
          )
        }

        function wheelStart(e) {
          position = {
            x: e.pageX,
            y: e.pageY,
          }
          dispatch(e, "ksDragStart")
        }

        function wheel(e) {
          dispatch(e, "ksDrag")
        }

        function wheelEnd(e) {
          dispatch(e, "ksDragEnd")
        }

        function eventWheel(e) {
          e.preventDefault()
          if (!wheelActive) {
            wheelStart(e)
            wheelActive = true
          }
          wheel(e)
          clearTimeout(touchTimeout)
          touchTimeout = setTimeout(() => {
            wheelActive = false
            wheelEnd(e)
          }, 50)
        }

        slider.on("created", () => {
          slider.container.addEventListener("wheel", eventWheel, {
            passive: false,
          })
        })
      }


	  
	   const slideToClicked= (slider) => {
		  slider.on("created", () => {
			slider.slides.forEach((element, idx) => {
			  element.addEventListener("click", () => {
				const rel = slider.track.details.rel;
				if (rel !== idx) slider.moveToIdx(idx);
			  });
			});
		  });
		};
	  

	slider = new KeenSlider("#my-keen-slider", {
	  loop: true,
	  mode: "free-snap",
	  slides: {
		perView: 3,
		origin: "center",
		spacing: 15,
	  },
	}, [slideToClicked,WheelControls])
  });
</script>


<div id="my-keen-slider" class="keen-slider">
	

	{#each data.posts as post}
	<div class="keen-slider__slide number-slide1">1</div>
	{/each}

  </div>