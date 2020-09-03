<template>
    <div class="status">
        <ul>
            <li :class="{'bg-primary': status >= 1, 'text-light': status >= 1}"><p>輸入訂單資料</p></li>
            <li :class="{'bg-primary': status >= 2, 'text-light': status >= 2}"><p>確認付款</p></li>
            <li :class="{'bg-primary': status >= 3, 'text-light': status >= 3}"><p>完成購物</p></li>
        </ul>
    </div>
</template>
<script>
    export default{
        props:['status'],
    }
</script>
<style lang="scss" scoped>
    .status{
        margin: 40px 0 0;
    }
    ul{
        list-style: none;
        max-width: 500px;
        display: flex;
        margin: 0 auto;
        padding: 0;
    }
    li{
        width: 30%;
        display: inline-block;
        padding:10px 5px;
        border-radius: 3px;
        text-align: center;
        background:#eee;
        color: #aaa;
        margin:0 3%;
    }
    p{
        margin:0;
    }
</style>