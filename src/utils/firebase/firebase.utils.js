import { initializeApp } from 'firebase/app';

import { 
    getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider,
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} 
from 'firebase/auth';

import{
    getFirestore,
    doc,
    getDoc,
    setDoc,
    collection,
    writeBatch,
    query,
    getDocs
} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyBoD0_GJqz01SOkRdW81XRW5ezPFYVsHVU",
    authDomain: "crwn-ecommerse-db.firebaseapp.com",
    projectId: "crwn-ecommerse-db",
    storageBucket: "crwn-ecommerse-db.appspot.com",
    messagingSenderId: "1002260986751",
    appId: "1:1002260986751:web:9a005b876dd954f169b84a",
    measurementId: "G-Y9DZ0KCFXG"
};
  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt:"select_account"
});

export const auth = getAuth();
export const signInWithGooglePopUp = () => signInWithPopup(auth,googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth,googleProvider);

export const db = getFirestore();

export const addCollectionsAndDocuments = async (collectionKey,objectsToAdd) => {
    const collectionRef = collection(db,collectionKey);
    const batch = writeBatch(db);

    objectsToAdd.forEach((object) =>{
        const docRef = doc(collectionRef,object.title.toLowerCase());
        batch.set(docRef,object);
    })

    await batch.commit();
    console.log("done");
};

export const getCategoriesAndDocuments = async () => {
    const collectionRef = collection(db,'categories');
    const q = query(collectionRef);

    const querySnapshot = await getDocs(q);
    const cateogoryMap = querySnapshot.docs.reduce((acc,docSnapshot)=>{
        const {title, items} = docSnapshot.data();
        acc[title.toLowerCase()] = items;
        return acc;
    },{})
    return cateogoryMap;
}

export const createUserDocumentFromAuth = async (userAuth,
        additionalinformation={}
    ) => {
    if(!userAuth) return;

    const userDocRef = await doc(db,'users',userAuth.uid); // takes 3 arguments -> db instance, users(collection in db, unique id(documentname))
    // console.log(userDocRef);

    const userSnapshot = await getDoc(userDocRef);
    // console.log('snapshot',userSnapshot);
    // console.log(userSnapshot.exists());

    //if the user do not exists
    // then create/set the document with the data from userauth in my collection

    //if user exists
    // then return userDocRef
    if(!userSnapshot.exists()){
        const { displayName, email } = userAuth;
        const createdAt = new Date();
        try{
            await setDoc(userDocRef,
                {
                displayName,email,createdAt,...additionalinformation
                });
        }catch(error){
            console.log('errror creating the user', error.message);
        }
    }
    return userDocRef
}

export const createAuthUserWithEmailAndPassword = async (auth,email,password) =>{
    if(!email || !password) return;

    return await createUserWithEmailAndPassword(auth,email,password);
}

export const signInAuthUserWithEmailAndPassword = async (auth,email,password) =>{
    if(!email || !password) return;

    return await signInWithEmailAndPassword(auth,email,password);
}

export const SignOutUser = async() =>  await signOut(auth);

export const onAuthStateChangedListener = (callback) => onAuthStateChanged(auth,callback);