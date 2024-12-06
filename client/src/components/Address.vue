<template>
    <div class="address-container">
      <h1 class="title">LAos City</h1>
      <div class="table-responsive">
      <table class="table-address">
        <thead>
          <tr>
            <th>village_id</th>
            <th>village_name</th>
            <th>district_id</th>
            <th>district_name</th>
            <th>province_id</th>
            <th>province_name</th>
          </tr>
        </thead>
      <tbody>
<!----------------------------- Loop ຂອງ ຂໍ້ມູນ ທີ ສະ ແດງ -------------------------------->
        <tr v-for="city in city" :key="city.id">
          <td>{{ city.village_id }}</td>
          <td>{{ city.village_name }}</td>
          <td>{{ city.district_id }}</td>
          <td>{{ city.district_name }}</td>
          <td>{{ city.province_id }}</td>
          <td>{{ city.province_name }}</td>
        </tr>
      </tbody>
    </table>
    </div>
    </div>
</template>
  
<script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        city: [], // Store the fetched city data
      };
    },
    mounted() {
      this.fetchCity(); // Fetch city data when the component is mounted
    },
    methods: {
      async fetchCity() {
        try { 
          const response = await axios.get('http://localhost:5000/city'); // API ດຶງ ຂໍ້ມູນ
          this.city = response.data; // ເກັບ ຂໍ້ມູນ ທີ ດຶງ ມາ ໄວ້ ໃນ city
        } catch (error) {
          console.error('Error fetching city:', error);
        }
      },
    }
  };
  </script>
  
  <style scoped>
  /*-----------------Styles for your component----------------- */
.address-container {
  margin: 20px auto;
  padding: 0 10px;
  max-width: 1000px;
  font-family: 'Arial', sans-serif;
  color: #333;
}

.title {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 20px;
  color: #007bff;
}

.table-responsive {
  overflow-x: auto; /* Enable horizontal scrolling */
}

.table-address {
  width: 100%;
  border-collapse: collapse;
  background-color: #93b5d1;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.table-address thead tr {
  background-color: #001327;
  color: #fff;
}

.table-address th,
.table-address td {
  padding: 12px 15px;
  text-align: left;
  border: 1px solid #ddd;
}

.table-address tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

.table-address tbody tr:hover {
  background-color: #aae9ee;
}

.table-address th {
  font-weight: bold;
}

.table-address td {
  font-size: 0.95rem;
}

.table-address tr {
  transition: background-color 0.3s ease;
}

/* Responsive Design */
@media (max-width: 768px) {
  .title {
    font-size: 1.5rem;
  }

  .table-address th,
  .table-address td {
    font-size: 0.85rem;
    padding: 8px;
  }
}

@media (max-width: 480px) {
  .table-address th,
  .table-address td {
    font-size: 0.75rem;
    padding: 5px;
  }

  .table-address {
    font-size: 0.8rem;
  }
}
</style>
  