import firebase from 'firebase'


const firebaseConfig = {
    apiKey: "AIzaSyBRAnOQesUvkicvbuvTUu3ZYz5Uahz2ecQ",
    authDomain: "social-media-app-7d37b.firebaseapp.com",
    projectId: "social-media-app-7d37b",
    storageBucket: "social-media-app-7d37b.appspot.com",
    messagingSenderId: "448600578755",
    appId: "1:448600578755:web:4dc686fc6a22b2ec7be076"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const storage = firebase.storage();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {db, auth, storage, provider};


  