<template>
  <div class="cart-list">
    <scroll class="content" ref="scroll">
        <cart-list-item v-for="(item,index) in cartList" :key="index" :itemInfo="item">
        </cart-list-item>
    </scroll>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
import Scroll from "../../../components/common/scroll/Scroll";
import CartListItem from "./CartListItem";
import CartBottomBar from "./CartBottomBar";
import {mapGetters} from "vuex"
export default {
  components: {
    Scroll,
    CartListItem,
    CartBottomBar
  },
  computed:{
    ...mapGetters({
           cartList :'cartList'
       })
  },
  activated(){
      this.$refs.scroll.scroll.refresh()
  }
};
</script>

<style scoped>
.cart-list{
    height: 100%;
}
.content{
    height: 100%;
    overflow: hidden;
}
</style>