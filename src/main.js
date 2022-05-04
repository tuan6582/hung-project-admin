import {createApp} from "vue";
import App from "./App.vue";
import naive from "naive-ui";
import "./style.scss";
import "vfonts/Lato.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "@fortawesome/fontawesome-free/css/all.css";

// Monospace Font
import "vfonts/FiraCode.css";
import Home from "./pages/user/home.vue";
import Contact from "./pages/user/contact.vue";
import * as VueRouter from "vue-router";
import Login from "./pages/user/login.vue";
import VueStarRating from "vue-star-rating";
import store from "./store";
import VueToast from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import ProductDetail from "./pages/user/product_detail.vue";
import Cart from "./pages/user/cart.vue";
import Products from "./pages/user/products.vue";
import CreateCategory from "./pages/admin/category/create.vue";
import ListCategory from "./pages/admin/category/list.vue";
import EditCategory from "./pages/admin/category/edit.vue";
import VueSweetalert2 from "vue-sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import Dashboard from "./pages/admin/dashboard/dashboard.vue";
import Register from "./pages/user/register.vue";
import CreateProduct from "./pages/admin/product/create.vue";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ManageAccount from "./pages/admin/account/manage.vue";
import ProductsList from "./pages/admin/product/list.vue";
import ProductEdit from "./pages/admin/product/edit.vue";
import OrderList from './pages/admin/order/index.vue'
import LoginAdmin from './pages/admin/login.vue'

const routes = [
    {path: "/", component: Home},
    {path: "/login", component: Login},
    {path: "/product/:name", component: ProductDetail},
    {path: "/cart", component: Cart},
    {path: "/contact", component: Contact},
    {path: "/products", component: Products},
    {path: "/admin/categories/create", component: CreateCategory},
    {path: "/admin/categories", component: ListCategory},
    {path: "/admin/categories/:id/edit", component: EditCategory},
    {
        path: "/admin", component: Dashboard
    },
    {path: "/register", component: Register},
    {path: "/admin/products/create", component: CreateProduct},
    {path: "/admin/account/manage", component: ManageAccount},
    {path: "/admin/products", component: ProductsList},
    {path: "/admin/products/:id/edit", component: ProductEdit},
    {path: '/admin/orders', component: OrderList},
    {path: '/admin/login', component: LoginAdmin}
];
    
const router = VueRouter.createRouter({
    history: VueRouter.createWebHistory(),
    routes,

});

const app = createApp(App);
app.component("star-rating", VueStarRating);
app.use(naive);
app.use(VueToast, {
    position: "top",
    duration: 3000,
});
app.use(VueSweetalert2);
app.use(router);
app.use(store);
app.use(CKEditor);
app.mount("#app");

export default app;
