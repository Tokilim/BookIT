<template>
  <div class="main">
    <div class="focusContainer">
      <div class="fc">
        <h2>Deluxe Room</h2>
        <p></p>
      </div>
    </div>

    <div class="bookingContainer">
      <form @submit.prevent="submitForm">
        <div class="startDate">
          <label for="myStartInputDate">Start Date</label>
          <input type="date" id="myStartInputDate" v-model="formData.startDate" :min="minDate" />
        </div>
        <div class="endDate">
          <label for="myEndInputDate">End Date</label>
          <input type="date" id="myEndInputDate" v-model="formData.endDate" :min="minDate" />
        </div>
        <div class="pax">
          <label for="enterPax">Pax</label>
          <input type="number" id="enterPax" v-model="formData.pax" min="1" />
        </div>
        <button type="submit">Book Now</button>
      </form>
    </div>

    <div class="about">
      <div class="title">
      </div>
      <div class="aboutContainer">
        <div class="imageContainer">
          <!-- <img src="../assets/room2.jpg" height="700px" width="100%" alt="Deluxe Room" /> -->
        </div>
        <div>
          <div class="detachContainer">
            <h2>Luxury Redefined, Your Exquisite Escape</h2>
            <p>
              Indulge in luxury with our Deluxe Room. Immerse yourself in the sophisticated charm of this spacious accommodation, 
              complete with upscale furnishings and refined decor. Whether you're here for business or leisure, 
              the Deluxe Room provides an elevated experience that exceeds expectations.
            </p>
            <form @submit.prevent="submitUnverifiedBooking">
              <div class="apax">
                <label>Pax</label>
                <input type="number" id="enterPax" v-model="unverifiedBooking.pax" />
              </div>
              <button type="submit">Book Now</button>
            </form>
          </div>
        </div>
      </div>
    </div>

    <div class="roomType">
      <div class="title">
        <h2>Exclusive Gateway Offers</h2>
        <p>
          Experience unparalleled luxury and tranquility in our meticulously designed rooms at Swift Hotel, where
          every detail is crafted to elevate your stay into a seamless blend of comfort and sophistication.
        </p>
      </div>
      <div class="roomContainer">
        <div class="box">
          <a href="/room/standard" style="text-decoration: none; color: black;">
            <img src="../assets/room1.jpg" style="object-fit: cover; width: 380px; height: 250px; object-position: center;" />
            <div class="night">
              <span>Standard Room</span>
              <span>₱1,000/night</span>
            </div>
          </a>
        </div>
        <div class="box">
          <a href="/room/deluxe" style="text-decoration: none; color: black;">
            <img src="../assets/room2.jpg" style="object-fit: cover; width: 380px; height: 250px; object-position: center;" />
            <div class="night">
              <span>Deluxe Room</span>
              <span>₱1,500/night</span>
            </div>
          </a>
        </div>
        <div class="box">
          <a href="/room/supreme" style="text-decoration: none; color: black;">
            <img src="../assets/room3.jpg" style="object-fit: cover; width: 380px; height: 250px; object-position: center;" />
            <div class="night">
              <span>Supreme Room</span>
              <span>₱2,000/night</span>
            </div>
          </a>
        </div>
        <div class="box">
          <a href="/room/family" style="text-decoration: none; color: black;">
            <img src="../assets/room4.jpg" style="object-fit: cover; width: 380px; height: 250px; object-position: center;" />
            <div class="night">
              <span>Family Room</span>
              <span>₱2,400/night</span>
            </div>
          </a>
        </div>
      </div>
    </div>

    <div class="faqss">
      <div class="title">
        <h2>Frequently Asked Questions</h2>
      </div>
      <div class="faqsFlexContainer">
        <div class="faqsCard" v-for="(faq, index) in faqs" :key="index">
          <h2>{{ faq.question }}</h2>
          <p>{{ faq.answer }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const minDate = new Date().toISOString().split('T')[0]; // Get today's date in YYYY-MM-DD format

const formData = ref({
  startDate: '',
  endDate: '',
  pax: 1,
});

const unverifiedBooking = ref({
  pax: 1,
});

const submitForm = () => {
  console.log('Form data:', formData.value);
  // Perform form submission logic (e.g., API call)
};

const submitUnverifiedBooking = () => {
  console.log('Unverified booking:', unverifiedBooking.value);
  // Perform unverified booking logic
};

const faqs = ref([
  {
    question: 'Can I see photos of the hotel rooms before booking?',
    answer: 'Yes, each hotel listing includes photos and detailed information about the rooms and amenities.',
  },
  {
    question: 'Are the prices on Swift Hotel per person or per room?',
    answer: 'Prices are generally per room, per night. The number of guests included in the price is specified during the booking process.',
  },
  {
    question: 'Do hotels on Swift Hotel include breakfast?',
    answer: 'Some hotels offer complimentary breakfast, while others may charge an additional fee. Check the hotel details for this information.',
  },
  {
    question: 'How do I contact Swift Hotel customer support?',
    answer: 'Visit our "Contact Us" page for information on reaching our customer support team via email or phone.',
  },
  {
    question: 'What do I do if I encounter issues during the booking process?',
    answer: 'Contact our customer support for assistance, and we\'ll be happy to help you resolve any issues.',
  },
  {
    question: 'Are there any special promotions or discounts available?',
    answer: 'Check our website regularly for promotions, and subscribe to our newsletter to receive exclusive offers.',
  },
]);
</script>
  
  <style scoped>
    form .apax {
          display: none !important;
      }

      

* {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
}

html::-webkit-scrollbar,
body::-webkit-scrollbar {
    width: 5px;
}

html::-webkit-scrollbar-thumb,
body::-webkit-scrollbar-thumb {
    background-color: #ccc;
    border-radius: 100px;
}

header .navbar {
    width: 100%;
    height: 100px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background-color: transparent;
    padding: 10px;
    position: absolute;
}

    header .navbar .controller {
        width: 100%;
        display: flex;
        justify-content: flex-end;
        gap: 20px;
        padding: 0 20px;
        /* Additional styling for login and register pages */
    }

        header .navbar .controller a {
            background-color: transparent;
            border: none;
            cursor: pointer;
            font-size: 16px;
            text-decoration: none;
            font-family: "Oxygen";
            color: #fff;
            z-index: 999;
        }

        header .navbar .controller body.login a#loginLink,
        header .navbar .controller body.register a#loginLink {
            color: #000; /* Change color for login and register pages */
        }

.main {
    width: 100%;
    height: 600px;
    background-color: #000;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 10px;
    position: relative;
    flex-direction: column;
}

@media screen and (max-width: 1200px) {
    .main {
        width: 100%;
        height: auto;
    }
}

.main .focusContainer {
    width: 100%;
    height: 600px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
}

    .main .focusContainer h1 {
        font-size: 2rem;
        z-index: 999;
        font-family: "Poppins";
        color: #fff;
        text-align: center;
    }

    .main .focusContainer h2 {
        font-size: 2rem;
        z-index: 999;
        font-family: "Poppins";
        color: #fff;
        text-align: center;
    }

    .main .focusContainer p {
        width: 100%;
        text-align: center;
        color: #fff;
        opacity: 1;
        font-size: 1rem;
        font-family: "Oxygen";
    }

@media screen and (max-width: 1200px) {
    .main .focusContainer {
        height: 450px;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
    }

        .main .focusContainer .fc {
            height: 500px;
            display: flex;
            align-items: center;
            justify-content: center;
            flex-direction: column;
            position: absolute;
            top: 65px;
        }

        .main .focusContainer h2 {
            font-size: 1.4rem;
        }

        .main .focusContainer p {
            display: none;
        }
}

.main .bookingContainer {
    width: 800px;
    height: 80px;
    z-index: 999;
    position: absolute;
    bottom: -40px;
    background-color: #fff;
    display: flex;
    padding: 0 10px;
    align-items: center;
    border-radius: 5px;
    box-shadow: 0px 0px 3px 0px #ccc;
}

    .main .bookingContainer form {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 20px;
        width: 100%;
    }

        .main .bookingContainer form .startDate,
        .main .bookingContainer form .endDate,
        .main .bookingContainer form .pax {
            display: flex;
            flex-direction: column;
            gap: 5px;
        }

            .main .bookingContainer form .startDate label,
            .main .bookingContainer form .endDate label,
            .main .bookingContainer form .pax label {
                font-family: "Oxygen";
            }

            .main .bookingContainer form .startDate input[type=date],
            .main .bookingContainer form .endDate input[type=date],
            .main .bookingContainer form .pax input[type=date] {
                width: 200px;
                height: 30px;
                font-family: "Oxygen";
                box-shadow: 0px 0px 3px 0px #ccc;
                border: none;
                padding: 0 5px;
            }

            .main .bookingContainer form .startDate input[type=number],
            .main .bookingContainer form .endDate input[type=number],
            .main .bookingContainer form .pax input[type=number] {
                width: 100px;
                height: 30px;
                font-family: "Oxygen";
                box-shadow: 0px 0px 3px 0px #ccc;
                border: none;
                padding: 0 5px;
            }

        .main .bookingContainer form button {
            width: 150px;
            height: 50px;
            background-color: #ffd700;
            border-radius: 3px;
            font-weight: 600;
            border: none;
            color: #000;
            cursor: pointer;
        }

@media screen and (max-width: 1200px) {
    .main .bookingContainer {
        width: 100%;
        height: auto;
        position: relative;
    }

        .main .bookingContainer form {
            width: 100%;
            height: 350px;
            display: flex;
            align-items: flex-start;
            flex-direction: column;
            justify-content: center;
            padding: 20px;
        }

            .main .bookingContainer form .startDate,
            .main .bookingContainer form .endDate,
            .main .bookingContainer form .pax {
                width: 100%;
            }

                .main .bookingContainer form .startDate input[type=date],
                .main .bookingContainer form .endDate input[type=date],
                .main .bookingContainer form .pax input[type=date] {
                    width: 100%;
                }

                .main .bookingContainer form .startDate input[type=number],
                .main .bookingContainer form .endDate input[type=number],
                .main .bookingContainer form .pax input[type=number] {
                    width: 100%;
                }

            .main .bookingContainer form button {
                width: 100%;
            }
}

.main::before {
    content: "";
    background-repeat: no-repeat;
    background-position: center;
    background-size: cover;
    background-image: url("../assets/background.jpg");
    display: block;
    opacity: 0.3;
    position: absolute;
    inset: 0;
}

.about {
    width: 100%;
    height: auto;
}

    .about .title {
        width: 100%;
        height: 70px;
        display: flex;
        align-items: center;
        justify-content: center;
    }

        .about .title h2 {
            font-family: "Poppins";
            font-size: 2rem;
        }

    .about .aboutContainer {
        width: 100%;
        display: flex;
        padding: 20px;
    }

@media screen and (max-width: 1200px) {
    .about .aboutContainer {
        flex-direction: column;
        height: auto;
    }

        .about .aboutContainer .imageContainer {
            display: none;
        }

        .about .aboutContainer div .detachContainer {
            width: 100%;
            height: 100%;
            position: relative;
            padding: 0;
        }

            .about .aboutContainer div .detachContainer h2 {
                font-size: 1.6rem;
            }

            .about .aboutContainer div .detachContainer button {
                height: 60px;
            }
}

.about .aboutContainer div {
    width: 100%;
    height: auto;
    padding: 10px;
    display: flex;
    justify-content: flex-start;
    gap: 20px;
    position: relative;
}

.about .aboutContainer .detachContainer {
    border-radius: 3px;
    padding: 20px 30px;
    height: 450px;
    width: 750px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    border-radius: 5px;
}

    .about .aboutContainer .detachContainer h2 {
        font-family: "Poppins";
        font-size: 1.8rem;
        font-weight: 300;
    }

    .about .aboutContainer .detachContainer p {
        font-size: 17px;
        font-family: "Oxygen";
    }

    .about .aboutContainer .detachContainer button {
        width: 700px;
        height: 65px;
        background-color: #ffd700;
        border: none;
        color: #000;
        border-radius: 3px;
        font-weight: 600;
        font-size: 16px;
        font-family: "Oxygen";
    }

.roomType {
    width: 100%;
    height: auto;
    padding: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 10px;
}

    .roomType .title {
        width: 100%;
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

        .roomType .title h2 {
            font-family: "Poppins";
            font-size: 2rem;
        }

        .roomType .title p {
            width: 900px;
            font-size: 1.2rem;
            text-align: center;
        }

@media screen and (max-width: 1200px) {
    .roomType h2 {
        font-size: 1.8rem;
    }

    .roomType p {
        width: 200px;
        font-size: 1rem;
    }
}

@media screen and (max-width: 1200px) {
    .roomType .title h2 {
        font-size: 1.8rem;
    }

    .roomType .title p {
        width: auto;
        font-size: 1rem;
        padding: 0 20px;
    }
}

.roomType .roomContainer {
    width: 100%;
    display: grid;
    grid-template-columns: repeat(auto-fit, 400px);
    justify-content: center;
    align-items: center;
    gap: 20px;
}

@media screen and (max-width: 600px) {
    .roomType .roomContainer {
        padding: 40px;
    }

        .roomType .roomContainer .box {
            padding: 20px;
        }

            .roomType .roomContainer .box .night {
                padding: 0 20px;
            }
}

.roomType .roomContainer .box {
    width: 400px;
    height: auto;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 10px;
    border: 1px solid #ccc;
}

    .roomType .roomContainer .box:hover {
        box-shadow: 0px 0px 3px 0px #ccc;
    }

    .roomType .roomContainer .box .night {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

        .roomType .roomContainer .box .night span {
            text-align: center;
            font-size: 16px;
            font-family: "Oxygen";
        }

    .roomType .roomContainer .box a {
        text-decoration: none; /* Remove underline */
        color: black; /* Set the color to black or your preferred color */
    }

.faqss {
    width: 100%;
    height: auto;
    padding: 10px;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 10px;
}

    .faqss .title {
        width: 100%;
        height: 150px;
        display: flex;
        align-items: center;
        justify-content: center;
        flex-direction: column;
    }

        .faqss .title h2 {
            font-family: "Poppins";
            font-size: 1.8rem;
        }

@media screen and (max-width: 600px) {
    .faqss .title h2 {
        text-align: center;
        font-size: 2rem;
    }
}

.faqss .faqsFlexContainer {
    width: 900px;
    display: flex;
    flex-direction: column;
    justify-content: centerw;
    align-items: center;
    gap: 10px;
    padding: 0 20px;
}

    .faqss .faqsFlexContainer .faqsCard {
        width: 900px;
        height: auto;
        display: flex;
        flex-direction: column;
        padding: 15px 20px;
        gap: 5px;
    }

@media screen and (max-width: 600px) {
    .faqss .faqsFlexContainer .faqsCard {
        width: 900px;
        padding: 10px;
    }

        .faqss .faqsFlexContainer .faqsCard h2 {
            font-family: "Poppins";
            font-size: 16px;
        }

        .faqss .faqsFlexContainer .faqsCard p {
            width: auto;
            font-size: 1rem;
        }
}

.faqss .faqsFlexContainer .faqsCard h2 {
    font-family: "Poppins";
    font-size: 1.3rem;
}

.faqss .faqsFlexContainer .faqsCard p {
    width: auto;
    font-size: 1.2rem;
}
  </style>
  