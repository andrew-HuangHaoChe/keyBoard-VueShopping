<template>
    <div>
        <HomeNav></HomeNav>
        <div class="prowrapper">
            <div class="procontainer mt-3">
                <h1 class="h2 d-flex justify-content-center align-items-center text-secondary"><i class="fas fa-ticket-alt mr-3"></i>優惠活動</h1>
                <hr class="promoLine">
                <div class="d-flex justify-content-center w-100">
                <div class="promotionimg py-5">
                    <p class="d-flex justify-content-center h1 mt-4 text-info font-weight-bold protitle">金伯周年慶</p>
                    <p class="d-flex justify-content-center h4 text-white pt-2 font-weight-bold pb-5 subtitle">全館商品使用以下優惠碼通通7折!</p>
                    <div class="d-flex justify-content-center mt-5">
                        <div class="discode py-5">
                            <p class="distext mb-0 text-white font-weight-bold">001213</p>
                        </div>
                    </div>
                </div>
            </div>
            </div>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
    import HomeNav from './HomeNavbar';
    import Footer from './footer';
    export default {
        components:{
            HomeNav,
            Footer,
        }
    }
</script>