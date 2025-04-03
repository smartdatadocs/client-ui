<template>
  <v-card>
    <v-tabs v-model="tab" bg-color="primary">
      <v-tab value="upload" to="/upload">Upload</v-tab>
      <v-tab value="download" to="/download">Download</v-tab>
    </v-tabs>

   
      <!-- Render the routed component -->
      <router-view></router-view>
   
  </v-card>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      tab: "upload", // Default tab
    };
  },
  watch: {
    // Sync the tab with the route
    $route(to) {
      this.tab = to.name; // Update the tab based on the route name
    },
  },
  mounted() {
    // Set the initial tab based on the current route
    this.tab = this.$route.name || "upload";
  },
};
</script>