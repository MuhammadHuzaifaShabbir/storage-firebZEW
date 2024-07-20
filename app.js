
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";
import { getFirestore, collection, addDoc, getDocs } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-firestore.js";
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-storage.js";
// const firebaseConfig = {
//     apiKey: "AIzaSyAs1Doh3H0AVh0xHUe3llAw8MlJgTcFr_o",
//     authDomain: "second-cf038.firebaseapp.com",
//     projectId: "second-cf038",
//     storageBucket: "second-cf038.appspot.com",
//     messagingSenderId: "418355371537",
//     appId: "1:418355371537:web:f77f0905f7bb26998a5bb0",
//     measurementId: "G-HZTC5SPRJ4"
// };
const firebaseConfig = {
    apiKey: "AIzaSyB7Y2ie0ICLrDhR7GlTUw8feJt2qNgHpCk",
    authDomain: "practice-5cece.firebaseapp.com",
    projectId: "practice-5cece",
    storageBucket: "practice-5cece.appspot.com",
    messagingSenderId: "516631768531",
    appId: "1:516631768531:web:fce63ccd72bc45277dd326",
    measurementId: "G-4ZY291PETZ"
  };
const app = initializeApp(firebaseConfig);
const storage = getStorage(app);
const db = getFirestore(app);
let all = document.getElementById('all')
let btn = document.getElementById('btn')
btn.addEventListener('click',async () => {
    let inp = document.getElementById('inp')
    const file = inp.files[0]
    const storageRef = ref(storage, `images/${file.name}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed',
        (snapshot) => {
            const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case 'paused':
                    console.log('Upload is paused');
                    break;
                case 'running':
                    console.log('Upload is running');
                    break;
            }
        },
        (error) => {
            console.log(error);
        },
        () => {

            getDownloadURL(uploadTask.snapshot.ref).then(async (downloadURL) => {
                console.log('File available at', downloadURL);
                const docRef = await addDoc(collection(db, "images"), {
                    img: downloadURL
                });
                console.log("Document written with ID: ", docRef.id);

                all.innerHTML = ''
                await a();

            });
        
        }
    );

})

async function a() {
    const q = collection(db, "images")
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        // console.log(doc.id, " => ", doc.data());
        // console.log(doc.data());
        all.innerHTML += `<img class="m-auto m-5 mb-5" src="${doc.data().img}" alt="......">`
    })
}
a();
