
<template>
    <div id="app">
        <button @click="goToMap">Fabric demo</button>
        <button @click="goToSega">Sega demo</button>
      </div>
    </template>
    
  
  
<script>
export default {
  name: "App",
  methods: {
    goToMap() {
      this.$router.push("/map");
    },
    goToSega() {
      this.$router.push("/segasamy");
    },
  },
};
</script>