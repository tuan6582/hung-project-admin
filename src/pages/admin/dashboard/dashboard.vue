<script>
import AuthAdminMixin from "../../../mixins/auth_admin";
import store from "../../../store";

export default {
  name: 'Dashboard',
  beforeRouteEnter(to, from, next) {
    if (!store.state.isAuthAdmin) {
      next('/admin/login');
      return;
    }
    next();
  },
  methods: {
    logout(){
      this.$store.commit("setLogoutAdmin");
      this.$router.push('/admin/login');
    }
  }
}

</script>

<template>
  <div class="admin">
    <ul>
      <li>
        <router-link to="/admin/categories">Quản lý danh mục</router-link>
      </li>
      <li>
        <router-link to="/admin/account/manage">Quản lý tài khoản</router-link>
      </li>
      <li>
        <router-link to="/admin/orders">Quản lý đơn hàng</router-link>
      </li>
      <li>
        <router-link to="/admin/products">Quản lý sản phẩm</router-link>
      </li>
      <li>
        <n-button @click="logout">Đăng xuất</n-button>
      </li>
    </ul>
    <!-- <ul>
        <li>
        <router-link to="/admin/account">Quản lý người dùng</router-link>
      </li>
    </ul> -->
    <div class="logo-admin">
      <img src="../../../assets/logo-admin.png" alt="" />
    </div>
  </div>
  
</template>
