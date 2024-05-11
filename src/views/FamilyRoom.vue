<template>
    <div class="container mt-5">
        <div class="card">
            <img class="card-img-top" src="https://static01.nyt.com/images/2019/03/24/travel/24trending-shophotels1/24trending-shophotels1-articleLarge.jpg?quality=75&auto=webp&disable=upscale" alt="Family Room Image">
            <div class="card-body">
                <h1 class="about">Family Room - $100</h1>
                <p class="lead">A spacious room for the whole family to stay together on vacation.</p>
                <h5 class="about">Room Features:</h5>
                <ul>
                    <li>Multiple beds</li>
                    <li>Private bathroom</li>
                    <li>Living area</li>
                    <li>Complimentary Wi-Fi</li>
                    <li>Flat-screen TV</li>
                    <li>Mini fridge</li>
                    <!-- Add more features as needed -->
                </ul>
                <p class="about">Book for $100 per night</p>
            <router-link :to="{ name: 'booking'}" class="btn btn-primary">Reserve</router-link>
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
