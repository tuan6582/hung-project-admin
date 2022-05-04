<script>
import Header from "../components/Header.vue";

export default {
  name: 'DefaultLayout',
  components: {
    Header
  }
}
</script>

<template>
  <div>
    <Header/>
    <div>
      <slot></slot>
    </div>
  </div>
</template>