<script>
// @ts-nocheck

    import { onMount, onDestroy } from "svelte/internal";
    import { currentUser, pb } from "./pocketbase";

    let user_words = [{}];
    let wordType = "";

    async function updateUserWords() {
        let resultList
        if (!wordType) {
            resultList = await pb.collection('users_words').getList(1,20,{filter: `user_id = '${$currentUser.id}' && known = false`, expand: 'word_id, words.id'});
        } else {
            resultList = await pb.collection('users_words').getList(1,20,{filter: `user_id = '${$currentUser.id}' && known = false && words.typee = "${wordType}"`, expand: 'word_id, words.id'});
        }
       

        user_words = resultList.items;

    }

    onMount( async() => {
    
        updateUserWords()
        console.log(user_words)
    })

    function setType(type) {

        switch(type) {
            case "adjectives": 
                wordType = "adjectives"
                break;
            case "nouns":
                wordType = "nouns"
                break;
            case "verbs":
                wordType ="verbs"
                break;
            default:
                wordType = undefined
                break;
        }

    }

    async function changeType(type) {
        setType(type)
        updateUserWords()

    }

    async function addWordAsKnown(wordID) {
        const data = {
            "known": true
        };

        const record = await pb.collection('users_words').update(wordID, data);
    }

</script>



<div class="mx-auto w-96">
    <h1 class="text-2xl font-bold text-center">My Words</h1>
    <nav class="flex space-x-4 justify-center text-l my-5 ">
        <ul class="flex space-x-6">
          <li on:click={() => {changeType("all")}} class="inline-block"><a href="#" class="border-b-2" >All</a></li>
          <li on:click={() => {changeType("adjectives")}} class="inline-block "><a href="#">Adjectives</a></li>
          <li on:click={() => {changeType("nouns")}} class="inline-block "><a href="#">Nouns</a></li>
          <li on:click={() => {changeType("verbs")}} class="inline-block "><a href="#">Verbs</a></li>
        </ul>
      </nav>

    <table class="w-full border-collapse">
        <thead>
          <tr class="bg-gray-200 text-xs font-bold uppercase text-gray-700 border-b-4 border-transparent">
            <th class="py-3 px-4  text-center">Word</th>
            {#if $currentUser}
                <th class="py-3 px-4 w-1/4 text-center ">Actions</th>
            {/if}
            
          </tr>
        </thead>
        <tbody class="mt-5">
            {#each user_words as user_word (user_word.id)}
                <tr class=" bg-transparent">
                    <td class="text-center w-1/2">{user_word.expand?.word_id.bare}</td>
                    {#if $currentUser}
                        <td on:click={() => {addWordAsKnown(user_word.id)}} class=" content-center flex items-center justify-center"><button class=" mx-auto text-center bg-red-500 text-white font-bold rounded-full px-1 left-2 w-8/12">Remove</button></td>
                    {/if}
                </tr>
            {/each}
            
          
    
        </tbody>
      </table>
</div>