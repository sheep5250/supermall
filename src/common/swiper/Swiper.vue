<template>
  <div>
    <div class="block">
      <el-carousel trigger="click" height="180px">
        <el-carousel-item v-for="item in banners" :key="item.image">
          <a :href="item.link">
          <img :src="item.image" style="width:100%;height:100%" alt="">
          </a>

        </el-carousel-item>
      </el-carousel>
    </div>
  </div>
</template>

<script>
import Vue from "vue";
import ElementUI from "element-ui";
import "element-ui/lib/theme-chalk/index.css";
Vue.use(ElementUI);
export default {
  props:{
    banners:{
      type: Array
    }
  }
};
</script>

<style>

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>