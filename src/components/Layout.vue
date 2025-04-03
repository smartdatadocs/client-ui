<template>
    <v-app>
      <v-navigation-drawer v-model="drawer" app>
        <v-list>
          <v-list-item link :to="{ name: 'home' }">
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>
          <v-list-item link :to="{ name: 'about' }">
            <v-list-item-title>About</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
  
      <v-app-bar app>
        <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
        <v-toolbar-title>{{title}}</v-toolbar-title>
      </v-app-bar>
  
      <v-main>
        <router-view></router-view>
      </v-main>
  
      <v-footer app>
        <v-col class="text-center">Footer Content</v-col>
      </v-footer>
    </v-app>
  </template>
  
  <script>
  export default {
    data() {
      return {
        drawer: false,
        title: import.meta.env.VITE_ORGANIZATION,
      };
    },
  };
  </script>
  
  <style>
  /* Add any custom styles here */
  </style>