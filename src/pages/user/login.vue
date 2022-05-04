<script>
import HeaderLogin from "../../components/HeaderLogin.vue";
import API from "../../ network";
import {getAuth, signInWithEmailAndPassword,signOut} from "firebase/auth";
import {ref, onValue, set} from 'firebase/database';
import {database} from "../../firebase/firebase";

export default {
  components: {
    HeaderLogin,
  },
  data() {
    return {
      formValue: {
        email: null,
        password: null
      }
    }
  },
  methods: {
    submit() {
      // API.post('/v1/login', {
      //   email: this.formValue.email,
      //   password: this.formValue.password
      // })
      //     .then(response => {
      //       const {access_token, user} = response.data.data;
      //
      //       this.$store.commit("setLoggedIn", {
      //         access_token,
      //         user
      //       });
      //
      //       this.$router.push('/');
      //       this.$toast.success("Đăng nhập thành công")
      //     })
      //     .catch(err => {
      //       this.$toast.error("Đăng nhập thất bại")
      //     });

      const auth = getAuth();

      signInWithEmailAndPassword(auth, this.formValue.email, this.formValue.password)
          .then(user => {
            const userRef = ref(database, `users/${user.user.uid}`);
            onValue(userRef, snapshot => {
              const val = snapshot.val();
              if (!val) {
                return signOut(auth)
              }
              this.$store.commit("setLoggedIn", {
                access_token: null,
                user: user.user
              });
              this.$router.push('/');
              this.$toast.success("Successfully Login")
            })
          })
          .catch(err => {
            this.$toast.error(err.message)
          })
    }
  }
}
</script>

<template>
  <div>
    <div>
      <HeaderLogin/>
    </div>
    <div class="form_wrapper">
      <div class=" tw-flex tw-justify-center tw-h-full ">

        <div class="tw-w-4/12 tw-h-full tw-flex tw-flex-col tw-justify-center">
          <n-form ref="formRef" :model="formValue" class=" tw-bg-white tw-rounded tw-p-10">
            <div class="tw-text-2xl">Login</div>
            <n-form-item path="email">
              <n-input v-model:value="formValue.email" placeholder="Input Email"/>
            </n-form-item>
            <n-form-item path="password">
              <n-input type="password" v-model:value="formValue.password" placeholder="Input Password"/>
            </n-form-item>

            <div class="tw-mt-5">
              <n-button @click="submit" class="tw-w-full" type="primary">Login</n-button>
            </div>

            <div>
              Ìf you do not have account, so can click here ?
              <router-link to="/register">Register Now</router-link>
            </div>

          </n-form>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.form_wrapper {
  background-image: url("https://i.stack.imgur.com/9WYxT.png");
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 600px;
}
</style>