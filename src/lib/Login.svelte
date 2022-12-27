<script>
    import { currentUser, pb } from "./pocketbase";

    let username = "";
    let password = "";

    async function login() {
        console.log("Try login with ", username, " password ", password)
        pb.collection('users').authWithPassword(username, password)
    }

    

    async function logout() {
        pb.authStore.clear()
    }
</script>

{#if $currentUser}
<p class="text-center text-m">
    Signed in as <strong>{$currentUser.username}</strong>
</p>

{:else}
    <form on:submit|preventDefault class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="username">
            Username
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="username" bind:value={username} type="text" placeholder="Username">
        </div>
        <div class="mb-6">
        <label class="block text-gray-700 text-sm font-bold mb-2" for="password">
            Password
        </label>
        <input class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"  bind:value={password} id="password" type="password" placeholder="******************">
        </div>
        <div class="flex items-center justify-between">
        <button on:click={login} class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">
            Sign In
        </button>
        <a class="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="#">
            Forgot Password?
        </a>
        </div>
    </form>

{/if}