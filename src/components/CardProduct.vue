<script>
export default {
  name: 'CardProduct',
  props: ['star', 'name', 'price', 'sold', 'url', 'id']
}
</script>

<template>
  <div class="col-xl-3 col-lg-3 col-md-4 col-sm-4 col-6" >
  <router-link :to="`/product/${id}`"
               class=" product-card-mobile tw-no-underline tw-text-black tw-p-5 hover:tw-shadow-lg tw-transition tw-duration-500 tw-cursor-pointer tw-rounded "
               style="text-decoration: none;"
               >
    <div class="card-product-image">
      <img class="tw-object-fit tw-w-full tw-h-60"
           :src="url"
           alt="">
    </div>
    <div class="fix-a">
      {{ name }}
    </div>
    <div class="card-product-item tw-flex tw-divide-x-2">
      <star-rating
          star-size="20"
          :show-rating="false"
          :rating="Number(star)"
          :read-only="true"
      />
      <div>
        <n-divider vertical/>
      </div>
      <div>
        <span>Stocking {{ sold }}</span>
      </div>
    </div>
    <div>
      <span class="tw-text-xl tw-font-bold">{{ price }} đ</span>
    </div>


  </router-link>
 </div>
</template>

<style scoped lang="scss">
.n-divider.n-divider--vertical {
  @apply tw-bg-gray-400;
}
</style>