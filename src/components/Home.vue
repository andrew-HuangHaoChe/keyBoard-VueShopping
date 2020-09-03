<template>
    <div>
        <HomeNav></HomeNav>
        <HomeHeader></HomeHeader>
        <HomeContent></HomeContent>
        
    </div>
</template>
<script>
    import HomeNav from './HomeNavbar';
    import HomeHeader from './HomeHeader';
    import HomeContent from './HomeContent';
    
    export default {
        components:{
            HomeNav,
            HomeHeader,
            HomeContent,
            
        },
    }
</script>