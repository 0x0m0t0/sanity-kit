<script lang="ts">
	import { onMount } from 'svelte';
	import { PortableText } from '@portabletext/svelte';
	import { formatDate } from '$lib/utils';
	import { urlFor } from '$lib/utils/image';
	import ResImage from '../../../components/ResImage.svelte';
	import type { PageData } from './$types';

	import 'keen-slider/keen-slider.min.css'
	import KeenSlider from 'keen-slider'

	export let data: PageData;
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

<style>
	[class^="number-slide"],
[class*=" number-slide"] {
  background: grey;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 50px;
  color: #fff;
  font-weight: 500;
  height: 300px;
  max-height: 100vh;
}

.number-slide1 {
  background: rgb(64, 175, 255);
  background: linear-gradient(
    128deg,
    rgba(64, 175, 255, 1) 0%,
    rgba(63, 97, 255, 1) 100%
  );
}

.number-slide2 {
  background: rgb(255, 75, 64);
  background: linear-gradient(
    128deg,
    rgba(255, 154, 63, 1) 0%,
    rgba(255, 75, 64, 1) 100%
  );
}

.number-slide3 {
  background: rgb(182, 255, 64);
  background: linear-gradient(
    128deg,
    rgba(182, 255, 64, 1) 0%,
    rgba(63, 255, 71, 1) 100%
  );
  background: linear-gradient(
    128deg,
    rgba(189, 255, 83, 1) 0%,
    rgba(43, 250, 82, 1) 100%
  );
}

.number-slide4 {
  background: rgb(64, 255, 242);
  background: linear-gradient(
    128deg,
    rgba(64, 255, 242, 1) 0%,
    rgba(63, 188, 255, 1) 100%
  );
}

.number-slide5 {
  background: rgb(255, 64, 156);
  background: linear-gradient(
    128deg,
    rgba(255, 64, 156, 1) 0%,
    rgba(255, 63, 63, 1) 100%
  );
}
.number-slide6 {
  background: rgb(64, 76, 255);
  background: linear-gradient(
    128deg,
    rgba(64, 76, 255, 1) 0%,
    rgba(174, 63, 255, 1) 100%
  );
}

</style>

<div id="my-keen-slider" class="keen-slider">
	<div class="keen-slider__slide number-slide1">1</div>
	<div class="keen-slider__slide number-slide2">2</div>
	<div class="keen-slider__slide number-slide3">3</div>
	<div class="keen-slider__slide number-slide4">4</div>
	<div class="keen-slider__slide number-slide5">5</div>
	<div class="keen-slider__slide number-slide6">6</div>
  </div>
<section class="post">
	{#if data.mainImage}
		<img
			class="post__cover"
			src={urlFor(data.mainImage).url()}
			alt="Cover image for {data.title}"
		/>

	<div class='w-full'>
		<ResImage image={data.mainImage} sizes={"(max-width: 600px) 480px, 80vw"}
			alt={data.title ? data.title : "Cover image"} />

		<!-- // (max-width: 600px) 480px, 800px -->

	</div>

	{:else}
		<div class="post__cover--none" />
	{/if}
	<div class="post__container">
		<h1 class="post__title">{data.title}</h1>
		<p class="post__excerpt">{data.excerpt}</p>
		<p class="post__date">
			{formatDate(data._createdAt)}
		</p>
		<div class="post__content">
			<PortableText value={data.body} />
		</div>
	</div>
</section>
