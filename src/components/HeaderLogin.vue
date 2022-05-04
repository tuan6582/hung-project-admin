<script>
export default {
  name: 'HeaderLogin',
}
</script>

<template>
  <div class="header">
    <div class="tw-flex tw-justify-between">
      <div class="tw-text-2xl">
       Login
      </div>
      <div>
      <router-link to="#" class="tw-no-underline tw-text-red-700 tw-font-medium">
       Need help?
      </router-link>
      </div>
    </div>
  </div>
</template>
  
<style lang="scss" scoped>
.header {
  @apply tw-h-20  tw-px-40 tw-flex tw-flex-col tw-justify-center;
}
</style>