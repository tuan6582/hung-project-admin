<script>
import API from "../../../ network";
import {database} from "../../../firebase/firebase";
import {set, ref, push, child} from 'firebase/database';
import * as slug from 'slug';
import store from "../../../store";

export default {
  name: 'CreateCategory',
  beforeRouteEnter(to, from, next) {
    if (!store.state.isAuthAdmin) {
      next('/admin/login');
      return;
    }
    next();
  },
  data() {
    return {
      name: null
    }
  },
  methods: {
    submit() {
      try {
        push(child(ref(database), 'categories'), {
          name: this.name,
          slug: slug(this.name)
        });
        this.$toast.success('Thêm mới danh mục thành công');
        this.$router.push('/admin/categories');
      } catch (e) {
        this.$toast.error("Thêm mới danh mục thất bại")
      }
    }


  }
}
</script>

<template>
  <div>
    <form @submit.prevent="submit">
      <div>
        <div>Tên category</div>
        <n-input v-model:value="name"/>
      </div>
      <div>
        <n-button type="primary" attr-type="submit">Thêm mới</n-button>
      </div>
    </form>
  </div>
</template>
