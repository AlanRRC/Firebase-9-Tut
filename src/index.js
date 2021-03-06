import { initializeApp } from 'firebase/app'
import {
    getFirestore, collection, onSnapshot,
    addDoc, deleteDoc, doc,
    query, where,
    orderBy, serverTimestamp,
    getDoc, updateDoc
} from 'firebase/firestore'

import {
    getAuth,
    createUserWithEmailAndPassword,
    signOut, signInWithEmailAndPassword,
    onAuthStateChanged
} from 'firebase/auth'

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
const auth = getAuth()

//  collection ref
const colRef = collection(db, 'books')

//  queries
const q = query(colRef, orderBy('createdAt'))

//  real time collection data
const unsubCol = onSnapshot(q, (snapshot) => {
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

const unsubDoc = onSnapshot(docRef, (doc) => {
    console.log(doc.data(), doc.id)
})

//  updating a document 
const updateForm = document.querySelector('.update')
updateForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const docRef = doc(db, 'books', updateForm.id.value)

    updateDoc(docRef, {
        title: 'updated title'
    })
        .then(() => {
            updateForm.reset()
        })
})

//  signing users up
const signupForm = document.querySelector('.signup')
signupForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const email = signupForm.email.value
    const password = signupForm.password.value

    createUserWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            // console.log('User created:', cred.user)
            signupForm.reset()
        })
        .catch((err) => {
            console.log(err)
        })

})

//  logging in and out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
    signOut(auth)
        .then(() => {
            //console.log('user signed out')
        })
        .catch((err) => {
            console.log(err)
        })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
    e.preventDefault()
    const email = loginForm.email.value
    const password = loginForm.password.value

    signInWithEmailAndPassword(auth, email, password)
        .then((cred) => {
            //console.log('user logged in:', cred.user)
        })
        .catch((err) => {
            console.log(err)
        })
})

//  subscribing to auth changes
const unsubAuth = onAuthStateChanged(auth, (user) => {
    console.log('user status changed:', user)
})

//  unsubscribing from changes
const unsubButton = document.querySelector('.unsub')
unsubButton.addEventListener('click', () => {
    console.log('unsubscribing')
    unsubCol()
    unsubDoc()
    unsubAuth()

})