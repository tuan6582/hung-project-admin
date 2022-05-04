<script>
import API from "./ network";

import {getAuth, onAuthStateChanged} from "firebase/auth";

export default {
  created() {
    // API.get("/v1/me")
    //     .then(response => {
    //       const {user} = response.data.data;
    //       this.$store.commit("setMe", user);
    //
    //     })
    //     .catch(err => console.log(err))
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      // this.$store.commit("setMe", user);
      if (!!user) {
        this.$store.commit("setMe", user);
        this.$store.commit("getCart");
      }
    });

    if (localStorage.getItem('isAuthAdmin')) {
      this.$store.commit('setLoggedInAdmin');
    }


  }
}
</script>

<template>
  <n-notification-provider>
    <router-view></router-view>
  </n-notification-provider>

</template>
