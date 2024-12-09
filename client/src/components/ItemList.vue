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
            <button class="btn edit-btn" @click="editItem(item.id)"><i class='bx bx-edit-alt'></i></button>
            <button class="btn delete-btn" @click="deleteItem(item.id)"><i class='bx bx-trash'></i></button>
          </td>
        </tr>
      </tbody>
    </table>
    
    <!-- Add Item Button -->
    <button class="btn add-btn" @click="resetForm">
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
import api from '../http'
import axios from 'axios';
import Swat from 'sweetalert2';

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
      const response = await axios.get(`${api}/items`);
      this.items = response.data;
    },
    resetForm() {
    this.showAddForm = !this.showAddForm;

    if (!this.showAddForm) {
      // Reset the form and editing state when the form is hidden
      this.newItem = { name: '', description: '' };
      this.isEditing = false;
      this.currentItemId = null;
    }
  },
    async addItem() {
      await axios.post(`${api}/items`, this.newItem);
      this.newItem.name = '';
      this.newItem.description = '';
      this.showAddForm = false; 
    },
    async editItem(id) {
      const item = this.items.find((item) => item.id === id);
      this.newItem = { ...item };  // Set the form fields to the current item data
      this.showAddForm = true; 
      this.isEditing = true;  
      this.currentItemId = id;  
    },

    async saveItem() {
      try {
        if (!this.newItem.name || !this.newItem.description) {
          //alert('Input fill in all fields !!')
          Swat.fire('Warning', 'Pleas fill in all fields!', 'warning')
          return;
        }
        if (this.isEditing) {
          // ##  JavaScript confirm--------->>>

          // const confUpdate = confirm('Are you sure you want to update?');
          // if (!confUpdate) {
          //   return;
          // }

          // ## Sweet alert confirm-------->>
          const confUpdate = await Swat.fire ({
            title: 'Are you sure?',
            text: 'Do you want to update this?',
            icon: 'warning',
            iconColor:'orange',
            showCancelButton: true,
            confirmButtonColor:'green',
            cancelButtonColor: 'red',
            confirmButtonText: 'Yes, update it!',
            cancelButtonText: 'Cancel'
          });
            if (!confUpdate.isConfirmed) {
              return;
            }
          // If we are editing, send a PUT request to update the item
          await axios.put(`${api}/items/${this.currentItemId}`, this.newItem);
          //console.log("Item updated successfully");
          Swat.fire('Updated!', 'Updated successfully.!', 'success');

          this.isEditing = false;
        } else {
          // If we are adding, send a POST request
          const response = await axios.post(`${api}/items`/items, this.newItem);
          //console.log("New item added successfully:", response.data);
          Swat.fire('Added!', 'Added successfully!', 'success')
        }
        

        // ຫຼັງ ຈາກ save, ຈະ updated ລາຍ ການ ແລະ ລ້າງ ຟອມ
        this.fetchItems();
        this.resetForm();
        this.showAddForm = false;
      } catch (error) {
        //console.error("Error saving item:", error.response ? error.response.data : error.message);
        Swat.fire('Error!', error.response ? error.response.data : error.message, 'error');

      }
    },
    async deleteItem(id) {

      // ## JavaScript confirm-------------->>>
      // const confDelete = confirm('Are you sure you want to delete?');
      // if (!confDelete) {
      //   return;
      // }
      const confDelete = await Swat.fire ({
        title: 'Are you sure?',
        text: 'This action cannot be undone!',
        icon: 'warning',
        iconColor:'orange',
        showCancelButton: true,
        confirmButtonText: 'Yes, delete it!',
        confirmButtonColor: 'green',
        cancelButtonText: 'Cancel',
        cancelButtonColor: 'red'
      });
          if (confDelete.isConfirmed) {
        try {
          await axios.delete(`${api}/items/${id}`);
          Swat.fire('Deleted!', 'The item has been deleted successfully.', 'success');
          this.fetchItems();
        } catch (error) {
          Swat.fire('Error!', error.response ? error.response.data : error.message, 'error');
        }
      }
      }
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
