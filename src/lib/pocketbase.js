import PocketBase from 'pocketbase';

import { writable } from 'svelte/store';

export const pb = new PocketBase('http://127.0.0.1:8090/');

export const currentUser = writable(pb.authStore.model)
//pb.collection('users_words').create({'word_id': 12, 'user_id': currentUser['id']})

pb.authStore.onChange((auth) => {
    console.log('authStore changed ', auth)
    currentUser.set(pb.authStore.model)
})