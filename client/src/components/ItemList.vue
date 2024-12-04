<template>
  <div class="container">
    <h1 class="title">Items</h1>
    
    <!-- Table for displaying items -->
    <table v-if=" !showAddForm" class="item-table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Item Name</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in items" :key="item.id">
          <td>{{ item.id }}</td>
          <td>{{ item.name }}</td>
          <td>{{ item.description }}</td>
          <td>
            <button class="btn edit-btn" @click="editItem(item.id)">Edit</button>
            <button class="btn delete-btn" @click="deleteItem(item.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <!-- Add Item Button -->
    <button class="btn add-btn" @click="showAddForm = !showAddForm">
      {{ showAddForm ? 'Cancel' : 'AddItem' }}
    </button>

    <!-- Form for adding/editing items -->
    <div v-if="showAddForm" class="add-item-form">
      <input class="input" v-model="newItem.name" placeholder="Enter item name..." />
      <textarea class="textarea" v-model="newItem.description" placeholder="Description..."></textarea>
      <button class="btn save-btn" @click="saveItem">{{ isEditing ? 'Update' : 'Save' }}</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      items: [],
      showAddForm: false,
      newItem: {
        name: '',
        description: '',
      },
      formError :{
        name: '',
        description: '',
      },
      isEditing: false,  // Flag to check if we are editing an item
      currentItemId: null,  // Store the ID of the item we are editing
    };
  },
  methods: {
    async fetchItems() {
      const response = await axios.get('http://localhost:5000/items');
      this.items = response.data;
    },
    async addItem() {
      await axios.post('http://localhost:5000/items', this.newItem);
      this.fetchItems();
      this.newItem.name = '';
      this.newItem.description = '';
      this.showAddForm = false; 
    },
    async editItem(id) {
      const item = this.items.find((item) => item.id === id);
      this.newItem = { ...item };  // Set the form fields to the current item data
      this.showAddForm = true;  // Show the form
      this.isEditing = true;  // Set the flag to true since we are editing
      this.currentItemId = id;  // Store the ID of the item being edited
    },

    async saveItem() {
      try {
        if (!this.newItem.name || !this.newItem.description) {
          alert('Input fill in all fields !!')
          return;
        }
        if (this.isEditing) {
          // If we are editing, send a PUT request to update the item
          await axios.put(`http://localhost:5000/items/${this.currentItemId}`, this.newItem);
          console.log("Item updated successfully");
          this.isEditing = false;
        } else {
          // If we are adding, send a POST request
          const response = await axios.post('http://localhost:5000/items', this.newItem);
          console.log("New item added successfully:", response.data);
        }

        // ຫຼັງ ຈາກ save, ຈະ updated ລາຍ ການ ແລະ ລ້າງ ຟອມ
        this.fetchItems();
        this.newItem.name = '';
        this.newItem.description = '';
        this.showAddForm = false;
      } catch (error) {
        console.error("Error saving item:", error.response ? error.response.data : error.message);
      }
    },
    async deleteItem(id) {
      await axios.delete(`http://localhost:5000/items/${id}`);
      this.fetchItems();
    },
  },
  mounted() {
    this.fetchItems();
  },
};
</script>

<style scoped>
/* styles for layout */
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 50px;
  font-family: 'Arial', sans-serif;
  background-color: #f9f9f9;
  border-radius: 8px;
}

.title {
  font-size: 2rem;
  font-weight: 600;
  margin-bottom: 20px;
  color: #333;
}

/* Table Styling */
.item-table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

.item-table th,
.item-table td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid #000000;
  background-color: #2e3b41;
}

.item-table th {
  background-color: #2e3b41;
}

.item-table tr:hover {
  background-color: #a79797;
}

/* Button Styling */
.btn {
  padding: 8px 12px;
  font-size: 0.9rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.edit-btn {
  background-color: #007bff;
  color: white;
  margin-right: 8px;
}

.edit-btn:hover {
  background-color: #0056b3;
}

.delete-btn {
  background-color: #dc3545;
  color: white;
}

.delete-btn:hover {
  background-color: #c82333;
}

.add-btn {
  background-color: #28a745;
  color: white;
  padding: 10px 20px;
  font-size: 1rem;
  border-radius: 6px;
  margin-top: 20px;
  cursor: pointer;
  display: block;
  width: 100%;
  text-align: center;
}

.add-btn:hover {
  background-color: #2350cc;
}

.add-item-form {
  margin-top: 20px;
  background-color: white;
  padding: 20px;
  border-radius: 6px;
  box-shadow: 0 1px 4px rgba(9, 255, 0, 0.1);
}

.input, .textarea {
  width: 100%;
  padding: 10px;
  font-size: 1rem;
  margin-bottom: 15px;
  border-radius: 4px;
  border: 1px solid #ccc;
  box-sizing: border-box;
}

.input:focus, .textarea:focus {
  outline: none;
  border-color: #007bff;
}

.save-btn {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  font-size: 1rem;
  border-radius: 6px;
  cursor: pointer;
}

.save-btn:hover {
  background-color: #0056b3;
}

.textarea {
  min-height: 120px;
  resize: vertical;
}
</style>
