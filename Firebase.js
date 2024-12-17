import { initializeApp } from 'firebase/app';
import { addDoc, collection, deleteDoc, doc, getDocs, getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAzsrAoKfrOZ6fgtmSHMvxoWlkwJrEiV5k",
    authDomain: "nicequotesapp-fdeb9.firebaseapp.com",
    projectId: "nicequotesapp-fdeb9",
    storageBucket: "nicequotesapp-fdeb9.firebasestorage.app",
    messagingSenderId: "558455627152",
    appId: "1:558455627152:web:99ef4369ee6f1ae880e715"
};

export default class Firebase {
    static db;

    static init() {
        const app = initializeApp(firebaseConfig);
        Firebase.db = getFirestore(app);
    }

    static async getQuotes() {
        let quotes = [];
        const querySnapshot = await getDocs(collection(Firebase.db, 'quotes'));
        querySnapshot.forEach((quote) => {
            quotes.push({
                id: quote.id,
                text: quote.data().text,
                author: quote.data().author,
            });
        });
        return quotes
    }

    static async saveQuote(text, author) {
        // SQL Tabelle --> Firebase collection
        // SQL Zeile --> Firebase document
        const docRef = await addDoc(collection(Firebase.db, 'quotes'), {
            text,
            author,
        });
        return docRef.id;
    }

    static removeQuotes(id) {
        deleteDoc(doc(Firebase.db, 'quotes', id));
    }
}