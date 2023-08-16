
<template>
    <div id="app">
        <button @click="goToMap">Fabric demo</button>
        <button @click="goToSega">Sega demo</button>
        <button @click="goToTestPage">Test Page for sega</button>
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
    goToTestPage() {
      this.$router.push("/testPage");
    },
  },
};
</script>