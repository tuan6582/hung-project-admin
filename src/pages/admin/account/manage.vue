<script>
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import app, {database} from "../../../firebase/firebase";
import {onValue, ref, push, child, remove} from "firebase/database";
import store from "../../../store";

export default {
  name: "ManageAccount",
  beforeRouteEnter(to, from, next) {
    if (!store.state.isAuthAdmin) {
      next('/admin/login');
      return;
    }
    next();
  },
  data() {
    return {
      users: [],


    };
  },
  created() {
    const nameRef = ref(database, '/users');

    onValue(nameRef, snapshot => {

      const val = snapshot.val();

      if (!val) return;

      this.users = Object.keys(val).map(item => ({

        ...val[item],

        id: item

      }));

    })

  },
  methods: {
    async deleteUser(id) {
      const result = await this.$swal({
        icon: 'warning',
        title: 'Bạn có chắc muốn xóa người dùng này không',
        showCancelButton: true,
        reverseButtons: true
      });

      if (!result.isConfirmed) return;
      await remove(ref(database, `users/${id}`))
      this.users = this.users.filter(item => item.id !== id);
      this.$toast.success("Xóa thành công");
    }
  },
};
</script>

<template>
  <div>
    <div class="tw-mt-5">
      <div class="tw-flex tw-justify-center">
        <div class="tw-border-8 tw-border-indigo-600 tw-soild tw-bg-amber-200">
          <h2>User Account Management</h2>
        </div>
      </div>
      <n-table class="tw-mt-5">
        <thead>
        <tr>
          <th>ID</th>
          <th>User name</th>
          <th>Action</th>
        </tr>
        </thead>

        <template v-if="users.length > 0">
          <tbody v-for="(item, index) in users" :key="item.id">
          <tr>
            <td>{{ index + 1 }}</td>
            <td>{{ item.email }}</td>
            <!-- <td>{{ item.username }}</td> -->
            <td>
              <router-link to="#" class="tw-no-underline">
                <n-button @click="deleteUser(item.id)" class="tw-no-underline" type="info">Delete</n-button>
              </router-link>

            </td>
          </tr>
          </tbody>
        </template>
        <template v-else>
          <div class="tw-flex tw-w-full tw-justify-center">
            <n-empty description="Not have"/>
          </div>
        </template>
      </n-table>
    </div>
  </div>
</template>
