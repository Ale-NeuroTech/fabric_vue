<template>
    <div id="stencil_area" class="div2">
          <div class="controls">
            <button @click="emitAddRectangle">Agregar Rectángulo</button>
            <button @click="emitAddLine">Add a line</button>
            <button @click="emitAddSpace">Add a space</button>
            <button @click="emitAddText">Add text</button>
            <button @click="emitAddMachine">Add a machine</button>
          </div>
        </div>
</template>s

<script>
export default {
  name: 'stencil_area',
  methods: {
    emitAddRectangle() {
      this.$emit('add-rectangle-clicked');
    },
    emitAddLine() {
      this.$emit('add-line-clicked');
    },
    emitAddSpace() {
      this.$emit('add-space-clicked');
    },
    emitAddText() {
      this.$emit('add-text-clicked');
    },
    emitAddMachine() {
      this.$emit('add-machine-clicked');
    },
  }
}
</script>