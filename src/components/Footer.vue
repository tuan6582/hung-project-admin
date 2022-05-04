<script>
import Default from "../layouts/default.vue";
export default {
    name: "Footer",
    components: { Default }
}
</script>

<template>
<div>
      <div class="footer tw-h-auto">
            <div class="container">
                <div class="row" style="border-bottom: 1px solid #ccc; padding-bottom: 2rem;">
                    <div class="col-xl-3 col-lg-3 col-md-3 col-sm-3 col-12">
                        <div class="footer-left" style="height: 100%;">
                            <img class="w-100" src="https://www.hoaquasach.vn/wp-content/uploads/2017/03/logo.png" alt=""
                             height="100%"
                             style="object-fit: contain;"
                              >
                        </div>
                    </div>
                    <div class="col-xl-4 col-lg-4 col-md-4 col-sm-4 col-12">
                        <div class="footer-center">
                            <h5 style="font-size: 1.4rem; font-weight: 700;">HEADQUARTERS</h5>
                            <p>Address : Số 123 Đặng Tiến Đông, Đống Đa, Hà Nội</p>
                            <p>Phone : 0966868001 - 0466886633</p>
                            <p>Email: kd.shophoaqua@gmail.com</p>
                            <p>Website: shophoaqua.vn</p>
                        </div>
                    </div>
                    <div class="col-xl-5 col-lg-5 col-md-5 col-sm-5 col-12">
                        <div class="footer-right">
                            <h5 style="font-size: 1.4rem; font-weight: 700;">SIGN UP TO RECEIVE E-MAIL</h5>
                            <p style="font-style: italic;">Provide your email to receive promotional information of
                                 we</p>
                            <div class="footer-form">
                                <input type="text" placeholder="Email của bạn">
                                <button type="submit">SEND</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="row">
                    <div class="col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                        <div class="footer-bottom">
                            <a href="https://www.facebook.com/profile.php?id=100007826988486">
                                <i class="fa-brands fa-facebook-square"></i>
                                
                            </a>
                            <a href="https://www.instagram.com/t.x.h01/">
                                <i class="fa-brands fa-linkedin"></i>
                               
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=100007826988486">
                                <i class="fa-brands fa-skype"></i>
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=100007826988486">
                                <i class="fa-brands fa-youtube-square"></i>
                            </a>
                            <a href="https://www.facebook.com/profile.php?id=100007826988486">
                                <i class="fa-brands fa-twitter-square"></i>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="contact-icon">
            <a href="https://www.facebook.com/Shophoaquavn-1026579694050056/">
                <img style="width: 55px; height: 48px;" src="http://shophoaqua.vn/public/frontend/img/mess.png" alt="">
            </a>
            <a href="">
                <img style="width: 55px; height: 48px;" src="http://shophoaqua.vn/public/frontend/img/email.png" alt="">
            </a>
            <a href="https://zalo.me/0966868001">
                <img style="width: 55px; height: 48px;" src="http://shophoaqua.vn/public/frontend/img/zalo.png" alt="">
            </a>
            <a href="tel:0966868001">
                <img style="width: 55px; height: 48px;" src="http://shophoaqua.vn/public/frontend/img/viber.png" alt="">
            </a>
        </div>
</div>
    

</template>
<style lang="scss" scoped>
.footer {
        margin-top: 2rem;
        background-color: #058c52;
        padding: 2rem 0;
        
    }

    .footer-center {
        color: #fff;
        font-size: 1.3rem;
        margin-top: 2rem;
    }

    .footer-right {
        margin-top: 2rem;
        font-size: 1.3rem;
        color: #fff;
        position: relative;
    }

    .footer-form>input {
        width: 100%;
        border: 1px solid #e2e2e4;
        outline: none;
        color: #c2c2c2;
        height: 3.4rem;
        padding: 0 12px;
        font-size: 1.4rem;
    }

    .footer-form>button {
        position: absolute;
        right: 0;
        bottom: 0;
        height: 3.4rem;
        background-color: #34a864;
        color: #fff;
        font-size: 1.4rem;
        width: 15%;
        border: none;
        outline: none;
        cursor: pointer;
    }

    .footer-bottom {
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }

    .footer-bottom>a {
        color: #fff;
        margin-left: 0.6rem;
        margin-right: 0.6rem;
        margin-top: 20px;
        font-size: 3rem;
    }

    .contact-icon {
        position: fixed;
        display: grid;
        bottom: 25%;
        right: 0;
    }

    @media (max-width: 63.9375em) {
        .left-content {
            display: none;
        }

        .contact-icon>a {
            margin: 1rem 0;
        }
    }
</style>