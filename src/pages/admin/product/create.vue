<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {getStorage, ref, uploadBytes, getDownloadURL} from 'firebase/storage';
import app, {database} from "../../../firebase/firebase";
import {onValue, ref as refDatabase, push, child} from "firebase/database";
import store from "../../../store";


export default {
  name: 'CreateProduct',
  beforeRouteEnter(to, from, next) {
    if (!store.state.isAuthAdmin) {
      next('/admin/login');
      return;
    }
    next();
  },
  data() {
    return {
      formValue: {
        name: '',
        price: '',
        description: '',
        url: 'http://www.hoaquasach.vn/wp-content/uploads/2017/03/buoi_4.jpg',
        category_id: null
      },
      editor: ClassicEditor,
      editorData: '<p>Content of the editor.</p>',
      editorConfig: {
        // The configuration of the editor.
      },
      categories: [],
    }
  },
  created() {
    const categoriesRef = refDatabase(database, '/categories');
    onValue(categoriesRef, snapshot => {

      const val = snapshot.val();

      if (!val) return;

      this.categories = Object.keys(val).map(item => ({
        ...val[item],
        value: item,
        label: val[item].name
      }));

      console.log(this.categories);

    })
  },
  methods: {
    async uploadFile(data) {
      const file = data.file.file;
      const storageRef = ref(getStorage(app), Date.now().toString() + '-' + file.name);

      await uploadBytes(storageRef, file);

      const url = await getDownloadURL(storageRef);

      this.formValue.url = url;

    },
    submit() {
      push(child(refDatabase(database), 'products'), this.formValue);
      this.$toast.success("Thêm mới sản phẩm thành công");
      this.$router.push('/admin/products')
    }
  }
}
</script>

<template>
  <div>
    <div>
      <n-form
          ref="formRef"
          :model="formValue"
      >
        <n-form-item label="Tên sản phẩm" path="name">
          <n-input v-model:value="formValue.name" placeholder="Input Name"/>
        </n-form-item>
        <n-form-item label="Giá sản phẩm" path="price">
          <n-input-number v-model:value="formValue.price"/>
        </n-form-item>
        <n-form-item label="Mô tả" path="description">
          <n-input v-model:value="formValue.description"/>
        </n-form-item>
        <n-form-item label="Danh mục" path="category_id">
          <n-select
              v-model:value="formValue.category_id"
              :options="categories"
          />
        </n-form-item>
        <!-- <div>
          <ckeditor :editor="editor" v-model="formValue.description" :config="editorConfig"/>
        </div> -->
        <div class="tw-flex">
          <div>
            <img :src="formValue.url" alt="" class="tw-w-60 tw-h-60 tw-object-cover">
          </div>
          <div>
            <n-upload :show-file-list="false" @change="uploadFile">
              <n-button>Upload ảnh</n-button>
            </n-upload>
          </div>
        </div>

        <div>
          <n-button @click="submit">Tạo mới</n-button>
        </div>
      </n-form>
    </div>
  </div>
</template>
