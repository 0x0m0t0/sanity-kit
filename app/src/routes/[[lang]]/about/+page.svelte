<script lang="ts">
	import type { PageData } from './$types';
	export let data: PageData;
	console.log('about', data);
</script>

<section>
	{#if data.posts.length}
		<!-- <h2>{data.post.title}</h2> -->
	{:else}
		<p>"No about post yet."</p>
	{/if}
</section>
