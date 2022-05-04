<script>
import {getAuth, signOut} from "firebase/auth";
import '../responsive.css'

export default {
  name: 'Header',
  data() {
    return {
      nav: [
        {
          name: 'Home',
          href: '/'
        },
        {
          name: 'About',
          href: '#'
        },
        {
          name: 'Products',
          href: '/products'
        },
       
        {
          name: 'Contact Us',
          href: '/contact'
        }
      ],
      isLoggedIn: false,
      dropdownForUser: [
        // {
        //   label: 'Thông tin cá nhân',
        //   key: 'profile'
        // },
        // {
        //   label: 'Đổi mật khẩu',
        //   key: 'change-password'
        // },
        {
          key: 'logout',
          label: 'Logout'
        }
      ]
    }
  },
  computed: {
    isLoggedIn() {
      return this.$store.state.isAuth;
    },
    user() {
      return this.$store.state.user
    },
    cartLength() {
      return this.$store.state.cart.length;
    }
  },
  methods: {
    clickOption(key) {
      if (key === 'logout') {
        const auth = getAuth();
        signOut(auth).then(() => {
          this.$store.commit("setLogOut");
          this.$toast.success("Đăng xuất thành công");
        }).catch((error) => {
          console.log(error);
        });

      }
    }
  }
}
</script>


<template>
   <div class="header tw-shadow ">
    <div class="container">
    <div class="row">
      <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
  <div id="header-mobile" class=" tw-flex tw-justify-between tw-px-10 tw-py-2 tw-h-96;" >
       <div>
      <img src="http://www.hoaquasach.vn/wp-content/uploads/2017/03/logo_top2-1.png" alt="">
    </div>
    <div class="tw-flex tw-flex-col tw-justify-center">
      <div>
        <ul class="tw-flex tw-list-none " >
          <li class="" 
              v-for="(item,index) in nav"
              :key="index"
              style="margin: 0 12px;"
              >
            <router-link
                class=" tw-no-underline tw-text-black tw-text-lg tw-font-semibold hover:tw-text-green-500 tw-cursor-pointer tw-transition tw-duration-600"
                :to="item.href">{{ item.name }}
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <div class="tw-flex tw-flex-col tw-justify-center">
      <n-button v-if="!isLoggedIn" type="primary">
        <router-link class="tw-text-white tw-no-underline " to="'/login">
          Đăng nhập
        </router-link>
      </n-button>

      <div class="tw-flex" v-else>
        <div class=" use-mobile">
          <div>Your Carts has {{ cartLength }} Products</div>
          <button disabled="disabled">
          <router-link to="/cart">Click to view cart</router-link>
          </button>
        </div>
        <n-dropdown @select="clickOption" :options="dropdownForUser">
          <n-avatar
              size="small"
              :src="user.avatar"
          />
        </n-dropdown>
      </div>
    </div>
      </div>
    </div>
   </div>
  </div>
   </div>
</template>

<style lang="scss" scoped>
.header {
   background-image: url("https://www.zembula.com/wp-content/uploads/2019/10/header-background-01.png")
  // @apply tw-bg-white tw-shadow tw-h-20 tw-flex tw-justify-between tw-px-20 tw-py-2;
 

}
</style>