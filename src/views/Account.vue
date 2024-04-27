<template>
    <main>

    </main>
</template>

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

</style>