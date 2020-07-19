<template>
  <div class="tab-control">
    <div v-for="(item,index) in title" 
    :key="index" class="tab-control-item" 
    :class="{active:currentIndex===index}"
    @click="itemclick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  data(){
      return{
          currentIndex : 0
      }
  },
  methods:{
      itemclick(index){
        this.currentIndex=index ;
        this.$emit('goodsclick',index)
      }
  },
  props: {
    title: {
      type: Array,
      default() {
        return [];
      }
    }
  }
};
</script>

<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
}
.tab-control-item {
  flex: 1;
  height: 40px;
  line-height: 40px;
}
.active{
    color: var(--color-tint);
}
.active span{
    padding: 3px;
    border-bottom: 3px solid var(--color-high-text);
}
</style>