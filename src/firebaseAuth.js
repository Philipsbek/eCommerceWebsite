import { initializeApp } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-auth.js";
import { getFirestore, setDoc, doc } from "https://www.gstatic.com/firebasejs/11.1.0/firebase-firestore.js";

// Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAXLGOszeZnOeP1Ld0XG5K3i0lu0D9Nlq0",
    authDomain: "ecommercewebsite-b539a.firebaseapp.com",
    projectId: "ecommercewebsite-b539a",
    storageBucket: "ecommercewebsite-b539a.firebasestorage.app",
    messagingSenderId: "852388243380",
    appId: "1:852388243380:web:4e1460faa029c5c808b4e1",
    measurementId: "G-Q1ZB3Q430E"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Helper function to show messages
function showMessage(message, divId) {
    const messageDiv = document.getElementById(divId);
    messageDiv.innerHTML = message;
    messageDiv.style.display = "block";
    messageDiv.style.opacity = 1;
    setTimeout(() => {
        messageDiv.style.opacity = 0;
    }, 5000);
};

// Sign Up Event Handler
const signUp = document.getElementById('submitSignUp');
if (signUp) {
    signUp.addEventListener('click', (event) => {
        event.preventDefault();
        const email = document.getElementById('rEmail').value;
        const password = document.getElementById('rPassword').value;
        const firstName = document.getElementById('fName').value;
        const lastName = document.getElementById('lName').value;

        const auth = getAuth();
        const db = getFirestore();

        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            const userData = {
                email: email,
                firstName: firstName,
                lastName: lastName
            };

            showMessage("User created successfully", "signUpMessage");

            const docRef = doc(db, "users", user.uid);
            setDoc(docRef, userData)
            .then(() => {
                window.location.href = "loginPage.html"; // Redirect to login page after successful sign-up
            })
            .catch((error) => {
                console.error("Error writing document", error);
            });
        })
        .catch((error) => {
            const errorCode = error.code;
            if (errorCode == "auth/email-already-in-use") {
                showMessage("Email Address Already Exists !!!", "signUpMessage");
            } else {
                showMessage("Error Occurred !!!", "signUpMessage");
            }
        });
    });
}

// Sign In Event Handler (Only runs if the button exists in the login page)
document.addEventListener("DOMContentLoaded", function () {
    const signIn = document.getElementById('submitSignIn');

    if (signIn) {
        signIn.addEventListener('click', (event) => {
            event.preventDefault();

            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            // Log values to check if they are correct
            console.log('Email:', email);
            console.log('Password:', password);

            if (!email || !password) {
                console.log('Please enter both email and password!');
                showMessage('Please enter both email and password.', 'signInMessage');
                return;
            }

            const auth = getAuth();

            signInWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;
                console.log("User logged in:", user);
                showMessage("User Logged In Successfully", "signInMessage");
                localStorage.setItem('loggedInUserId', user.uid);
                window.location.href = "homePage.html"; // Redirect to home page after successful login
            })
            .catch((error) => {
                const errorCode = error.code;
                console.log("Login error code:", errorCode);  // Log the error code
                if (errorCode === "auth/invalid-credential") {
                    showMessage("Incorrect Email or Password", "signInMessage");
                } else {
                    showMessage("Account does not Exist", "signInMessage");
                }
            });
        });
    }
});
