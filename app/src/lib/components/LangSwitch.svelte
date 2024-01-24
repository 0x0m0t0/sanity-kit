<script lang="ts">
	import { workLang } from '$lib/stores/stores';
	function changeLang(lang: string) {
		workLang.set(lang);
	}

	let language: string;
	workLang.subscribe((value) => {
		language = value;
	});
</script>

<div class="flex flex-col">
	<button on:click={() => changeLang('es')}>switch to es</button>

	<p>current language {language}</p>
</div>
