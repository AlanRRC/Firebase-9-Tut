import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc
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

//  queries
const q = query(colRef, orderBy('createdAt'))

//  real time collection data
onSnapshot(q, (snapshot) => {
    let books = []
    snapshot.docs.map((doc) => {
        books.push({ ...doc.data(), id: doc.id })
    })
    console.log(books)
})

// adding docs
const addBookForm = document.querySelector('.add')
addBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    addDoc(colRef, {
        title: addBookForm.title.value,
        author: addBookForm.author.value,
        createdAt: serverTimestamp()
    })
        .then(() => {
            addBookForm.reset()
        })
})

// deleting docs
const deleteBookForm = document.querySelector('.delete')
deleteBookForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', deleteBookForm.id.value)

    deleteDoc(docRef)
        .then(() => {
            deleteBookForm.reset()
        })
})

//  get a single document
const docRef = doc(db, 'books', '7K6XnfocyUx9UUXNbj2o')

onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
})