importScripts('https://www.gstatic.com/firebasejs/9.6.9/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/9.6.9/firebase-messaging.js');

firebase.initializeApp({
    apiKey: "AIzaSyA93ibnZKKpp1gnpFbuNnnqIwBssjR3gmY",
    authDomain: "restaurant-admin-panel.firebaseapp.com",
    databaseURL: "https://restaurant-admin-panel.firebaseio.com",
    projectId: "restaurant-admin-panel",
    storageBucket: "restaurant-admin-panel.appspot.com",
    messagingSenderId: "504856174051",
    appId: "1:504856174051:web:d62e22687bf1b895"
});

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
    console.log('[firebase-messaging-sw.js] Received background message ', payload);
    const notificationTitle = 'Background Message from html';
    const notificationOptions = {
        body: 'Background Message body.',
        icon: '/firebase-logo.png'
    };

    return self.registration.showNotification(notificationTitle,
        notificationOptions);
});