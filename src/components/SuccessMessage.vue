<template>
    <div class="message-alert">
      <div class="alert alert-dismissible-success"
        :class="'alert-' + item.status"
        v-for="(item, i) in messages" :key="i">
        {{ item.message }}
        <button type="button" class="success-close" @click="removeMessage(i)" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
        <div class="tickBlock d-flex justify-content-center align-items-center mt-2">
          <svg width="50" height="50">
            <circle class="circle" fill="none" stroke="#68E534" stroke-width="5" cx="25" cy="25" r="21" stroke-linecap="round" transform="rotate(-20 30 30)"></circle>
            <polyline class="tick" fill="none" stroke="#68E534" stroke-width="5" points="11,26,21,35,38,17" stroke-linecap="round" stroke-linejoin="round"></polyline>
          </svg>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Navbar',
    data() {
      return {
        messages: [],
      };
    },
    methods: {
      updateMessage(message, status) {
        const timestamp = Math.floor(new Date() / 1000);
        this.messages.push({
          message,
          status,
          timestamp,    
        });
        this.removeMessageWithTiming(timestamp);
      },
      removeMessage(num) {
        this.messages.splice(num, 1);
      },
      removeMessageWithTiming(timestamp) {
        const vm = this;
        setTimeout(() => {
          vm.messages.forEach((item, i) => {
            if (item.timestamp === timestamp) {
              vm.messages.splice(i, 1);
            }
          });
        }, 5000);
      },
    },
    created() {
      const vm = this;
  
      //自定義名稱 'messsage:push'
      //message: 傳入參數
      //status: 樣式，預設值為 warning
      vm.$bus.$on('successMessage', (message, status = 'warning') => {
        vm.updateMessage(message, status);
      });
      //vm.$bus.$emit('message:push');
    },
  };
  </script>
  
  <style scope>
  .message-alert {
    position: fixed;
    max-width: 50%;
    top: 56px;
    right: 45%;
    z-index: 1100;

  }
  .alert-dismissible-success{
    min-height: 150px;
    background-color: #fff;
    color:#28a745;
    padding-right: 10px;
    padding-top:15px;
  }
  .success-close{
    padding-bottom:10px;
    background:none;
    border:none;
    font-size: 25px;
  }
  .circle{
    stroke-dasharray: 149;
    stroke-dashoffset: 10;
    animation: circle 1s ease-in-out;
  }
  .tick{
    stroke-dasharray: 35;
    stroke-dashoffset: 0;
    animation: tick 0.8s ease-out;
  }
  @keyframes circle{
    from{
      stroke-dashoffset: 149;
    }
    to{
      stroke-dashoffset: 300;
    }
  }
  @keyframes tick{
    from{
      stroke-dashoffset: 35;
    }
    to{
      stroke-dashoffset: 0;
    }
  }
  </style>