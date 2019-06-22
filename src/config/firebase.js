import Firebase from 'firebase';

var config = {
    apiKey: "AIzaSyA93ibnZKKpp1gnpFbuNnnqIwBssjR3gmY",
    authDomain: "restaurant-admin-panel.firebaseapp.com",
    databaseURL: "https://restaurant-admin-panel.firebaseio.com",
    projectId: "restaurant-admin-panel",
    storageBucket: "restaurant-admin-panel.appspot.com",
    messagingSenderId: "504856174051",
    appId: "1:504856174051:web:d62e22687bf1b895"
};

let app = Firebase.initializeApp(config);
export const db = app.database();