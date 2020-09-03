<template>
    <div>
        <HomeNav/>
        <progressbar :status="status"></progressbar>
          <div class="my-5 row justify-content-center">
            <form class="col-md-4" @submit.prevent="payOrder">
              <h1 class="h3 mt-3">購買資訊</h1>
              <table class="table">
                <thead>
                  <th>品名</th>
                  <th>數量</th>
                  <th width="100" class="text-right">單價</th>
                </thead>
                <tbody>
                  <tr v-for="item in order.products" :key="item.id">
                    <td class="align-middle">{{ item.product.title }}</td>
                    <td class="align-middle">{{ item.qty }}/{{ item.product.unit }}</td>
                    <td class="text-right"><del>{{item.total|currency}}</del><br><span class="text-success">{{item.final_total|currency}}</span></td>
                  </tr>
                </tbody>
                <tfoot>
                  <tr>
                    <td colspan="2" class="text-right">總計: </td>
                    <td class="text-right text-success">{{order.total|currency}}</td>
                  </tr>
                </tfoot>
              </table>
              <p class="h3">個人資料</p>
              <table class="table">
                <tbody>
                  <tr>
                    <th width="100">Email</th>
                    <td>{{ order.user.email }}</td>
                  </tr>
                  <tr>
                    <th>姓名</th>
                    <td>{{ order.user.name }}</td>
                  </tr>
                  <tr>
                    <th>收件人電話</th>
                    <td>{{ order.user.tel }}</td>
                  </tr>
                  <tr>
                    <th>收件人地址</th>
                    <td>{{ order.user.address }}</td>
                  </tr>
                  <tr>
                    <th>付款狀態</th>
                    <td>
                      <span v-if="!order.is_paid">尚未付款</span>
                      <span v-else class="text-success">付款完成</span>
                    </td>
                  </tr>
                </tbody>
              </table>
              <div class="text-right" v-if="order.is_paid === false">
                <button class="btn btn-danger">確認付款去</button>
              </div>
              <div class="text-right" v-if="order.is_paid === true">
                <router-link to="/home"><button class="btn btn-primary">繼續購物</button></router-link>
              </div>
            </form>
          </div>
          <Footer></Footer>
    </div>
</template>
<script>
import HomeNav from '../HomeNavbar';
import Footer from '../footer';
import progressbar from '../progressbar';
    export default {
        components:{
            HomeNav,
            Footer,
            progressbar,
        },
        data(){
            return{
                orderId:'',
                order:{
                    user:{},
                },
                status:2,
            }
        },
        methods: {
            getOrder(){
                const vm = this;
                const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/order/${vm.orderId}`; //這裡的orderId就是在created所取回來的id
                    vm.isLoading = true;
                    this.$http.get(api).then((response) => {
                    console.log(response);
                    vm.order = response.data.order;
                    vm.isLoading = false;
                    });
            },
            payOrder(){
                const vm = this;
                const api=`${process.env.APIPATH}/api/${process.env.CUSTOMPATH}/pay/${vm.orderId}`; //這裡的orderId就是在created所取回來的id
                    vm.isLoading = true;
                    this.$http.post(api).then((response) => {
                    console.log(response);
                    if(response.data.success){
                        vm.getOrder();
                        vm.status = 3;
                    }
                    vm.isLoading = false;
                    });
            },
        },
        created(){
          const vm = this;
          vm.orderId = this.$route.params.orderId;//這裡的orderId是router內index.js的路由配置自訂的名稱(名稱要一致!)
          console.log(this.orderId); //就是網址列後方那個id
          vm.getOrder();
        },
    }
    </script>