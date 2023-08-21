<template>
    <div>
        <SegaCanvas />
    </div>
</template>

<script>
import SegaCanvas from '../components/segaCanvas.vue';

export default {
  components: {
    SegaCanvas,
},
  methods: {
    irAFabric() {
      this.$router.push('/map');
    }
  }
}
</script>