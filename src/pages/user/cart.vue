<script>
import Default from "../../layouts/default.vue";
import {ref, onValue, set, push, child} from 'firebase/database';
import {database} from "../../firebase/firebase";

export default {
  name: 'Cart',
  components: {
    Default
  },
  data() {
    return {
      products: [],
      isOpenModal: false,
      order: {
        username: '',
        phone: '',
        address: ''
      }
    }
  },
  computed: {
    cart() {
      return this.$store.state.cart;
    },
    total() {
      return this.cart.filter(item => item.selected).reduce((total, item) => {
        return total + item.price * item.number
      }, 0)
    }
  },
  methods: {
    submit() {
      try {
        push(child(ref(database), 'orders'), {
          information: this.order,
          products: this.cart.filter(item => item.selected),
          status: 'PENDING'
        })
        this.$toast.success("Đặt hàng thành công");
        this.isOpenModal = false;
      } catch (e) {
        console.log(e);
        this.$toast.error("Đặt hàng thất bại")
      }
    }
  }
}
</script>


<template>
  <Default>
    <!-- <table class="tw-border-separate tw-border tw-border-slate-400 tw-flex tw-justify-center  ...">
     <thead>
       <div class="tw-border-solid tw-border-2 tw-border-indigo-600 tw-w-80 tw-bg-red-200 ...">
       <tr>
         <th class="tw-border tw-border-slate-300 tw-pr-4 ...">Tên sản phẩm</th>
         <th class="tw-border tw-border-slate-300 tw-pr-4 ...">Đơn giá</th>
         <th class="tw-border tw-border-slate-300  tw-pr-4 ...">Số lượng</th>
         <th class="tw-border tw-border-slate-300 tw-pr-4 ...">Thành tiền</th>
         <th class="tw-border tw-border-slate-300 tw-pr-4 ...">Tổng tiền {{total}}</th>
       </tr>
       </div>
     </thead>
     <tbody>
       <tr v-for="(item, index) in cart">
         <tr>

           <td>
             <n-checkbox v-model:checked="item.selected"/>
           </td>
            <td>{{ item.name }}</td>
           <td>{{ item.price }}</td>
           <td>
             <n-input-number v-model:value="item.number" :min="Number(1)"/>
           </td>
           <td>{{ item.number * item.price }}</td>
       </tr>
      </tr>
     </tbody>
   </table>  -->

    <n-modal v-model:show="isOpenModal">
      <n-card
          style="width: 600px"
          title="Thanh toán"
          :bordered="false"
          size="huge"
          role="dialog"
          aria-modal="true"
      >

        <div>
          <div>
            <label for="username">Full Name</label>
            <n-input v-model:value="order.username"/>
          </div>
          <div>
            <label for="phone">Phone</label>
            <n-input v-model:value="order.phone"/>
          </div>
          <div>
            <label for="address">Address</label>
            <n-input v-model:value="order.address"/>
          </div>
        </div>

        <template #footer>
          <div class="tw-flex tw-justify-end">
            <n-button @click="submit" type="primary">Confirm</n-button>
          </div>
        </template>
      </n-card>
    </n-modal>

    <div>
      <img class="tw-mt-4 tw-h-80 tw-w-full"
           src="http://shophoaqua.vn/public/media/file/files/slider/banner-bottom-2.png" alt="">
    </div>
    <h2 class="tw-text-red-400 tw-text-center ">Manage shopping cart</h2>
    <div class="tw-flex tw-justify-center">

      <table class=" tw-justify-center tw-mt-3 tw-mx-40 tw-h-80 tw-w-full tw-bg-slate-400">

        <thead>
        <tr class="tw-border-solid tw-border-2 tw-border-indigo-600  tw-bg-slate-200 tw-w-auto">


          <th>Product Name</th>
          <th>Price</th>
          <th>quantity</th>
          <th>Into money</th>
          <!-- <th >Tổng tiền </th> -->


        </tr>
        </thead>

        <tbody>
        <tr class="tw-text-center" style="height: 30px" v-for="item in cart">

          <td>
            <n-checkbox v-model:checked="item.selected"/>
          </td>

          <td>{{ item.name }}</td>
          <td>{{ item.price }}</td>
          <td>
            <n-input-number v-model:value="item.number" :min="Number(1)"/>
          </td>
          <td>{{ item.number * item.price }}</td>
          <!-- <td    >{{total}}</td> -->
          <td>

            <n-button @click="$store.commit('deleteCart',item.id)" class="tw-no-underline tw-ml-1 " type="error">Delete</n-button>
          </td>

        </tr>
        </tbody>
      </table>
    </div>
    <div class="tw-flex tw-justify-left tw-mt-10 tw-border-8 tw-border-indigo-600 tw-ml-40">
      <div class=" tw-border-4 tw-border-gray-600 ...">
        <span>Total:</span>
      </div>
      <div class="tw-px-10 tw-border-x-4 tw-border-indigo-500">
        <span>{{ total }}</span>
      </div>
    </div>
    <div class="tw-flex tw-justify-left tw-mt-3 tw-ml-40 tw-h-80">
      <n-button :disabled="cart.filter(item => item.selected).length === 0" @click="isOpenModal = true" type="primary">
       Payment
      </n-button>
    </div>
    <!-- <div>
       <n-table :bordered="false" :single-line="false">
        <thead>
          <tr>
            <th>Abandon</th>
            <th>Abormal</th>

          </tr>
        </thead>
        <tbody>
          <tr>
            <td>放弃</td>
            <td>反常的</td>
          </tr>

        </tbody>
      </n-table>
    </div> -->
  </Default>
</template>
