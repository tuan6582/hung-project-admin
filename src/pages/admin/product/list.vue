<script>
import {ref, onValue, get, child, remove} from 'firebase/database';
import {database} from "../../../firebase/firebase";
import store from "../../../store";

export default {
  data() {
    return {
      products: []
    }
  },
  beforeRouteEnter(to, from, next) {
    if (!store.state.isAuthAdmin) {
      next('/admin/login');
      return;
    }
    next();
  },
  created() {
    const productRef = ref(database, '/products')

    onValue(productRef, snapshot => {
      const val = snapshot.val();

      this.products = Object.keys(val).map(key => {
        return {
          id: key,
          ...val[key]
        }
      })

    })
  },
  methods: {
    async deleteProduct(id) {
      const result = await this.$swal({
        icon: 'warning',
        title: 'Bạn có chắc muốn xóa sản phẩm này không',
        showCancelButton: true,
        reverseButtons: true
      });

      if (!result.isConfirmed) return;

      await remove(ref(database, `/products/${id}`));
      this.products = this.products.filter(item => item.id !== id);
      this.$toast.success("Xóa thành công");

    },
  }
}
</script>

<template>
  <div class="tw-container tw-px-20 tw-mt-10">
    <div class="tw-flex tw-justify-start ">
      <router-link class="tw-no-underline" to="/admin/products/create">
        <n-button type="primary">Add new products</n-button>
      </router-link>
    </div>
    <n-table class="tw-mt-5">
      <thead>
      <tr>
        <th>ID</th>
        <th>Name</th>
        <th>Action</th>
      </tr>
      </thead>

      <template v-if="products.length > 0">
        <tbody>
        <tr v-for="(item,index) in products" :key="item.id">
          <td>{{ index + 1 }}</td>
          <td>{{ item.name }}</td>

          <td>
            <router-link class="tw-no-underline" :to="`/admin/products/${item.id}/edit`">
              <n-button class="tw-no-underline" type="info">Edit</n-button>
            </router-link>
            <n-button @click="deleteProduct(item.id)" class="tw-no-underline tw-ml-5 " type="error">Delete</n-button>
          </td>
        </tr>
        </tbody>
      </template>
      <template v-else>
        <div class="tw-flex tw-w-full tw-justify-center">
          <n-empty description="Không có danh mục"/>
        </div>
      </template>

    </n-table>


  </div>
</template>

