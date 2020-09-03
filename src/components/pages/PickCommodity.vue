<template>
    <div>
        <loading :active.sync="isLoading"></loading>
        <SuccessMessage></SuccessMessage>
        <HomeNav></HomeNav>
        <router-view></router-view>
        <div class="container-fluid mt-3">
            <div class="row mt-3">
                <div class="col-md-4">
                    <div class="card border-0" v-for="(item,key) in product" :key="item.id">
                        <div class="card-body">
                            <h4 class="card-title d-inline">{{ item.title }} 
                                <span class="text-secondary h5">( {{ item.category }} )</span>
                            </h4>
                            <p class="card-text">
                                <ul class="w-100 p-0 mb-0 mt-3 d-flex justify-content-between">
                                    <li class="d-inline h5 text-secondary d-flex align-items-center mb-0 priceLine">{{ item.origin_price |currency}}</li>
                                    <li class="d-inline h3 text-primary mb-0">網路價 NT{{ item.price |currency}}</li>
                                </ul>
                            </p>
                            <select name="" class="custom-select from-control mt-3 w-100" v-model="item.num">
                                <option :value="num" v-for="num in 10" :key="num" selected>
                                    選購{{num}} {{ item.unit }}
                                </option>
                            </select>
                          </div>
                          <div class="card-footer d-flex justify-content-between bg-white">
                            <div class="text-muted text-nowrap mr-3 d-inline">
                                小計<strong>{{ item.num * item.price }}</strong>元
                            </div>
                            <button class="btn btn-primary d-inline" @click="addtoCart(item.id, item.num)">
                                <i class="fas fa-spinner fa-spin" v-if="status.loadingItem === item.id"></i>
                                加入購物車
                            </button>
                          </div>
                    </div>
                </div>
                <div class="col-md-8" v-for="(item,key) in product" :key="item.id">
                        <div class="container px-3 imageBox">
                            <div class="pdwrapper">
                                <img class="img-fluid img-box" :src="item.imageUrl" alt="">
                            </div>
                        </div>
                </div>
            </div>
            <shopcart></shopcart>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
    import HomeNav from '../HomeNavbar';
    import shopcart from '../shopCart';
    import Footer from '../footer';
    import SuccessMessage from '../SuccessMessage';
export default{
    components:{
        HomeNav,
        shopcart,
        Footer,
        SuccessMessage,
    },
    data(){
        return{
            cart:[],
            product:[],
            isLoading:false,
            status:{
                    loadingItem:'',
                },
            coupon_code:'',
        }
    },
    methods:{
        getProduct(){
            const vm = this;
            const id = vm.$route.params.id;
            console.log(id);
            vm.isLoading = true;
            const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/product/${id}`;
            this.$http.get(api).then((response) => {
            response.data.product.num = 1;
            console.log(response.data);
            vm.isLoading = false;
            vm.product.push(response.data.product);
            });
        },
        addtoCart(id, qty = 1){
            const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            const vm = this;
            vm.status.loadingItem = id;
            const cart = {
                product_id: id,
                qty, 
            }
            this.$http.post(api, {data: cart}).then((response) => {
                console.log(response);
                vm.status.loadingItem = '';
                if(response.data.success){
                    vm.getCart();
                    vm.$bus.$emit("successMessage", response.data.message, 'success');
                }
            });
        },
        total(){
                const vm = this;
                let arr = 0;
                for(let item in cart){
                    if(typeof vm.cart[item] ==='final_total'){
                        arr += vm.cart[item];
                    }  
                }
            },
        getCart(){
            const vm = this;
            const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
            vm.isLoading = true;
            this.$http.get(api).then((response) => {
            console.log(response);
            vm.cart = response.data.data;
            vm.isLoading = false;
            vm.$bus.$emit("cartnum",response.data.data.carts.length,response.data.data);
            });
        },
    },
    
    created() {
        this.getProduct();
    },
    beforeMount() {
        this.getCart();
    },
}
</script>