<template>
    <div class="users-container">
        <h1 class="title">Users List Page</h1>
        <div class="actions">
            <button class="btn btn-add" @click="openModal('Add')">
                <i class="bx bx-user-plus"></i> Add User
            </button>
        </div>
        <div class="table-responsive">
            <table class="table-users">
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Surname</th>
                        <th>Village</th>
                        <th>District</th>
                        <th>Province</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="user in Users" :key="user.user_id">
                        <td>{{ user.user_id }}</td>
                        <td>{{ user.user_name }}</td>
                        <td>{{ user.user_surname }}</td>
                        <td>{{ user.village }}</td>
                        <td>{{ user.district }}</td>
                        <td>{{ user.province }}</td>
                        <td>
                            <button class="btn btn-edit" @click="editUser(user)">
                                <i class="bx bx-edit"></i>
                            </button>
                            <button class="btn btn-delete" @click="deleteUser(user.user_id)">
                                <i class="bx bx-trash"></i>
                            </button>
                        </td>
                    </tr>
                    <tr v-if="Users.length === 0">
                        <td colspan="7" class="text-center">No users found</td>
                    </tr>
                </tbody>
            </table>
        </div>

        <!-- Modal for Adding/Editing Users -->
        <div v-if="showModal" class="modal-overlay">
            <div class="modal">
                <h2>{{ modalTitle }}</h2>
                <form @submit.prevent="submitUser">
                    <div class="form-group">
                        <label for="name">Name:</label>
                        <input type="text" v-model="currentUser.user_name" placeholder="Enter name" required />
                    </div>
                    <div class="form-group">
                        <label for="surname">Surname:</label>
                        <input type="text" v-model="currentUser.user_surname" placeholder="Enter surname" required />
                    </div>
                    <div class="form-group">
                        <label for="village">Village:</label>
                        <input type="text" v-model="currentUser.village" placeholder="Enter village" required />
                    </div>
                    <div class="form-group">
                        <label for="district">District:</label>
                        <input type="text" v-model="currentUser.district" placeholder="Enter district" required />
                    </div>
                    <div class="form-group">
                        <label for="province">Province:</label>
                        <input type="text" v-model="currentUser.province" placeholder="Enter province" required />
                    </div>
                    <div class="modal-actions">
                        <button type="submit" class="btn btn-save">
                            {{ modalAction }}
                        </button>
                        <button type="button" class="btn btn-cancel" @click="closeModal">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import ax from "axios";

export default {
    data() {
        return {
            Users: [],
            showModal: false,
            currentUser: {
                user_id: null,
                user_name: "",
                user_surname: "",
                village: "",
                district: "",
                province: "",
            },
            modalTitle: "",
            modalAction: "",
        };
    },
    mounted() {
        this.fetchUsers();
    },
    methods: {
        async fetchUsers() {
            try {
                const response = await ax.get("http://localhost:5000/users");
                this.Users = response.data;
            } catch (error) {
                console.error("Error fetching users:", error);
            }
        },
        openModal(action, user = null) {
            this.showModal = true;
            if (action === "Add") {
                this.modalTitle = "Add User";
                this.modalAction = "Save";
                this.currentUser = {
                    user_id: null,
                    user_name: "",
                    user_surname: "",
                    village: "",
                    district: "",
                    province: "",
                };
            } else if (action === "Edit") {
                this.modalTitle = "Edit User";
                this.modalAction = "Update";
                this.currentUser = { ...user };
            }
        },
        closeModal() {
            this.showModal = false;
        },
        async submitUser() {
            try {
                if (this.modalAction === "Save") {
                    await ax.post("http://localhost:5000/users", this.currentUser);
                } else {
                    await ax.put(
                        `http://localhost:5000/users/${this.currentUser.user_id}`,
                        this.currentUser
                    );
                }
                this.fetchUsers();
                this.closeModal();
            } catch (error) {
                console.error("Error submitting user:", error);
            }
        },
        editUser(user) {
            this.openModal("Edit", user);
        },
        async deleteUser(user_id) {
            if (confirm("Are you sure you want to delete this user?")) {
                try {
                    await axios.delete(`http://localhost:5000/users/${user_id}`);
                    this.fetchUsers();
                } catch (error) {
                    console.error("Error deleting user:", error);
                }
            }
        },
    },
};
</script>

<style scoped>
/* Modern Styles */
.users-container {
    margin: 20px auto;
    padding: 10px;
    max-width: 1000px;
    font-family: "Arial", sans-serif;
    color: #333;
}

.title {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 20px;
    color: #ffffff;
}

.actions {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 20px;
}

.btn {
    padding: 10px 10px;
    border: none;
    border-radius: 4px;
    font-size: 1rem;
    cursor: pointer;
}

.btn-add {
    background-color: #28a745;
    color: #fff;
}

.btn-edit {
    background-color: #007bff;
    color: #fff;
}

.btn-delete {
    margin: 4px;
    background-color: #dc3545;
    color: #fff;
}

.table-responsive {
    overflow-x: auto;
}

.table-users {
    width: 100%;
    border-collapse: collapse;
    background-color: #fff;
}

.table-users th,
.table-users td {
    padding: 12px;
    border: 1px solid #ddd;
}

.table-users thead {
    background-color: #343a40;
    color: #fff;
}

.table-users tbody tr:nth-child(even) {
    background-color: #f8f9fa;
}

.table-users tbody tr:hover {
    background-color: #e9ecef;
}

.text-center {
    text-align: center;
    font-size: 1rem;
}

/* Modal */
.modal-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(216, 216, 216, 0.5);
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal {
    background: #fff;
    padding: 20px;
    border-radius: 4px;
    width: 400px;
}

.modal h2 {
    margin-bottom: 20px;
    text-align: center;
}

.form-group {
    margin-bottom: 15px;
}

.form-group label {
    display: block;
    font-weight: bold;
}

.form-group input {
    width: 100%;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
}

.modal-actions {
    display: flex;
    justify-content: space-between;
}

.modal-actions .btn {
    width: 48%;
}
</style>
