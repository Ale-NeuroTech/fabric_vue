<template>
    <div>
        <FabricCanvas />
    </div>
</template>

<script>
import FabricCanvas from '../components/FabricCanvas.vue';

export default {
  components: {
    FabricCanvas,
},
  methods: {
    irAFabric() {
      this.$router.push('/map');
    }
  }
}
</script>