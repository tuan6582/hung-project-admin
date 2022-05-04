import {createStore} from "vuex";
// import { ref, onValue, set, update } from "firebase/database";
import {database} from "../firebase/firebase";
import {
    set,
    ref,
    push,
    child,
    query,
    orderByChild,
    equalTo,
    onValue,
    update,
} from "firebase/database";

const store = createStore({
    state() {
        return {
            isAuth: false,
            user: {},
            cart: [],
            isAuthAdmin: false,
            userAdmin: null
        };
    },
    mutations: {
        setLoggedIn(state, payload) {
            state.user = payload.user;
            state.isAuth = true;
            localStorage.setItem("shop_token", payload.access_token);
        },
        setMe(state, payload) {
            state.isAuth = true;
            state.user = payload;
        },
        setLogOut(state) {
            state.user = {};
            state.isAuth = false;
            localStorage.removeItem("shop_token");
        },
        addToCart(state, payload) {
            // const name = payload.name;
            // const number = payload.number;
            //
            // const product = state.cart.find((item) => item.name === name);
            //
            // if (!!product) {
            //   product.number += number;
            //   return;
            // }
            //
            // state.cart.push({
            //   name,
            //   number,
            //   price: 1000 + Math.floor(1000 * Math.random()),
            //   selected: false,
            // });
            state.cart.push(payload);
        },
        updateNumber(state, payload) {
            const {id, number} = payload;

            const product = state.cart.find((item) => item.id === id);

            product.number += number;
        },
        getCart(state) {
            const check = localStorage.getItem(`cart_${state.user.uid}`);
            console.log(check);

            if (!!check && JSON.parse(check)) {
                state.cart = JSON.parse(check);
            }
        },
        setLoggedInAdmin(state) {
            state.isAuthAdmin = true;
        },
        setLogoutAdmin(state) {
            state.isAuthAdmin = false;
        },
        deleteCart(state,id) {
            console.log(state);
            state.cart = state.cart.filter(item => item.id != id);
        }
    },
    actions: {
        async addToCart(context, payload) {
            const product = context.state.cart.find((item) => item.id === payload.id);

            if (!product) {
                context.commit("addToCart", payload);
            } else {
                context.commit("updateNumber", payload);
            }

            localStorage.setItem(
                `cart_${context.state.user.uid}`,
                JSON.stringify(context.state.cart)
            );
        },
    },
});

export default store;