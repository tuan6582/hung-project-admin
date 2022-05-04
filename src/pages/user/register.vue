<script>
import HeaderLogin from "../../components/HeaderLogin.vue";
import API from "../../ network";
import {getAuth, createUserWithEmailAndPassword} from "firebase/auth";
import {ref, onValue, set} from 'firebase/database';
import {database} from "../../firebase/firebase";
import * as slug from "slug";


const validateEmail = (email) => {
  return String(email)
      .toLowerCase()
      .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
};

export default {
  name: 'Register',
  components: {
    HeaderLogin
  },
  data() {
    return {
      formValue: {
        username: null,
        email: null,
        password: null,
        confirmPassword: null
      }
    }
  },
  methods: {
    submit(event) {

      this.$refs.formRef.validate(errors => {
        if (!!errors) return;

        const auth = getAuth();

        createUserWithEmailAndPassword(auth, this.formValue.email, this.formValue.password)
            .then((user) => {
              this.$toast.success("Đăng ký thành công");

              set(ref(database, `/users/${user.user.uid}`), {
                email: this.formValue.email,
                username: this.formValue.username
              });

              this.$router.push('/login');

            })
            .catch(err => {
              this.$toast.error(err.message)
            })

        // API.post('/v1/register', {
        //   email: this.formValue.email,
        //   username: this.formValue.username,
        //   password: this.formValue.password
        // })
        //     .then(response => {
        //       this.$router.push('/login');
        //       this.$toast.success(response.data.message)
        //     })
        //     .catch(err => {
        //       this.$toast.error(err?.response?.data?.message)
        //     })

      });

    }
  },
  computed: {
    rules() {
      return {
        username: {
          required: true,
          message: 'Username cannot be blank',
          trigger: 'blur'
        },
        email: [
          {
            // required: true,
            message: 'Email invalidate',
            validator(rule, value) {
              if (!validateEmail(value)) return new Error("Email không đúng định dạng");
              return true;
            },
            trigger: ['input', 'blur']
          },
        ],
        password: {
          required: true,
          message: 'Mật khẩu không được để trống',
          trigger: ['input', 'blur']
        },
        confirmPassword: {
          validator: (rule, value) => {
            if (value !== this.formValue.password) return new Error("Mật khẩu không trùng khớp")
          },
          trigger: ['input', 'blur']
        }
      }
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
          <n-form
              :rules="rules"
              ref="formRef"
              :model="formValue"
              class=" tw-bg-white tw-rounded tw-p-10">
            <div class="tw-text-2xl">Register</div>
            <n-form-item label="User name" path="username">
              <n-input v-model:value="formValue.username" placeholder="Input username"/>
            </n-form-item>
            <n-form-item path="email">
              <n-input v-model:value="formValue.email" placeholder="Input email"/>
            </n-form-item>
            <n-form-item path="password">
              <n-input type="password" v-model:value="formValue.password" placeholder="Input Password"/>
            </n-form-item>
            <n-form-item path="confirmPassword">
              <n-input type="password" v-model:value="formValue.confirmPassword" placeholder="Confirm Password"/>
            </n-form-item>

            <div class="tw-mt-5">
              <n-button @click="submit" class="tw-w-full " type="primary">Submit</n-button>
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