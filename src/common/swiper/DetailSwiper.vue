<template>
  <div>
    <div class="block">
      <el-carousel trigger="click" height="350px">
        <el-carousel-item v-for="item in banners" :key="item">
            <img :src="item" class="img-item" />
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
  data() {
    return {
      isLoad: false
    };
  },
  props: {
    banners: {
      type: Array
    }
  },
  methods: {
    // imgLoad() {
    //   if (!this.isLoad) {
    //     this.$emit("imageLoad");
    //     this.isLoad=true
    //   }
    // }
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
.el-carousel__button{
  width: 10px;
}
/* .img-item{
    width: 100%;
    height: 100%;
} */
</style>