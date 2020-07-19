<template>
  <div class="tab-bar-item" @click="itemClick">
    <div v-if="!isActive">
      <slot name="item-icon"></slot>
    </div>
    <div v-else>
      <slot name="item-icon-active"></slot>
    </div>
    <div :class="{active:isActive}">
      <slot name="item-text"></slot>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    //   isActive: true
    };
  },
  computed:{
      isActive(){
          return this.$route.path.indexOf(this.path) !== -1
      }
  },
  props:{
      path: String
  },
  methods:{
      itemClick(){
       this.$router.replace(this.path).catch(err=>err)
      }
     
  }
};
</script>

<style scoped>
.tab-bar-item {
  flex: 1;
  height: 49px;
  text-align: center;
  font-size: 14px;
}
.tab-bar-item img {
  margin-top: 3px;
  width: 24px;
  height: 24px;
}
.active {
  color: rgb(253, 167, 181);
}
</style>