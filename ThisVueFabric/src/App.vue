<template>
  <main>
    
    <!-- Lo que va a aparecer siempre -->
    <Omni/>

    <!--Lo que aparecera dependiendo de la ruta-->
    <div>
      <button @click="goTohome">Home</button>
      <router-view></router-view>
    </div>

  </main>
</template>


<script setup>
 import Omni from './components/omniComponent.vue';
</script>
<script>
export default {
  name: "App",
  methods: {
    goTohome() {
      this.$router.push("/");
    },
  },
};
</script>
