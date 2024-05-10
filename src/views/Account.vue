<script setup>
import Navigation from '@/components/Navigation.vue';
import { ref, onMounted } from 'vue';
import { onAuthStateChanged } from 'firebase/auth';
import { auth, db } from '@/firebase'; // Import auth and db modules
import {
    getFirestore,
    addDoc,
    collection,
    query,
    where,
    getDocs,
    doc,
    setDoc,
    updateDoc,
    getDoc,
    increment,
    orderBy,
    limit,
    startAfter,
    arrayUnion,
    arrayRemove,
    documentId,
    deleteDoc,
    deleteField,
} from "firebase/firestore";


const formData = ref({
  email: '',
  name: '',
  phone: ''
});

// Fetch user data when the component is mounted
onMounted(async () => {
  const user = auth.currentUser;
  if (user) {
    const userDocRef = doc(db, 'users', user.uid);
    const userDocSnapshot = await getDoc(userDocRef);
    if (userDocSnapshot.exists()) {
      const userData = userDocSnapshot.data();
      formData.value = {
        email: userData.email,
        name: userData.name,
        phone: userData.phone
      };
    } else {
      console.warn('User data not found in Firestore');
    }
  } else {
    console.warn('No authenticated user found');
  }
});

const submitForm = async () => {
  try {
    const user = auth.currentUser;
    if (user) {
      const userDocRef = doc(db, 'users', user.uid);
      await setDoc(userDocRef, formData.value, { merge: true });
      const successToast = new bootstrap.Toast(document.getElementById('successToast'));
      successToast.show();
    } else {
      console.warn('No authenticated user found');
    }
  } catch (error) {
    console.error('Error updating user data:', error);
    const errorToast = new bootstrap.Toast(document.getElementById('errorToast'));
    errorToast.show();
  }
};
</script>

<template>
  <Navigation />
  <main>
    <div class="account">
      <div class="container">
        <h1>Profile</h1>
        <!-- Form -->
        <form @submit.prevent="submitForm">
          <!-- Email input (readonly) -->
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="inputEmail" class="form-label">Email address</label>
              <input type="email" class="form-control" id="inputEmail" :value="formData.email" readonly>
            </div>
            <div class="col-md-6 mb-3">
              <label for="inputName" class="form-label">Full Name</label>
              <input type="text" class="form-control" id="inputName" v-model="formData.name" required>
            </div>
          </div>
          <!-- Phone input -->
          <div class="row">
            <div class="col-md-6 mb-3">
              <label for="inputPhone" class="form-label">Phone Number</label>
              <input type="tel" class="form-control" id="inputPhone" v-model="formData.phone" required>
            </div>
          </div>
          <!-- Submit button -->
          <button type="submit" class="btn btn-primary">Save</button>
        </form>
        <!-- Bootstrap Toast container -->
        <div
          class="toast align-items-center text-white bg-success position-fixed"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          id="successToast"
        >
          <div class="d-flex">
            <div class="toast-body">
              Profile saved successfully!
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
        <div
          class="toast align-items-center text-white bg-danger position-fixed top-0 end-0 m-3"
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          id="errorToast"
        >
          <div class="d-flex">
            <div class="toast-body">
              Error saving profile. Please try again.
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<style scoped>
/* Your scoped styles */
</style>


<style scoped>

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
.account{
      align-items: center;
      justify-content: center;
      margin-top: 8rem;
      width: 80vw;
      background-color: white;
      height: 100vh;
      z-index: 1000;
      padding: 2rem;
  }

</style>