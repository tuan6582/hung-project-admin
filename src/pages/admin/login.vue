<script>
import HeaderLogin from "../../components/HeaderLogin.vue";
import API from "../../ network";
import {getAuth, signInWithEmailAndPassword} from "firebase/auth";

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
      if (this.formValue.email === 'admin@gmail.com' && this.formValue.password === 'admin123') {
        this.$store.commit("setLoggedInAdmin");
        this.$router.push('/admin');
        localStorage.setItem("isAuthAdmin", "true");
      }
    }
  }
}
</script>

<template>
  <div>
    <div class="form_wrapper">
      <div class=" tw-flex tw-justify-center tw-h-full ">

        <div class="tw-w-4/12 tw-h-full tw-flex tw-flex-col tw-justify-center">
          <n-form ref="formRef" :model="formValue" class=" tw-bg-white tw-rounded tw-p-10">
            <div class="tw-text-2xl">Login admin</div>
            <n-form-item path="email">
              <n-input v-model:value="formValue.email" placeholder="Input account"/>
            </n-form-item>
            <n-form-item path="password">
              <n-input type="password" v-model:value="formValue.password" placeholder="Input password"/>
            </n-form-item>

            <div class="tw-mt-5">
              <n-button @click="submit" class="tw-w-full" type="primary">Login</n-button>
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
