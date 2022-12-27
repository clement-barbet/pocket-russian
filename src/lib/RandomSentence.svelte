<script>
// @ts-nocheck

    import { onMount, onDestroy } from "svelte/internal";
    import { currentUser, pb } from "./pocketbase";

    let randomSentence

    async function getTranslationFromSentenceID(sentenceID) {
        const translationSentence = await pb.collection('sentences_translations').getFirstListItem(`sentence_id = '${sentenceID}'`)
        return translationSentence.tl_en
    }

    async function getRandomSentenceFromWord(wordID) {
        const resultList = await pb.collection('sentences_words').getList(1, 200, {filter: `word_id = "${wordID}"`, expand: 'sentence_id, sentences.id, sentences_translation.id'})
        const sentenceList = resultList.items
        const randomSentence = sentenceList[Math.floor(Math.random() * sentenceList.length)]

        console.log(resultList)
        
        return randomSentence
    }

    async function nextSentence() {
        // Pick a random word
        const resultList = await pb.collection('users_words').getFullList(200, {filter: `user_id = '${$currentUser.id}' && known != true`})

        const randomUserWord = resultList[Math.floor(Math.random() * resultList.length)]

        // Get a random sentence from word


        const objectSentence = await getRandomSentenceFromWord(randomUserWord.word_id)

        const sentenceID = objectSentence.sentence_id
        const sentenceRU = objectSentence.expand.sentence_id.ru
        const sentenceTranslation = await getTranslationFromSentenceID(objectSentence.sentence_id)
        
        randomSentence = {word_id: randomUserWord.word_id ,sentence_id: sentenceID, ru: sentenceRU, tl: sentenceTranslation}

    }

    onMount(async () => {
        nextSentence()
    })
</script>

{#if $currentUser}
<div  class="items-center mx-auto w-96">
    <h3 class="mt-5 text-3xl font-bold text-center mb-2"> {randomSentence?.ru || ''}</h3>
    <p class="text-center mb-5"> {randomSentence?.tl || ''}</p>
    <p class="text-center rounded-full hover:cursor-pointer hover:bg-slate-700 hover:font-semibold bg-slate-600  text-white" on:click={nextSentence}>Next sentence</p>
    


</div>
{/if}