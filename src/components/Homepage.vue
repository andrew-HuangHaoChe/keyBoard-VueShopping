<template>
    <div>
        <HomeNav></HomeNav>
        <div class="hpHeader pt-5 pb-3">
            <div class="title-block text-white mx-5" v-scrollanimation>
                <span>極致的</span>
                <h1>機械式鍵盤</h1>
                <p>豐富的回彈手感帶給你完美的使用體驗</p>
            </div>
            <i class="fas fa-chevron-down text-white d-flex justify-content-center align-items-end"></i>
        </div>
        <div class="parallax"></div>
        <div class="hpMaincontent bg-secondary">
        <section class="hpcontent container bg-secondary">
            <div class="hpcontitleBox text-white" v-scrollanimation>
                <h2 class="h5">精緻做工</h2>
                <h3 class="h1">絕不放過每一個細節</h3>
                <p>成立於2020年</p>
            </div>
            <homepageImg></homepageImg>
        </section>
    </div>
    <section class="py-5 bg-white" style="margin-top: -100px; margin-bottom:-50px;">
        <div class="container pt-5">
            <div class="row d-flex justify-content-between" style="margin-top:100px;">
                
                    <div class="col-md-3 brand p-3 px-3 mx-2 bg-white ducky-block" v-scrollanimation>
                        <router-link to="/shopping">
                            <div class="d-flex justify-content-center hoverImg">
                                <img src="https://github.com/andrew-HuangHaoChe/image/blob/master/ducky.jpg?raw=true" class="img-1">
                            </div>
                        </router-link>
                        <p class="h4 text-center my-3">創傑</p>
                        <p>屬於台灣的製造商，並於2008年創立，</p>
                        <p>產品定位相當清晰明確，致力於開發高規格的機械式鍵盤</p>
                        <p>品質在業內擁有相當高的口碑</p>
                        <p>並且與全世界多達30個國家都有合作夥伴</p>
                    </div>
                <div class="col-md-3 brand p-3 px-3 mx-2 bg-white" v-scrollanimation>
                    <router-link to="/shopping">
                        <div class="d-flex justify-content-center hoverImg">
                            <img src="https://github.com/andrew-HuangHaoChe/image/blob/master/irock.jpg?raw=true">
                        </div>
                    </router-link>
                    <p class="h4 text-center my-3">艾芮克</p>
                    <p>艾芮克是台灣自有品牌，行銷全球的電腦周邊廠商</p>
                    <p>成立以來產品不斷推陳出新</p>
                    <p>資方亦不斷投注創新研發</p>
                    <p>完善產品的附加價值，滿足使用者需求</p>
                </div>
                <div class="col-md-3 brand p-3 px-3 mx-2 bg-white" v-scrollanimation>
                    <router-link to="/shopping">
                        <div class="d-flex justify-content-center hoverImg">
                            <img src="https://github.com/andrew-HuangHaoChe/image/blob/master/filco.png?raw=true">
                        </div>
                    </router-link>
                <p class="h4 text-center my-3">菲爾特</p>
                <p>創立於1982年</p>
                <p>近30年都專注於通信設備及計算機周邊設備研發和生產</p>
                <p>提供專業工坊</p>
                <p>讓許多使用者可以高度客製化自身鍵盤的外觀</p>
                <p>打造出心目中獨一無二的鍵盤</p>
                </div>
            </div>
        </div>
    </section>
    <Footer class="mt-0"></Footer>
    </div>
</template>
<script>
    import HomeNav from './HomeNavbar';
    import homepageImg from './homepageImg';
    import Footer from './footer';
    export default {
        components:{
            HomeNav,
            homepageImg,
            Footer,
        },
    }
</script>