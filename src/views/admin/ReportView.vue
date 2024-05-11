<template>
    <Sidebar />
    <main>
      <h1>Summary Report</h1>
      <div class="row">
        <!-- Room Statistics Cards -->
        <div class="col-md-4" v-if="roomStats">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">Most Reserved Room Type</h5>
              <p class="card-text">{{ getMostReservedType() }}</p>
            </div>
          </div>
        </div>
        <div class="col-md-4" v-for="(count, type) in roomStats" :key="type">
          <div class="card">
            <div class="card-body">
              <h5 class="card-title">{{ type }}</h5>
              <p class="card-text">Available: {{ count.available }}</p>
              <p class="card-text">Booked: {{ count.booked }}</p>
              <p class="card-text">Reserved: {{ count.reserved }}</p>
            </div>
          </div>
        </div>
        <!-- Visual Reports -->
        <div class="col-md-12">
          <div class="report">
            <div class="chart-container">
              <div class="card chart-card">
                <div class="card-header">Room Type Comparison</div>
                <div class="card-body">
                  <canvas id="roomTypeChart"></canvas>
                </div>
              </div>
              <div class="card chart-card">
                <div class="card-header">Total Revenue</div>
                <div class="card-body">
                  <canvas id="totalRevenueChart"></canvas>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  </template>
  
  <script setup>
  import Sidebar from '@/components/Sidebar.vue';
  import { ref, onMounted } from 'vue';
  import Chart from 'chart.js/auto';
  import { db } from '@/firebase';
  import { collection, getDocs } from 'firebase/firestore';
  
  const roomStats = ref(null);
  
  const fetchRoomStatistics = async () => {
    try {
      const roomsCollection = collection(db, 'rooms');
      const querySnapshot = await getDocs(roomsCollection);
      const roomTypesCount = {};
  
      querySnapshot.forEach(doc => {
        const room = doc.data();
        const roomType = room.type;
  
        if (!roomTypesCount[roomType]) {
          roomTypesCount[roomType] = {
            available: 0,
            booked: 0,
            reserved: 0
          };
        }
  
        if (room.available === 'Available') {
          roomTypesCount[roomType].available++;
        } else if (room.available === 'Booked') {
          roomTypesCount[roomType].booked++;
        } else if (room.available === 'Reserved') {
          roomTypesCount[roomType].reserved++;
        }
      });
  
      roomStats.value = roomTypesCount;
  
      const roomTypeLabels = [];
      const roomTypeReservedData = [];
  
      for (const [type, count] of Object.entries(roomStats.value)) {
        roomTypeLabels.push(type);
        roomTypeReservedData.push(count.reserved);
      }
  
      renderRoomTypeChart(roomTypeLabels, roomTypeReservedData);
      renderTotalRevenueChart(roomTypeLabels, roomTypeReservedData);
    } catch (error) {
      console.error('Error fetching room statistics:', error);
    }
  };
  
  const renderRoomTypeChart = (labels, data) => {
    const ctx = document.getElementById('roomTypeChart').getContext('2d');
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: labels,
        datasets: [{
          label: 'Reserved Rooms',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.6)',
          borderColor: 'rgba(54, 162, 235, 1)',
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  };
  
  const renderTotalRevenueChart = (labels, data) => {
  const roomPrices = {
    'Standard': 50,
    'Deluxe': 100,
    'Suite': 500
  };

  const totalRevenueData = labels.map(type => {
    const price = roomPrices[type] || 0;
    const reserved = roomStats.value[type]?.reserved || 0;
    return price * reserved;
  });

  const ctx = document.getElementById('totalRevenueChart').getContext('2d');
  new Chart(ctx, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [{
        label: 'Total Revenue',
        data: totalRevenueData,
        fill: false,
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero: true // Start the y-axis from 0
          }
        }]
      }
    }
  });
};

  
  onMounted(fetchRoomStatistics);
  </script>
  
  <style scoped>
  main {
    margin-left: 18rem;
    padding: 4rem;
  }
  </style>
  