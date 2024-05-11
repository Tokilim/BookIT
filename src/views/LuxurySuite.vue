<template>
    <div class="container mt-5">
        <div class="card">
            <img class="card-img-top" src="https://hoteldesigns.net/wp-content/uploads/2021/05/119949786.jpg" alt="Luxury Suite Image">
            <div class="card-body">
                <h1 class="about">Luxury Suite - $500</h1>
                <p class="lead">Indulge in the epitome of luxury and sophistication.</p>
                <h5 class="about">Suite Features:</h5>
                <ul>
                    <li>King-sized bed</li>
                    <li>Spa-style bathroom with jacuzzi</li>
                    <li>Private balcony with panoramic views</li>
                    <li>In-room dining service</li>
                    <li>Personalized concierge service</li>
                    <li>Complimentary access to spa and fitness facilities</li>
                    <!-- Add more features as needed -->
                </ul>
                <p class="about">Book for $500 per night</p>
            <router-link :to="{ name: 'booking' }" class="btn btn-primary">Reserve</router-link>
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
