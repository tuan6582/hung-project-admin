const AuthAdminMixin = {
    beforeRouteEnter(to,from,next) {
        // this.$router.push('/admin/login')
       console.log(to,from,next)
        console.log('hihi');
    }
}


export default AuthAdminMixin;
