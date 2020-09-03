<template>
    <div>
        <div>
            <nav class="navbar navbar-expand-lg navbar-light bg-white">
                <router-link to="/"><img src="https://github.com/andrew-HuangHaoChe/image/blob/master/keyboardlogo.png?raw=true" class="logoImg"></router-link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                  <span class="navbar-toggler-icon"></span>
                </button>
              
                <div class="collapse navbar-collapse" id="navbarSupportedContent">
                  <ul class="navbar-nav ml-auto py-4">
                    <li class="nav-item px-4">
                      <router-link :to="{ path: '/'}" active-class="routerActive"><i class="fas fa-home fa-2x d-flex justify-content-center"></i><div class="d-flex justify-content-center homeFont">首頁</div></router-link>
                    </li>
                    <li class="nav-item px-4">
                      <router-link :to="{ path: '/shopping'}" active-class="routerActive"><i class="fas fa-shopping-bag fa-2x d-flex justify-content-center"></i><div class="d-flex justify-content-center homeFont">商品</div></router-link>
                    </li>
                    <li class="nav-item px-4">
                      <router-link :to="{ path: '/promotion'}" active-class="routerActive"><i class="fas fa-ticket-alt fa-2x d-flex justify-content-center"></i><div class="d-flex justify-content-center icon">優惠活動</div></router-link>
                    </li>
                    <li class="nav-item px-4">
                        <router-link :to="{ path: '/login'}" active-class="routerActive"><i class="far fa-user fa-2x d-flex justify-content-center"></i><div class="d-flex justify-content-center icon">登入</div></router-link>
                      </li>
                  </ul>
                </div>
              </nav>
            
        </div>    
    </div>
</template>
<script>
  export default{
    data(){
      return{
        isrouActive:false,
      }
    }
  }
</script>