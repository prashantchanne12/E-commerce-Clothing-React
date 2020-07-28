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

export const createUserProfileDocument = async (userAuth, dName) => {

    if (!userAuth) return;

    const displayName = dName ? dName : userAuth.displayName;
    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();

    if (!snapshot.exists) {

        const user = {
            displayName: displayName,
            email: userAuth.email,
            createdAt: new Date(),
        }

        await userRef.set(user).then(e => {
            console.log('Added');
        }).catch(e => {
            console.log('Error: ', e);
        });


    }

    return userRef;

}

export const addCollectionsAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);

    // batch is similar to transaction ins SQL if one query in transaction is failed then whole transaction is failed
    // Makes our code more consistant
    const batch = firestore.batch();

    objectsToAdd.forEach(obj => {
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();

}


firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => {
    auth.signInWithPopup(provider);
}

export default firebase;