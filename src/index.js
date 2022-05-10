import { initializeApp } from 'firebase/app'
import {
    getFirestore,
    collection,
    getDocs
} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyD7c8jPsLdVVOA7tAXehUXyvE0qee-zpfY",
    authDomain: "fir-9-dojo-7d8b2.firebaseapp.com",
    projectId: "fir-9-dojo-7d8b2",
    storageBucket: "fir-9-dojo-7d8b2.appspot.com",
    messagingSenderId: "896338561569",
    appId: "1:896338561569:web:6500f4f637048f3706f160",
    measurementId: "G-P0MME3Q0H3"
}

//  init firebase app
initializeApp(firebaseConfig)

//  init services
const db = getFirestore()

//  collection ref
const colRef = collection(db, 'books')

//  get collection data
getDocs(colRef)
    .then((snapshot) => {
        let books = []
        snapshot.docs.map((doc) => {
            books.push({ ...doc.data(), id: doc.id })
        })
        console.log(books)
    })
    .catch(err => {
        console.log(err.message)
    })