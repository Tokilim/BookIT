<template>
  <main>
    <div class="container-fluid landing">
      <div class="landing-intro-top underline">Welcome to</div>
      <h2 class="landing-intro">BookIT Hotel</h2>
      <p></p>
    </div>

    <section class="">
      <p>What is Lorem Ipsum?
Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.</p>
    </section>
  </main>

  <footer>

  </footer>
</template>

<style scoped>
  main {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .landing {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 100vh; /* Ensure at least full viewport height */
    background: url(../assets/images/background.jpg) no-repeat center center;
    background-size: cover;
    flex-direction: column;
    overflow: hidden; /* Hide overflow to prevent slanted part from showing outside */

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

  .landing::after {
    content: '';
    position: absolute;
    bottom: -50px; /* Adjust the height of the slanted cut */
    left: 0;
    width: 100%;
    height: 150px; /* Adjust the height of the slanted cut */
    background: linear-gradient(to right bottom, transparent 50%, rgba(0, 0, 0, 0.3) 50%); /* Create gradient for slanted cut */
    transform: skewY(-3deg); /* Skew the slanted cut */
    z-index: 2; /* Ensure the slanted cut is above the background */
  }

  .landing-intro-top,
  .landing-intro {
    text-align: center;
    color: white;
    font-size: 3rem;
    z-index: 1;
  }

  .underline {
    text-decoration-line: underline;
    text-decoration-color: white;
    text-decoration-thickness: 0.1rem;
  }

  .landing-intro-top {
    margin-bottom: 1rem;
    width: 100%;
    font-size: 2rem;
  }

  .landing-intro {
    width: 100%;
    margin: 0;
  }
</style>
