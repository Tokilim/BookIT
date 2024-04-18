<template>
        <main>
            <div class="container-fluid landing">
                <h2 class="landing-intro">BookIT Hotel</h2>
            </div>
        </main>

        <footer>

        </footer>
</template>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    min-height: 100vh; /* Ensure at least full viewport height */
}

.landing {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh; /* Ensure at least full viewport height */
  background: url(../assets/images/background.jpg) no-repeat center center;
  background-size: cover;
  /* Take full viewport width */

  /* Overlay with semi-transparent layer */
  &::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.3); /* Adjust opacity as needed */
  }
}

h2 {
    color: white;
    font-size: 3rem;
    z-index: 1;
}
</style>