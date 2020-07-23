import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBYLvvtHJ_DKoOmoqEjPEGo4yd1cm9-EnI",
    authDomain: "clothing-e-commerce-6758e.firebaseapp.com",
    databaseURL: "https://clothing-e-commerce-6758e.firebaseio.com",
    projectId: "clothing-e-commerce-6758e",
    storageBucket: "clothing-e-commerce-6758e.appspot.com",
    messagingSenderId: "1017683247459",
    appId: "1:1017683247459:web:c58c5e9efefbdc2f211356",
    measurementId: "G-R3B0X48PB1"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
}

export default firebase;