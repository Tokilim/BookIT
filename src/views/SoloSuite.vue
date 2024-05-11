<template>
    <div class="container mt-5">
        <div class="card">
            <img class="card-img-top" src="https://i.pinimg.com/originals/a5/25/86/a52586ab1561ad8e9a9f6f7b7b159002.jpg" alt="Solo Suite Image">
            <div class="card-body">
                <h1 class="about">Solo Suite - $20</h1>
                <p class="lead">A comfortable and spacious room for one.</p>
                <h5 class="about">Room Features:</h5>
                <ul>
                    <li>Single bed</li>
                    <li>Private bathroom</li>
                    <li>Work desk</li>
                    <li>Complimentary Wi-Fi</li>
                    <li>Flat-screen TV</li>
                    <li>Mini fridge</li>
                    <!-- Add more features as needed -->
                </ul>
                <p class="about">Book for $50 per night</p>
            <router-link :to="{ name: 'room'}" class="btn btn-primary">Reserve</router-link>
            </div>
        </div>
    </div>
</template>

<style scoped>
/* Customize styles as needed */
.container {
    max-width: 1200px;
    /* Set maximum width for the container */
    margin: 0 auto;
    /* Center the container */
}

.card {
    height: 100%;
    /* Ensure all cards have the same height */
    display: flex;
    /* Use flexbox */
    flex-direction: column;
    /* Arrange child elements vertically */
}

.card-img-top {
    max-width: 100%;
    height: 300px; /* Adjust height as needed */
    /* Ensure all images have the same height */
    object-fit: cover;
    /* Maintain aspect ratio and cover entire container */
}

.card-body {
    flex: 1;
    /* Allow card bodies to grow to fill available space */
}

.about h1 {
    color: #ffd700;
    /* Golden yellow color */
}

.about p {
    font-size: 1.1rem;
}

.about h5 {
    color: #ffd700;
    /* Golden yellow color */
}
</style>
