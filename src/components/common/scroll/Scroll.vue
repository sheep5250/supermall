<template>
  <div ref="wrapper">
      <div class="content">
          <slot></slot>
      </div>
  </div>
</template>

<script>
import Scroll from "better-scroll"

export default {
    data(){
        return {
            scroll : null,
        }
    },
    props:{
        pullUpLoad:{
            type : Boolean,
            default :false
        }
    },
    mounted(){
        this.scroll = new Scroll(this.$refs.wrapper,{
            click:true,
            probeType:3,
            pullUpLoad:this.pullUpLoad
        }),
        this.scroll.on('scroll',(position)=>{
            this.$emit('scrollposition',position)
        }),
        // 监听到滚动到底部
        this.scroll.on('pullingUp',()=>{
           this.$emit('pullingUp')
        })
    },
    methods:{
        refresh(){
            // console.log("111");
            this.scroll&&this.scroll.refresh()
        }
    }
}
</script>

<style>

</style>