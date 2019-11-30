import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
  apiKey: "AIzaSyBSYY_F550Z3z3T6anMhi0TJJJKzwtG2AI",
  authDomain: "crown-db-14df9.firebaseapp.com",
  databaseURL: "https://crown-db-14df9.firebaseio.com",
  projectId: "crown-db-14df9",
  storageBucket: "",
  messagingSenderId: "132771278539",
  appId: "1:132771278539:web:f338237cda955124"
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({prompt: 'select_account'});
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = await firestore.doc(`users/${userAuth.uid}`);
  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const {displayName, email} = userAuth;
    const createdAt = new Date();

    try {
      userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData
      });
    } catch(error) {
      console.log('error creating user', error.message);
    }
  }

  return userRef;
};

//эта функция нужна была всего один раз
//чтобы занести статичные данные в бд firebase
export const addCollectionAndDocuments = async (collectionKey, objectToAdd) => {
  const collectionRef = firestore.collection(collectionKey);
  //позволит нам собрать все данные для запроса в кучу и отправить один раз
  const batch = firestore.batch();

  objectToAdd.forEach(obj => {
    //создаем документ в коллекции
    const docRef = collectionRef.doc();
    //благодаря batch нам не надо отправлять запрос на каждой итерации
    batch.set(docRef, obj);
  });

  return await batch.commit();
};

export const convertCollectionsSnapshotToMap = collections => {
  const transformedCollection = collections.docs.map(doc => {
    const { title, items } = doc.data();

    return {
      routeName: encodeURI(title.toLowerCase()),
      id: doc.id,
      title,
      items,
    };
  });

  return transformedCollection.reduce((accumulator, collection) => {
    accumulator[collection.title.toLowerCase()] = collection;
    return accumulator;
  }, {});
};

export default firebase;
