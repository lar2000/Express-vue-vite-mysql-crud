<template>
  <div id="app">
    <nav>
      <ul>
        <li><router-link to="/city">City</router-link></li>
        <li><router-link to="/users">Users</router-link></li>
        <li><router-link to="/item-list">item</router-link></li>
      </ul>
    </nav>
    <router-view></router-view>
    
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style scoped>
/* Styles for navigation */
nav {
  background: #2c3e50;
  padding: 10px;
}

nav ul {
  list-style-type: none;
  margin: 0;
  padding: 0;
  display: flex;
  gap: 10px;
}

nav ul li {
  display: inline;
}

nav ul li a {
  color: white;
  text-decoration: none;
}

nav ul li a.router-link-exact-active {
  font-weight: bold;
  text-decoration: underline;
}
</style>
