<script>
    import { currentUser, pb } from "./pocketbase";
    async function logout() {
        pb.authStore.clear()
    }
</script>

<nav class="flex items-center justify-between px-4 py-3 bg-gray-900">
    <div class="flex items-center">
      <img src="/russian_gopher.png" alt="Logo" class="h-8 w-8 mr-4">
      <h1 class="text-xl font-bold text-white  mr-8">PocketRussian</h1>
      <a href="/" class="px-4 py-2 font-bold text-white bg-gray-800 rounded-full hover:bg-gray-900">Home</a>
        {#if $currentUser}
            <a href="/sentences/practice" class="px-4 py-2 font-bold text-gray-300 hover:text-white mr-8">Practice</a>
        {/if}
    </div>
    <div>
    </div>
    <div>

        {#if $currentUser}
            <a href="/words/practice" class="px-4 py-2 font-bold text-gray-300 hover:text-white">My Words</a>
            <a href="" on:click={logout} class="px-4 py-2 font-bold text-gray-300 hover:text-white">Log Out</a>
        {:else}
            <a href="/login" class="px-4 py-2 font-bold text-gray-300 hover:text-white">Sign In</a>
        {/if}
    </div>
  </nav>