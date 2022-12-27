<script>
	import Login from "$lib/Login.svelte";
	import Navbar from "$lib/Navbar.svelte";
	import Words from "$lib/Words.svelte";



</script>
<Navbar/>
<div class="mx-auto w-96">
    <h1 class="text-xl font-bold text-center mb-2">Welcome to PocketRussian</h1>
    <p>PocketRussia allows it's users to learn russian vocabulary throough concrete sentences examples.</p>
    <p class="mt-2">It's based on a database of more than <strong>400 000</strong> sentences and <strong>91 000</strong> words.</p>

    <Words/>
</div>
