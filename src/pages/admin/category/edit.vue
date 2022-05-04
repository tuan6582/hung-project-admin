<script>
import API from "../../../ network";
import {database} from "../../../firebase/firebase";
import {ref, onValue, set} from 'firebase/database';
import * as slug from 'slug';
import store from "../../../store";

export default {
  name: 'EditCategory',
  beforeRouteEnter(to, from, next) {
    if (!store.state.isAuthAdmin) {
      next('/admin/login');
      return;
    }
    next();
  },
  data() {
    return {
      category: {
        name: ''
      }
    }
  },
  created() {
    const categoryRef = ref(database, `categories/${this.$route.params.id}`)
    onValue(categoryRef, snapshot => {
      this.category.name = snapshot.val().name;

    })
  },
  methods: {
    submit() {
      set(ref(database, `/categories/${this.$route.params.id}`), {
        name: this.category.name,
        slug: slug(this.category.name)
      })
      this.$toast.success("Cập nhật thành công");
      this.$router.push('/admin/categories')
    }
  }
}
</script>

<template>
  <div>
    <form @submit.prevent="submit">
      <div>
        <div>Tên category</div>
        <n-input v-model:value="category.name"/>
      </div>
      <div>
        <n-button type="primary" @click="submit">Sửa</n-button>
      </div>
    </form>
  </div>
</template>
