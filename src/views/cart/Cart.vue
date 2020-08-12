<template>
    <div class="Cart">
        <nav-bar class="navbar">
            <div slot="center">购物车({{cartLength}})</div>
        </nav-bar>
        <cart-list class="cart"></cart-list>
    </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar"
import CartList from "./childcomps/CartList"

import {mapGetters} from "vuex"
export default {
    components:{
        NavBar,
        CartList
    },
    computed:{
        // 引入vuex中的mapGetters 然后导入
       ...mapGetters({
           cartLength :'cartLength'
       })
    }
}
</script>

<style scoped>
.navbar{
    position: relative;
    background-color: var(--color-tint);
    color: #fff;
    z-index: 9;
}
.cart{
    height:  calc(100vh - 44px - 49px - 40px);
}
</style>