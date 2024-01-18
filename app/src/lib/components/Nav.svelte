<script lang="ts">
	const LINKS = [
		{ name: 'Home', href: '/' },
		{ name: 'About', href: '/about' },
		{ name: 'Test', href: '/test' }
		// { name: 'Contact', href: '/contact' },
	];
</script>

<nav class="w-full flex justify-center" aria-label={'Primary navigation'}>
	{#each LINKS as { name, href }, i}
		<a {href} class="text-sm text-gray hover:text-blue hover:bg-gray mr-2 last:mr-0">{name}</a>
	{/each}
</nav>
