<script setup>

</script>

<template>
  <h1>Hello world</h1>
  <button class="btn btn-primary" @click="goToDayBook">Primary</button>
  <button class="btn btn-secondary" @click="goToDayBook">Secondary</button>
  <button class="btn btn-success" @click="goToDayBook">Success</button>
</template>

<script>
export default {
  methods: {
    goToDayBook() {
      this.$router.push({ name: 'no-entry' })
    }
  }
}
</script>