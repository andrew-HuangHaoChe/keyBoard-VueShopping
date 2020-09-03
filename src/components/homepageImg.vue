<template>
    <div>
        <div class="hpImg">
            <img src="https://images.unsplash.com/photo-1541746972996-4e0b0f43e02a?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1350&q=80" v-scrollanimation>
        </div>
    </div>
</template>
<script>
    export default{};
</script>
<style lang="scss" scoped>
    .hpImg{
        position: absolute;
        top: 20%;
        right: 10%;
        z-index: 0;
    }
    .hpImg > img{
        max-height: 500px;
        min-width: 1000px;
    }
    .before-enter{
        opacity: 0;
        transform:translateX(100px);
        transition: all 2s ease-out;
    }
    .enter{
        opacity: 1;
        transform:translateX(0px);
    }
</style>