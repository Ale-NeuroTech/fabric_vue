<template>
    <div>
        <FabricCanvas />
    </div>
</template>

<script>
import FabricCanvas from '../components/segaCanvas.vue';

export default {
  components: {
    FabricCanvas,
},
  methods: {
    irAFabric() {
      this.$router.push('/segasamy');
    }
  }
}
</script>