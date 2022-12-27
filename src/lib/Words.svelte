<script>
// @ts-nocheck

    import { onMount, onDestroy } from "svelte/internal";
    import { currentUser, pb } from "./pocketbase";

    let words = []
    let wordsType;
    let currentPage = 1;
    let type;

    function setType(type) {

        switch(type) {
            case "adjectives": 
                wordsType = "adjective"
                break;
            case "nouns":
                wordsType = "noun"
                break;
            case "verbs":
                wordsType ="verb"
                break;
            default:
                wordsType = undefined
                break;
        }

    }

    async function changeType(type) {
        currentPage = 1
        setType(type)
        updateWords()
        

    }

    async function updateWords() {
        let resultList ;
        console.log(wordsType)
        if (!wordsType) {
            resultList = await pb.collection('words').getList(currentPage, 22, { filter: 'rank != ""', sort: 'rank'})
        } else {
            resultList = await pb.collection('words').getList(currentPage, 22, { filter: `rank != "" && type = "${wordsType}"`, sort: 'rank'})
        }

       
        words = resultList.items;

    }

    onMount( async() => {
        updateWords()
    })

    async function addWord(wordID) {

        
        const data = {
            "word_id": wordID,
            "user_id": $currentUser.id,
            "known": false
        };
        
        const record = await pb.collection('users_words').create(data);
    }




</script>
<h1 class="text-2xl text-center font-bold py-5">Words</h1>
<nav class="flex space-x-4 justify-center text-l my-5 ">
    <ul class="flex space-x-6">
      <li on:click={() => {changeType("all")}} class="inline-block"><a href="#" class="{wordsType === undefined ? 'border-b-2': ''}" >All</a></li>
      <li on:click={() => {changeType("adjectives")}} class="inline-block " ><a href="#" class="{wordsType === "adjective" ? 'border-b-2': ''}">Adjectives</a></li>
      <li on:click={() => {changeType("nouns")}} class="inline-block "><a href="#" class="{wordsType === "noun" ? 'border-b-2': ''}">Nouns</a></li>
      <li on:click={() => {changeType("verbs")}} class="inline-block "><a href="#" class="{wordsType === "verb" ? 'border-b-2': ''}">Verbs</a></li>
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
        {#each words as word (word.id)}
            <tr class=" bg-transparent">
                <td class="text-center w-1/2">{word.bare}</td>
                {#if $currentUser}
                    <td on:click={() => {addWord(word.id)}} class=" content-center flex items-center justify-center"><button class=" mx-auto text-center bg-green-500 text-white font-bold rounded-full px-1 left-2 w-8/12">Add</button></td>
                {/if}
            </tr>
        {/each}
        
      

    </tbody>
  </table>
  
  <div class="flex justify-between mt-8 mb-8">
    <button on:click={() => { if (currentPage > 1) { currentPage -= 1; updateWords()}}} class="px-4 py-2 bg-gray-300 text-gray-700 font-bold rounded-full">Previous</button>
    <p>{currentPage}</p>
    <button on:click={() => {currentPage += 1; updateWords()}} class="px-4 py-2 bg-blue-500 text-white font-bold rounded-full">Next</button>
  </div>
