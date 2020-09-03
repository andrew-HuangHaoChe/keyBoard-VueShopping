<template>
    <div>
        <div class="btn-group dropup cartIcon">
            <button type="button" class="btn btn-primary dropdown-toggle btn-style" data-toggle="dropdown" data-display="static" aria-haspopup="true" aria-expanded="false">
                <i class="fas fa-shopping-basket"></i>
                <div class="quantity"><span class="d-flex align-items-center qtext justify-content-center">{{ Cartnum }}</span></div>
            </button>
            <div class="dropdown-menu dropdown-menu-left dropdown-menu-lg-left" data-stopPropagation=”true”>
                <div class="table-responsive cartstyle p-2" v-if="cart.final_total!==0">
                    <table class="table table-sm">
                        <thead>
                            <th class="border-0">已選擇商品</th>
                            <th class="border-0"></th>
                            <th class="text-center border-0"></th>
                            <th class="text-center border-0"></th>
                        </thead>
                        <tbody>
                           <tr v-for="commodity in cart.carts" :key="commodity.id">
                                <td><button class="btn btn-outline-danger" @click="removeCartItem(commodity.id)"><i class="far fa-trash-alt"><i class="fas fa-spinner fa-spin" v-if="status.loadingItem === commodity.id"></i></i></button></td>
                                <td>
                                    {{ commodity.product.title }}
                                    <div class="text-success" v-if="commodity.coupon">
                                        已套用優惠券
                                    </div>
                                </td>
                                <td class="text-center">{{ commodity.qty }} {{commodity.product.unit}}</td>
                                <td class="text-right">{{ commodity.total | currency }}</td>
                            </tr>
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colspan="3" class="text-right">總計: </td>
                                <td class="text-right">{{cart.total}}</td>
                            </tr>
                             <tr v-if="cart.final_total !== cart.total">
                                <td colspan="3" class="text-right text-success">折扣價:</td>
                                <td class="text-right text-success">{{cart.final_total}}</td>
                             </tr>
                            
                        </tfoot>
                    </table>
                    <router-link :to="{ path: '/faOrder' }" class="btn btn-outline-primary w-100">結帳去</router-link>
                </div>
            </div>
          </div>
    </div>
</template>
<script>
    export default{
        data(){
            return{
                cart:[],
                Cartnum:'',
                status:{
                loadingItem:'',
                },
            };
        },
        methods:{
            getCart(){
                const vm = this;
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
                    vm.isLoading = true;
                    this.$http.get(api).then((response) => {
                    console.log(response);
                    vm.cart = response.data.data;
                    vm.isLoading = false;
                    vm.Cartnum = response.data.data.carts.length;
                });
            },
            removeCartItem(id){
                const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
                const vm = this;
                    vm.status.loadingItem = id;
                    this.$http.delete(api).then((response) => {
                    console.log(response.data);
                    vm.status.loadingItem = '';
                    vm.getCart();
                    vm.isLoading = false;
                });
            },
            addCouponcode(){
                const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/coupon`;
                const vm = this;
                const coupon = {
                    code: vm.coupon_code
                }
                    vm.isLoading = true;
                    this.$http.post(api ,{data: coupon}).then((response) => {
                    console.log(response);
                    vm.getCart();
                    vm.isLoading = false;
                });
            },
            getCartNum(cartNum,car){
                console.log(cartNum,car);
                this.Cartnum = cartNum;
                this.cart = car;
            },
           
        },
        created(){
            const vm = this;
            vm.$bus.$on("cartnum",(cartNum,car)=>{
                vm.getCartNum(cartNum,car);
            });
            vm.getCart();
        },
    }
</script>