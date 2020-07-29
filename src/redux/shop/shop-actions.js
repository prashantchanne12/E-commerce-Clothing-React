import { firestore, convetCollectionSnapshotToMap } from '../../firebase/firebase';

export const fetchCollectionsStart = () => ({
    type: 'FETCH_COLLECTION_START',
});

export const fetchCollectionSuccess = (collectionsMap) => ({
    type: 'FETCH_COLLECTION_SUCCESS',
    payload: collectionsMap,
});

export const fetchCollectionsFailure = (errorMessage) => ({
    type: 'FETCH_COLLECTION_FAILURE',
    payload: errorMessage,
});

export const fetchCollectionsStartAsync = () => {
    return (dispatch) => {

        const collectionRef = firestore.collection("collection");

        dispatch(fetchCollectionsStart());

        collectionRef
            .get()
            .then((snapshot) => {
                const collectionsMap = convetCollectionSnapshotToMap(snapshot);
                console.log("Dispatch Fired");

                dispatch(fetchCollectionSuccess(collectionsMap));
            }).catch(error => {
                dispatch(fetchCollectionsFailure(error.message));
            });

    }
}

// Redux Thunk is function that returns a function which has access to dispatch 

// FETCH_COLLECTION_START
// FETCH_COLLECTION_SUCCESS
// FETCH_COLLECTION_FAILURE