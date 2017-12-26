import * as firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyD4qn2YhDJkdIDNXf-IXbcj531pahZMucA",
    authDomain: "sigdish-d24b1.firebaseapp.com",
    databaseURL: "https://sigdish-d24b1.firebaseio.com",
    projectId: "sigdish-d24b1",
    storageBucket: "sigdish-d24b1.appspot.com",
    messagingSenderId: "440485537865"
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

module.exports = firebaseApp