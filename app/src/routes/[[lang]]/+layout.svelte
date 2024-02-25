<script>

	import { fly } from 'svelte/transition';

	import Nav from '$components/global/Nav.svelte';
	import Footer from '$components/Footer.svelte';
	import SvelteSeo from 'svelte-seo';
	import {SITE_NAME, CANONICAL} from './../../constants';

	import '../../tailwind.css';


	const description = "Portfolio website"
	const image = "https://cdn.sanity.io/images/x1dm0tsa/production/f2125cd93aab9370f915df5828f0c8b179342939-1400x2097.jpg?rect=0,629,1400,840&w=500&h=300"

	export let data;
</script>



  <svelte:head>
	<title>Portfolio i18n</title>
</svelte:head>

  <SvelteSeo
	title={SITE_NAME}
	description={description}
	canonical={CANONICAL + data.pathname}
	keywords="portfolio, photography, design"
	openGraph={{
	  title: {SITE_NAME},
	  description:
	  {description},
		image: {image},
	  url: {CANONICAL},
	  type: "website",
	  site_name: {CANONICAL},
	}}
	twitter={{
	  card: "summary_large_image_test",
	  site: "@portfolio",
	  title: {SITE_NAME},
	  description: {description},
	  image: {image}
	}}

  />



<div class="min-h-screen flex flex-col">
	<header class="header">
		<Nav />
	</header>

	{#key data.pathname}
		<main
			class="flex-grow"
			in:fly={{ y: 50, duration: 250, delay: 300 }}
			out:fly={{ y: 50, duration: 250 }}
		>
			<slot />
		</main>
	{/key}

	<Footer />
</div>


