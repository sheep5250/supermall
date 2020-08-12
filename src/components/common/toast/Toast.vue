<template>
  <div class="toast" v-show="show">加入购物车</div>
</template>

<script>
export default {
    props:{
        show:{
            type:Boolean,
            default:false
        }
    }
}
</script>

<style>
.toast{
    position: fixed;
    top: 50%;
    left:50%;
    padding: 8px 10px;
    color: #ffffff;
    background-color: rgba(0, 0, 0, 0.7);
    z-index: 9;
    transform: translate(-50%,-50%);
}
</style>