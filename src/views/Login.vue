<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { db } from '@/firebase';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { collection, doc, setDoc, getDoc } from "firebase/firestore";


const rname = ref('');
const rphone= ref('');
const remail = ref('');
const rpassword = ref('');

const lname = ref('');
const lemail = ref('');
const lpassword = ref('');

const router = useRouter();


const isActive = ref(false);

const toggleRegister = () => {
    isActive.value = true;
};

const toggleLogin = () => {
    isActive.value = false;
};

const register = () => {
    if (!rname.value || !rphone.value || !remail.value || !rpassword.value) {
        const requiredFieldToast = new bootstrap.Toast(document.getElementById('requiredFieldToast'), {
            autohide: true,
            delay: 5000,
            position: 'top-0 end-0',
        });
        requiredFieldToast.show();
        return; // Don't proceed with registration if fields are empty
    }
    const auth = getAuth(); // Obtain the Auth instance
    // Use auth instance to call createUserWithEmailAndPassword
    createUserWithEmailAndPassword(auth, remail.value, rpassword.value)
    .then((userCredential) => {
        // Signed up successfully
        const user = userCredential.user;
        console.log('Registered', user);

        // Save additional user data to Firestore
        const userData = {
            name: rname.value,
            phone: rphone.value,
            email: remail.value,
            // Add more fields if necessary
        };

        // Get the UID of the user
        const uid = user.uid;

        // Assuming you have a collection named 'users'
        const usersCollection = collection(db, 'users');

        // Set the document ID to be the same as the UID
        const docRef = doc(usersCollection, uid);

        // Add the user data to Firestore with the UID as document ID
        setDoc(docRef, userData)
        .then(() => {
            console.log("Document written with ID: ", uid);
            router.push('/room');
        })
        .catch((error) => {
            console.error("Error adding document: ", error);
        });
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Registration error:', errorCode, errorMessage);
        
        // Handle specific error cases
        switch(errorCode) {
            case 'auth/email-already-in-use':
                // Provide feedback to the user that the email is already in use
                break;
            case 'auth/weak-password':
                // Provide feedback to the user that the password is too weak
                break;
            default:
                // Handle other error cases
        }
    });
};

const login = () => {
    if (!lemail.value || !lpassword.value) {
        const requiredFieldToast = new bootstrap.Toast(document.getElementById('requiredFieldToast'), {
            autohide: true,
            delay: 5000,
            position: 'top-0 end-0',
        });
        requiredFieldToast.show();
        return; // Don't proceed with login if fields are empty
    }
    const auth = getAuth();
    signInWithEmailAndPassword(auth, lemail.value, lpassword.value)
    .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user;
        console.log('Logged In', user);
        
        // Check if the user is admin
        const usersCollection = collection(db, 'users');
        const docRef = doc(usersCollection, user.uid);
        getDoc(docRef).then((doc) => {
            if (doc.exists() && doc.data().isAdmin) {
                // User is admin, redirect to Dashboard
                router.push('/dashboard');
            } else {
                // User is not admin, redirect to default route
                router.push('/');
            }
        }).catch((error) => {
            console.error("Error getting user document:", error);
            // Handle error appropriately, e.g., show an error message
        });
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Login error:', errorCode, errorMessage);

        // Show Bootstrap toast for login error
        const loginErrorToast = new bootstrap.Toast(document.getElementById('loginErrorToast'), {
            autohide: true,
            delay: 5000, // 5 seconds delay before autohiding
            position: 'top-0 end-0', // Position at top-right corner
        });
        loginErrorToast.show();
    });
};



// function signUpWithGoogle() {
//     const auth = getAuth();
//     const provider = new GoogleAuthProvider(); // Initialize GoogleAuthProvider
    
//     signInWithPopup(auth, provider)
//     .then((result) => {
//         // This gives you a Google Access Token. You can use it to access the Google API.
//         const credential = GoogleAuthProvider.credentialFromResult(result);
//         const token = credential.accessToken;
//         // The signed-in user info.
//         const user = result.user;
//         // IdP data available using getAdditionalUserInfo(result)
//         // ...
//         router.push('/');
//         console.log('User signed in:', user);
//     }).catch((error) => {
//         // Handle Errors here.
//         const errorCode = error.code;
//         const errorMessage = error.message;
//         // The email of the user's account used.
//         const email = error.customData.email;
//         // The AuthCredential type that was used.
//         const credential = GoogleAuthProvider.credentialFromError(error);
//         // Handle error appropriately, e.g., display an error message to the user
//         console.error('Google sign-in error:', errorCode, errorMessage);
//     });
// }

function signUpWithGoogle() {
    const auth = getAuth();
    const provider = new GoogleAuthProvider(); // Initialize GoogleAuthProvider
    
    signInWithPopup(auth, provider)
    .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        // Instead of router.push('/'), navigate using window.location.href
        window.location.href = '/'; // Navigate to the root URL
        console.log('User signed in:', user);
    }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // Handle error appropriately, e.g., display an error message to the user
        console.error('Google sign-in error:', errorCode, errorMessage);
    });
}


</script>

<template>
    <Navigation />
    <main>
        <div class="container-for-btn-home">
            <router-link to="/" class="btn-home">
                <img class="home" src="@/assets/icons/home-white.svg" alt="home"/>
                Home
            </router-link>
        </div>
        <div class="container" :class="{ active: isActive }">
        <div class="form-container sign-up">
            <form>
                <h1>Register</h1>
                <div class="social-icons">
                    <!-- <img width="32" height="32" class="google" @click.prevent="signUpWithGoogle" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/> -->
                </div>
                <input v-model="rname" type="text" placeholder="Full Name" required>
                <input v-model="rphone" type="text" placeholder="Phone Number" required>
                <input v-model="remail" type="email" placeholder="Email" required>
                <input v-model="rpassword" type="password" placeholder="Password" required>
                <button @click.prevent="register">Register</button> 
            </form>
        </div>
        <div class="form-container sign-in">
            <form>
                <h1>Login</h1>
                <div class="social-icons">
                    <!-- <img width="32" height="32" class="google" @click.prevent="signUpWithGoogle" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/> -->
                </div>
                <input v-model="lemail" type="email" placeholder="Email" required>
                <input v-model="lpassword" type="password" placeholder="Password" required>
                <a href="#">Forget Your Password?</a>
                <button @click.prevent="login">Sign In</button>
            </form>
        </div>
        <div class="toggle-container">
            <div class="toggle">
                <div class="toggle-panel toggle-left">
                    <h1>Welcome Back!</h1>
                    <p>Enter your personal details to use all of site features</p>
                    <button class="hidden" @click.prevent="toggleLogin">Sign In</button>
                </div>
                <div class="toggle-panel toggle-right">
                    <h1>Hello, Guest!</h1>
                    <p>Register with your personal details to be able to book our hotel</p>
                    <button class="hidden" @click.prevent="toggleRegister">Register</button>
                </div>
            </div>
        </div>
    </div>
    </main>
    <div class="toast-container">
        <div class="toast" id="loginErrorToast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="mr-auto">Error</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                Invalid login credentials or user doesn't exist.
            </div>
        </div>
    </div>

    <div class="toast" id="requiredFieldToast" role="alert" aria-live="assertive" aria-atomic="true">
            <div class="toast-header">
                <strong class="mr-auto">Error</strong>
                <button type="button" class="btn-close" data-bs-dismiss="toast" aria-label="Close"></button>
            </div>
            <div class="toast-body">
                Please fill in all required fields.
            </div>
        </div>
</template>




<style scoped>

/* *{
    margin: 0 auto;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
} */

.toast-container, .toast {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 1050; /* Adjust as needed */
}

.toast {
    width: 300px; /* Adjust width as needed */
    max-width: 100%;
    background-color: #dc3545; /* Example color */
    color: #fff;
}
.toast-header{
    justify-content: space-between;
}
main{
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    height: 100vh;
    padding: 2rem;
    background: url(../assets/images/bgabout.jpg) no-repeat center center;
    background-color: rgba(0, 0, 0, 0.3);

    &::before {
      content: '';
      position: absolute;
      
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.3); /* Adjust opacity as needed */
      z-index: 0;
      
    }
}

.container-for-btn-home{
    background-color: transparent;
    height:auto;
    width: 53%;
    padding: 0.6rem 0;
    z-index:1000;
}
.btn-home{
    height:2.5rem;
    width:2.5rem;
    background-color: transparent;
    border:none;
    text-decoration: none;
    color: white;
    /* background-color: red; */
}

.home{
    height:2rem;
    width: 2rem;
}

.container-for-btn-home span{
    color: white;
    text-decoration: none;
}
.container{
    background-color: #fff;
    border-radius: 1.5rem;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
    position: relative;
    overflow: hidden;
    width: 55%;
    max-width: 100%;
    min-height: 27rem;
   
}

.container p{
    font-size: 14px;
    line-height: 20px;
    letter-spacing: 0.3px;
    margin: 20px 0;
}

.container span{
    font-size: 12px;
}

.container a{
    color: #333;
    font-size: 13px;
    text-decoration: none;
    margin: 15px 0 10px;
}

.container button{
    background-color: #322C2B;
    color: #fff;
    font-size: 12px;
    padding: 10px 45px;
    border: 1px solid transparent;
    border-radius: 8px;
    font-weight: 600;
    letter-spacing: 0.5px;
    text-transform: uppercase;
    margin-top: 10px;
    cursor: pointer;
}

.container button.hidden{
    background-color: transparent;
    border-color: #fff;
}

.container form{
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    height: 100%;
}

.container input{
    background-color: #eee;
    border: none;
    margin: 8px 0;
    padding: 10px 15px;
    font-size: 13px;
    border-radius: 8px;
    width: 100%;
    outline: none;
}

.form-container{
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
}

.sign-in{
    left: 0;
    width: 50%;
    z-index: 2;
}

.container.active .sign-in{
    transform: translateX(100%);
}

.sign-up{
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
}

.container.active .sign-up{
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: move 0.6s;
}

@keyframes move{
    0%, 49.99%{
        opacity: 0;
        z-index: 1;
    }
    50%, 100%{
        opacity: 1;
        z-index: 5;
    }
}

.social-icons{
    margin: 20px 0;
}

.social-icons a{
    border: 1px solid #ccc;
    border-radius: 20%;
    display: inline-flex;
    justify-content: center;
    align-items: center;
    margin: 0 3px;
    width: 40px;
    height: 40px;
}

.toggle-container{
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: all 0.6s ease-in-out;
    border-radius: 150px 0 0 100px;
    z-index: 1000;
}

.container.active .toggle-container{
    transform: translateX(-100%);
    border-radius: 0 150px 100px 0;
}

.toggle{
    background-color: #803D3B;
    height: 100%;
    background: linear-gradient(to right, #AF8260, #803D3B);
    color: #fff;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: all 0.6s ease-in-out;
}

.container.active .toggle{
    transform: translateX(50%);
}

.toggle-panel{
    position: absolute;
    width: 50%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 30px;
    text-align: center;
    top: 0;
    transform: translateX(0);
    transition: all 0.6s ease-in-out;
}

.toggle-left{
    transform: translateX(-200%);
}

.container.active .toggle-left{
    transform: translateX(0);
}

.toggle-right{
    right: 0;
    transform: translateX(0);
}

.container.active .toggle-right{
    transform: translateX(200%);
}

.google{
    cursor: pointer;
}

</style>

