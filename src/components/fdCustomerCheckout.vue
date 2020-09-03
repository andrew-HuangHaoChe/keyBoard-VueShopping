<template>
    <div>
        <HomeNav></HomeNav>
        <progressbar :status="status"></progressbar>
        <div class="container">
            <section>
                <div class="row mt-3">
                    <div class="col-md-8 pl-4">
                        <h1 class="text-primary h3 mb-3">訂單資訊</h1>
                        <ValidationObserver ref="observer" v-slot="{ invalid }" tag="form">
                            <div class="my-2 row justify-content-start">
                                <form class="col-md-10" @submit.prevent="newOrder">
                                  <div class="form-group">
                                    <label for="useremail">Email</label>
                                    <ValidationProvider name="郵件" rules="required|email" v-slot="{ errors }">
                                        <input type="email" class="form-control" name="email" id="useremail"
                                        v-model="form.user.email" placeholder="請輸入 Email" required>
                                        <span class="text-danger">{{ errors[0] }}</span>
                                    </ValidationProvider>
                                  </div>
                                  <div class="form-group">
                                    <label for="username">收件人姓名</label>
                                    <ValidationProvider name="姓名" rules="required" v-slot="{ errors }">
                                        <input type="text" class="form-control" name="姓名" id="username"
                                        v-model="form.user.name" placeholder="輸入姓名">
                                        <span class="text-danger">{{ errors[0] }}</span>
                                    </ValidationProvider>
                                  </div>
                                
                                  <div class="form-group">
                                    <label for="usertel">收件人電話</label>
                                    <ValidationProvider name="電話" rules="required" v-slot="{ errors }">
                                        <input type="tel" class="form-control" id="usertel" v-model="form.user.tel" placeholder="請輸入電話">
                                        <span class="text-danger">{{ errors[0] }}</span>
                                    </ValidationProvider>
                                  </div>
                                
                                  <div class="form-group">
                                    <label for="useraddress">收件人地址</label>
                                    <ValidationProvider name="地址" rules="required" v-slot="{ errors }">
                                        <input type="text" class="form-control" name="address" id="useraddress" v-model="form.user.address"
                                        placeholder="請輸入地址">
                                        <span class="text-danger">{{ errors[0] }}</span>
                                    </ValidationProvider>
                                  </div>
                                  <div class="form-group">
                                    <label for="comment">留言</label>
                                    <textarea name="" id="comment" class="form-control" cols="30" rows="10" v-model="form.message"></textarea>
                                  </div>
                                  <div class="text-right">
                                    <button class="btn btn-danger" :disabled="invalid">送出訂單</button>
                                  </div>
                                </form>
                              </div>
                        </ValidationObserver>
                    </div>
                    <div class="col-md-4 shopList">
                        <p class="h3 text-primary d-block w-100">購物清單</p>
                        <div class="table-responsive orderCart py-2" v-if="cart.final_total!==0">
                            <table class="table table-lg">
                                <thead>
                                    <th class="border-0">已選擇商品</th>
                                    <th class="border-0"></th>
                                    <th class="text-center border-0"></th>
                                    <th class="text-center border-0"></th>
                                </thead>
                                <tbody>
                                   <tr v-for="commodity in cart.carts" :key="commodity.id">
                                        <td><button class="btn btn-outline-danger" @click="removeCartItem(commodity.id)"><i class="far fa-trash-alt"></i></button></td>
                                        <td class="align-middle">
                                            {{ commodity.product.title }}
                                            <div class="text-success" v-if="commodity.coupon">
                                                已套用優惠券
                                            </div>
                                        </td>
                                        <td class="text-center align-middle">{{ commodity.qty }} {{commodity.product.unit}}</td>
                                        <td class="text-right align-middle">{{ commodity.final_total | currency }}</td>
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
                        </div>
                        <div class="input-group mb-3 input-group-sm orderCoupon">
                            <input type="text" class="form-control incoupon" v-model="coupon_code" placeholder="請輸入優惠碼">
                            <div class="input-group-append">
                                <button class="btn btn-outline-secondary" type="button" @click="addCouponcode">
                                    套用優惠碼
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
        <Footer></Footer>
    </div>
</template>
<script>
    import HomeNav from './HomeNavbar';
    import Footer from './footer';
    import progressbar from './progressbar';
    export default {
        components:{
            HomeNav,
            Footer,
            progressbar,
        },
        data(){
            return{
                cart:[],
                shopcart:[],
                coupon_code:'',
                form: {
                    user: {
                        name:'',
                        email:'',
                        tel:'',
                        address:'',
                    },
                    message:'',
                },
                orderId:'',
                order:{
                    user:{},
                },
                status:1,
            };
        },
        methods: {
            newOrder(){
                const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order`;
                const vm = this;
                const order = vm.form;
                vm.isLoading = true;
                this.$http.post(api,{data: order}).then((response) => {
                console.log('訂單已建立',response);
                if(response.data.success){
                    vm.$router.push(`/checkout2/${response.data.orderId}`);
                }
                vm.isLoading = false;
                });
            },
            removeCartItem(id){
                const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart/${id}`;
                const vm = this;
                    vm.isLoading = true;
                    this.$http.delete(api).then((response) => {
                    console.log(response.data);
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
            getCart(){
                const vm = this;
                const api = `${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/cart`;
                    vm.isLoading = true;
                    this.$http.get(api).then((response) => {
                    console.log(response);
                    vm.cart = response.data.data;
                    vm.isLoading = false;
                    vm.shopcart.push(response.data.data.carts);
                });
            },
        },
        created(){
            const vm = this;
            vm.getCart();
        }
    }
</script>