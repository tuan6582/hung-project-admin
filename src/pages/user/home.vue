<script>
import Default from "../../layouts/default.vue";
import CardProduct from "../../components/CardProduct.vue";
import {database} from "../../firebase/firebase";
import {ref, onValue} from "firebase/database";
import Footer from "../../components/Footer.vue";
export default {
  name: 'HomePage',
  components: {
    Default,
    CardProduct,
    Footer
  },
  data() {
    return {
      products: []
    }
  },
  created() {

    const productsRef = ref(database, 'products');

    onValue(productsRef, snapshot => {
      const val = snapshot.val();

      this.products = Object.keys(val).map(item => ({
        ...val[item],
        id: item
      }))
    }, (err) => console.log('err', err))
  }
}
</script>

<template>


  <Default>

    <div class="container">
     <div class="row">
     <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
      <h1 style="text-align: center; font-size: 2rem; margin: 20px  0; color: chocolate; font-style: italic; ">BEST SALE PRODUCTS</h1>
     </div>
     </div>
    </div>
    <div class="">
     <div class="container">
      <div class="row">
      <CardProduct :id="item.id" v-for="(item,index) in products" :key="item.id" :star="index" :name="item.name"
                   :price="item.price"
                   :url="item.url"/>
     </div>
     </div>
    </div>

     <div class="container">
     <div class="row">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
      <div style="margin: 2rem 0;">
         <h2 class="tw-text-purple-700 tw-flex tw-justify-center" style="font-size: 1.8rem; text-align: center; font-style: italic;"> 3 Reasons Why Should Buy Fruits At "HOA QUA SACH"</h2>
      </div>
     </div>
     <div class="container">
     <div class="row">
     <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
      
          <div class="review-item">
            <div class="tw-flex tw-justify-around">
              <img src="https://hoaquafuji.com/storage/app/media/t1_3.png" alt="">
            </div>

            <div class="tw-pt-3 tw-px-10">
              <span class="tw-flex tw-justify-center">CLEAN FRESH FRUITS ONLY</span>
              <p style="text-align:center;"> Always put the interests of consumers first.</p>
            </div>
          </div>
     </div>

       <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
          <div class="review-item">
            <div class="tw-flex tw-justify-center">
              <img src="https://hoaquafuji.com/storage/app/media/t1_4.png" alt="">
            </div>
            <div class="tw-pt-3 tw-px-10">
              <span class="tw-flex tw-justify-center">CLEAN FRESH FRUITS ONLY</span>
              <p style="text-align:center;">Free exchange within 24 hours when customers are not satisfied</p>
            </div>
          </div>
       </div>

         <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
          <div class="review-item">
            <div class="tw-flex tw-justify-center">
              <img src="https://hoaquafuji.com/storage/app/media/t1_5.png" alt="">
            </div>

            <div class="tw-pt-3 tw-px-10">
              <span class="tw-flex tw-justify-center">CLEAN FRESH FRUITS ONLY</span>
              <p style="text-align:center;">Professional process of importing, transporting and preserving goods.</p>
            </div>
          </div>
         </div>

     </div>
        </div>
      </div>
    </div>


    <div class="container">
      <div class="row">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
      <div id="fuji-mobile" class="tw-flex tw-justify-center tw-pt-10">
        <img src="https://hoaquafuji.com/themes/hoaquafuji/assets/img/border.png" alt="">
      </div>
      </div>
      </div>
    </div>
    <div class="container ">
     <div class="row">
    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
      <div>
        <h1 id="one-element-mobile" class="tw-flex tw-justify-center tw-text-amber-600">FEATURES ABOUT FUJI</h1>
        <p class="" style="word-break: break-all;">With the motto "Bringing customers not only safe and
          high-quality fruit products, but also friendly convenient services. "Fuji Import and Export Joint Stock
          Company" - a unit specializing in importing high-class fruits from countries around the world is gradually
          developing and winning the trust of Vietnamese consumers. Currently, the company has a system of stores under
          the brand name Fuji Clean Fruits, which are widely distributed throughout the Northern provinces to serve the
          needs of all customers. With constant efforts over time, the Fuji Clean Fruit system is getting better every
          day in all aspects.</p>
      </div>
    </div>
    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
      <div style="height: 100%;">
        <img class="tw-flex tw-justify-center" src="https://hoaquafuji.com/themes/hoaquafuji/assets/img/t2_img.png"
             alt="" style="width: 100%; height: 100%" >
      </div>  
    </div>
    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
      <div>
        <h1 id="one-element-mobile" class="tw-flex tw-justify-center tw-text-amber-600 ">FEATURES ABOUT FUJI</h1>
        <p class="" style="word-break: break-all;">With the motto "Bringing customers not only safe and
          high-quality fruit products, but also friendly convenient services. "Fuji Import and Export Joint Stock
          Company" - a unit specializing in importing high-class fruits from countries around the world is gradually
          developing and winning the trust of Vietnamese consumers. Currently, the company has a system of stores under
          the brand name Fuji Clean Fruits, which are widely distributed throughout the Northern provinces to serve the
          needs of all customers. With constant efforts over time, the Fuji Clean Fruit system is getting better every
          day in all aspects.</p>
      </div>
    </div>
     </div>
    </div>
     <Footer/>
  </Default>

</template>


