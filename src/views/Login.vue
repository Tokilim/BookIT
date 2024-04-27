<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const rname = ref('');
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
    const auth = getAuth(); // Obtain the Auth instance
    // Use auth instance to call createUserWithEmailAndPassword
    createUserWithEmailAndPassword(auth, remail.value, rpassword.value)
    .then((userCredential) => {
        // Signed up successfully
        const user = userCredential.user;
        console.log('Registered', user);
        router.push('/room');
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
    const auth = getAuth();
    signInWithEmailAndPassword(auth, lemail.value, lpassword.value)
    .then((userCredential) => {
        // Signed in successfully
        const user = userCredential.user;
        console.log('Logged In', user);
        router.push('/');
    })
    .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.error('Login error:', errorCode, errorMessage);
        // You can provide feedback to the user here, such as showing an error message
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
    <main>
        <div class="container" :class="{ active: isActive }">
        <div class="form-container sign-up">
            <form>
                <h1>Register with</h1>
                <div class="social-icons">
                    <img width="32" height="32" class="google" @click.prevent="signUpWithGoogle" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/>
                </div>
                <span>or use your email for registeration</span>
                <input v-model="rname" type="text" placeholder="Name">
                <input v-model="remail" type="email" placeholder="Email">
                <input v-model="rpassword" type="password" placeholder="Password">
                <button @click.prevent="register">Register</button> 
            </form>
        </div>
        <div class="form-container sign-in">
            <form>
                <h1>Login with</h1>
                <div class="social-icons">
                    <img width="32" height="32" class="google" @click.prevent="signUpWithGoogle" src="https://img.icons8.com/color/48/google-logo.png" alt="google-logo"/>
                </div>
                <span>or use your email password</span>
                <input v-model="lemail" type="email" placeholder="Email">
                <input v-model="lpassword" type="password" placeholder="Password">
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
    
</template>




<style scoped>

*{
    margin: 0 auto;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Montserrat', sans-serif;
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
      
    }
}

.container{
    background-color: #fff;
    border-radius: 30px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.35);
    position: relative;
    overflow: hidden;
    width: 768px;
    max-width: 100%;
    min-height: 480px;
   
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

