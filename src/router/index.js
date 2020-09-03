import Vue from 'vue';
import VueRouter from 'vue-router';
//官方元件
// import Home from '@/components/HelloWorld';
import Homepage from '@/components/Homepage';
import ShopPage from '@/components/Home';
import Login from '@/components/pages/Login';
import Dashboard from '@/components/Dashboard';
import Products from '@/components/pages/Products';
import orderList from '@/components/pages/orderList';
import Discount from '@/components/pages/Discount';
import Mockorder from '@/components/pages/Mockorder';
import CustomerCheckout from '@/components/pages/CustomerCheckout';
import PickCommodity from '@/components/pages/PickCommodity';
import fdCustomerCheckout from '@/components/fdCustomerCheckout';
import Promotion from '@/components/Promotion';
import CheckoutSteptwo from '@/components/pages/CheckoutStep2';
Vue.use(VueRouter);

export default new VueRouter({
  routes:[
      {
        path:'*',
        redirect:'login',
      },
      {
        path:'/',
        name:'首頁',
        component: Homepage,
      },
      {
        path:'/shopping',
        name:'購物頁',
        component: ShopPage,
      },
      {
        path:'/pickcommodity/:id?',
        name:'PickCommodity',
        component: PickCommodity,
      },
      {
        path:'/faOrder',
        name:'fdOrder',
        component: fdCustomerCheckout,
      }, 
      {
        path:'/checkout2/:orderId',
        name:'確認結帳',
        component:CheckoutSteptwo,
      },
      {
        path:'/promotion',
        name:'promotion',
        component:Promotion,
      },
      {
          path:'/login',
          name:'Login',
          component: Login,
      },
      {
        path:'/admin',
        name:'後臺管理頁',
        component: Dashboard,
        meta: { requiresAuth: true },
        children:[
          {
            path:'products',
            name:'Products',
            component: Products,
            meta: { requiresAuth: true },
          },
          {
            path:'orderList',
            name:'訂單列表',
            component: orderList,
            meta: { requiresAuth: true },
          },
          {
            path:'Discount',
            name:'優惠券',
            component: Discount,
            meta: { requiresAuth: true },
          },
        ],
      },
      {
          path:'/Dashboard',
          name:'Dashboard',
          component: Dashboard,
          children:[
            {
              path:'Mockorder',
              name:'模擬訂單',
              component: Mockorder,
            },
            {
              path:'customer_checkout/:orderId',
              name:'結帳頁面',
              component: CustomerCheckout,
            },
        ],
      },
  ],  
});