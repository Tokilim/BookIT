<template>
  <nav class="navbar navbar-expand-lg navbar-light fixed-top">
   <div class="container-fluid">
     <a class="navbar-brand">
       <RouterLink to="/" class="nav-link">Logo</RouterLink>
     </a>
     
     <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
       <span class="navbar-toggler-icon"></span>
     </button>
     <div class="collapse navbar-collapse" id="navbarSupportedContent">
       <ul class="navbar-nav me-auto mb-2 mb-lg-0">
         <li class="nav-item">
           <RouterLink to="/" class="nav-link" active-class="active-link">Home</RouterLink>
         </li>
         <li class="nav-item">
           <RouterLink to="/room" class="nav-link" active-class="active-link">Rooms</RouterLink>
         </li>
         <li class="nav-item">
             <RouterLink to="/aboutus" class="nav-link" active-class="active-link">About</RouterLink>
         </li>
         <li class="nav-item">
             <RouterLink to="/contactus" class="nav-link" active-class="active-link">Contact Us</RouterLink>
         </li>
         <!-- <li class="nav-item">
             <RouterLink to="/person/view" class="nav-link" active-class="active-link">Person</RouterLink>
         </li> -->
         <li class="nav-item dropdown">
           <a class="nav-link dropdown-toggle" href="#" id="navbarDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
             Dropdown
           </a>
           <ul class="dropdown-menu" aria-labelledby="navbarDropdown">
             <li><a class="dropdown-item" href="#">Action</a></li>
             <li><a class="dropdown-item" href="#">Another action</a></li>
             <li><hr class="dropdown-divider"></li>
             <li><a class="dropdown-item" href="#">Something else here</a></li>
           </ul>
         </li>
       </ul>
     </div>
   </div>
 </nav>
</template>
 
<style scoped>

.active-link {
 font-weight: bold;
 color: rgb(139, 56, 56) !important;
}

.navbar-light .navbar-nav .nav-link {
 color: #fff; /* White color */
 transition: all 0.3s ease;
}

nav {
 padding: 2rem;
}

.navbar-nav {
 margin: auto;
 padding-right: 5rem;
}

.nav-link:hover {
 text-decoration: underline;
 transform: scale(1.1);
}

</style>
