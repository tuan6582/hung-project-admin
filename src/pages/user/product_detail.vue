<script>
import Default from "../../layouts/default.vue";
import {ref, onValue, set, push, child, query, orderByChild, equalTo, remove} from 'firebase/database';
import {database} from "../../firebase/firebase";
import Footer from "../../components/Footer.vue";
export default {
  name: 'Product Detail',
  components: {
    Default, 
    Footer
  },
  data() {
    return {
      picked: null,
      number: 1,
      currentProduct: null,
      comment: '',
      comments: [],
      isLiked: false,
      likeId: null
    }
  },
  computed: {
    images() {
      return [
        'https://salt.tikicdn.com/cache/400x400/ts/product/98/4a/8d/760a27ffaee3e069fb80201376c307da.png.webp',
        'https://salt.tikicdn.com/cache/100x100/ts/product/a6/1d/90/ae0dbb4b9243526e0c26c48f728a9a24.jpg.webp',
        'https://salt.tikicdn.com/cache/100x100/ts/product/2b/b9/92/51b41c8aa8f310a7a227e010a02eec70.jpg.webp',
        // 'https://salt.tikicdn.com/cache/100x100/ts/product/9d/e9/dc/258b1c584f81e4b9c2617c0e6dc3e89e.jpg.webp',
        // 'https://salt.tikicdn.com/cache/100x100/ts/product/83/c0/2b/4402b1d03d61c69dc3f1d3958c53abd1.jpg.webp'
      ]
    },
    reverseComment() {
      return this.comments.reverse()
    },
    typeButtonLike() {
      return this.isLiked ? 'info' : 'default';
    }

  },
  created() {

    const productRef = ref(database, `/products/${this.$route.params.name}`)

    onValue(productRef, snapshot => {
      this.currentProduct = snapshot.val();
    })

    const commentRef = ref(database, '/comments');

    onValue(commentRef, snapshot => {
      const val = snapshot.val();


      this.comments = Object.keys(val).filter(item => val[item].product_id === this.$route.params.name).map(item => ({
        ...val[item],
        id: item
      }))

    })

    const searchRef = query(ref(database, 'likes'), orderByChild('product_id'), equalTo(this.$route.params.name.toString()));

    onValue(searchRef, snapshot => {
      const val = snapshot.val();

      Object.keys(val).forEach(key => {
        if (val[key].user_id === this.$store.state.user.uid) {
          this.isLiked = true;
          this.likeId = key;
          console.log(this.likeId);
        }
      })
    })

  },
  methods: {
    addToCart() {
      // this.$store.commit("addToCart", {
      //   name: this.$route.params.name,
      //   number: this.number
      // });


      this.$store.dispatch("addToCart", {
        id: this.$route.params.name,
        number: this.number,
        name: this.currentProduct.name,
        price: this.currentProduct.price
      })

      this.$toast.success("Thêm vào giỏ hàng thành công");
    },
    submit() {
      push(child(ref(database), 'comments'), {
        content: this.comment,
        product_id: this.$route.params.name,
        user_id: this.$store.state.user.uid,
        email: this.$store.state.user.email
      })
      this.comment = '';
    },
    like() {
      if (!this.isLiked) {
        push(child(ref(database), 'likes'), {
          product_id: this.$route.params.name,
          user_id: this.$store.state.user.uid
        })
      } else {
        this.isLiked = false;
        remove(ref(database, `likes/${this.likeId}`));
      }
    }
  }
}
</script>

<template>
  <default>
    <div>
      <div>
        <img class=" tw-h-80 tw-w-full img-mobile"
             src="http://shophoaqua.vn/public/media/file/files/slider/banner-bottom.png" alt="">
      </div>
      <h1 class="tw-flex tw-justify-center tw-text-orange-500 tw-mt-3" style="margin-bottom: 30px;">Product Details</h1>
      <div class="container">
        <div class="row">
          <div class="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
            <div>
              <img class="tw-h-72 tw-w-full"
                   :src="currentProduct.url"
                   alt="">
            </div>
            <div class="tw-grid tw-grid-cols-3 tw-gap-3 tw-mt-5">

            </div>
          </div>
          <div class="col-xl-8 col-lg-8 col-md-12 col-sm-12 col-12">


            <div>
              <h1 class="tw-text-lime-600">Product's name: {{ currentProduct.name }}</h1>
              <span class="tw-text-xl tw-text-yellow-600"> {{ currentProduct.price }} đ</span>
            </div>
            <div style=" font-size: 1.6rem; color: blue;">
              <span class="tw-text-2xl">Content:</span>
              <div>
                {{ currentProduct.description }}
              </div>
            </div>
            <div class="tw-col-span-8 tw-mt-5">
              <h2 style="font-size: 23px;">Add product to cart</h2>
              <div class="tw-flex tw-w-96 ">

                <n-input-number :min="Number(1)" v-model:value="number" style="margin: 0 12px 12px 0;" />
                <n-button @click="addToCart" type="primary">Add to cart</n-button>
              </div>
              <n-button @click="like" :type="typeButtonLike">
                <span v-if="isLiked">Dislike this product</span>
                <span v-else>Liked this product</span>
              </n-button>
            </div>
          </div>
        </div>
      </div>
      <div class="container">
       <div class="row">
       <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
       <div class="des-product">
        <h1 style="color: crimson;">Describe:</h1>
        <p>If you see a 3-wheeler pushing a pomelo cart passing by, the price on the car is 10 thousand/3 fruits, you buy to try, maybe you
         can't eat, or eat that you can criticize all day...</p>
        <p>At the same time with the same price, but the green grapefruit line with pink flesh will cost about 40,000 VND/kg in the garden, 1 fruit
          about 1kg – 2kg</p>
        <div class="tw-flex tw-justify-center tw-mt-5 tw-mb-5">
          <img
              :src="currentProduct.url"
              alt=""
              style="width: 100%;"
              >
        </div>
        <div>
          <p>Therefore, if you have never eaten green-skinned grapefruit, you should probably try it right away.</p>
          <p>I would like to add a few lines to introduce this grapefruit:</p>
          <p>I know a lot of people who are martial arts masters in the city, there's nothing I don't know but when I look at it
             When you see a grapefruit with green skin, it's like falling from the sky. First, they asked if the grapefruit was still green, how could it be eaten, then
             Why is the intestines pink, is it bitter when eaten, why is there no seed...</p>
          <div class="tw-flex tw-justify-center tw-mt-5 tw-mb-5">
            <img :src="currentProduct.url" alt=""
              style="width: 100%;"
            >
          </div>
        </div>

       </div>
       </div>
       </div>
      </div>
     <div class="container">
     <div class="row">
     <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
      <div class="tw-mx-20 product-detail">
        <div class="tw-flex">
          <n-input v-model:value="comment"/>
          <n-button @click="submit">Comment</n-button>
        </div>
        <div>
          <div v-for="item in reverseComment" class="tw-mt-3">
            <div class="tw-font-semibold">{{ item.email }}</div>
            <div>{{ item.content }}</div>
          </div>
        </div>
      </div>
     </div>
     </div>
     </div>

    </div>
     <Footer/>
  </default>
</template>
