<script>
	import { page } from '$app/stores';

	$: lang = $page.params.lang ?? 'testoo';
</script>

<!-- <nav>
	<a href="/">default</a>
	<a href="/en">english</a>
	<a href="/test/de">german</a>
	<a href="/test/fr">french</a>
</nav> -->

{lang}
<slot />
