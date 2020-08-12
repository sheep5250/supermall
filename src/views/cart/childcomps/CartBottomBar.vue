<template>
  <div class="cart-buttom-bar">
      <div class="check-content">
          <check-button class="check-button" @click.native="totalclick" :is-checked="allchecked"></check-button>
          <span>全选</span>
      </div>
      <div class="check-price">
          <span>合计{{totalprice}}</span>
      </div>
       <div class="check-calute">
          <span>去计算{{totalcount}}</span>
      </div>
  </div>
</template>

<script>
import CheckButton from "../../../components/content/checkbutton/CheckButton"
export default {
    components:{
        CheckButton
    },
    computed:{
        totalprice(){
            return '￥'+this.$store.getters.cartList.filter(item=>{
                return item.check
            }).reduce((pre,item)=>{
                return pre+item.price*item.count
            },0).toFixed(2)
        },
        totalcount(){
            return this.$store.getters.cartList.filter(item=>{
                return item.check
            }).length
        },
        allchecked(){
            if(this.$store.getters.cartList.length ==0) return false
            return !this.$store.getters.cartList.filter(item =>{
                return !item.check
            }).length
        }
    },
    methods:{
        totalclick(){
            if(!this.allchecked){
                this.$store.getters.cartList.forEach(item => {
                    item.check = true
                });
            }else{
                 this.$store.getters.cartList.forEach(item => {
                    item.check = false
                });
            }
        }
    }
}
</script>

<style>
.cart-buttom-bar{
    background-color: #eeeeee;
    height: 40px;
    line-height: 40px;
    position: relative;
    display: flex;
}
.check-button{
    width: 25px;
    height: 25px;
    line-height: 25px;
    margin: 0 6px;
}
.check-content{
    width: 100px;
    align-items: center;
    display: flex;
}
.check-price{
    flex: 1;
}
.check-calute{
    background-color: var(--color-tint);
    width: 80px;
    padding: 0 10px;
    color:#fff;
}
</style>