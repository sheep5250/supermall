<template>
  <div id="home">
    <nav-bar class="home-navbar">
      <div slot="center">蘑菇街</div>
    </nav-bar>
     <tab-control :title="['流行','新款','精选']" 
     @goodsclick="goodsclick" ref="tabControl1" 
     class="tabCcontrol" 
     v-show="istabControl"></tab-control>
    <scroll
      class="content"
      ref="scroll"
      :pull-up-load="true"
      @scrollposition="scrollposition"
      @pullingUp="loadMore"
    >
      <swiper :banners="banners" class="swiper" @imageLoad="imageLoad"></swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view></feature-view>
      <tab-control :title="['流行','新款','精选']" @goodsclick="goodsclick" ref="tabControl2"></tab-control>
      <goods-list :goods="goods[currentType].list"></goods-list>
    </scroll>
    <back-top @click.native="backclick" v-show="isback"></back-top>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import Swiper from "../../common/swiper/Swiper";
import RecommendView from "./childcomps/RecommendView";
import FeatureView from "./childcomps/FeatureView";
import Scroll from "../../components/common/scroll/Scroll";
import TabControl from "../../components/content/tabcontrol/TabControl";
import GoodsList from "../../components/content/goods/GoodsList";
import BackTop from "../../components/content/backtop/BackTop";
import { getHomeMultidata, getHomeFood } from "../../network/home";
import {itemListenerMixin} from "../../common/mixin"
export default {
  mixins: [itemListenerMixin],
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: {
          page: 0,
          list: []
        },
        new: {
          page: 0,
          list: []
        },
        sell: {
          page: 0,
          list: []
        }
      },
      currentType: "pop",
      isback: false,
      tabOffsetTop:0,
      topFixed:false,
      istabControl:false,
      saveY:0,
      itemImageListening:null
    };
  },
  components: {
    NavBar,
    Swiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    Scroll,
    BackTop
  },
  created() {
    // 请求多个数据
    this.getHomeMultidata();
    this.getHomeFood("pop");
    this.getHomeFood("new");
    this.getHomeFood("sell");
  },
  mounted() {
  },
  destroyed(){
    console.log("home");
  },
  activated(){
   this.$refs.scroll.scroll.scrollTo(0,this.saveY,2000)
   this.$refs.scroll.scroll.refresh()
  },
  deactivated(){
    this.saveY=this.$refs.scroll.scroll.y,
    this.$bus.$off("itemImageLoad",this.itemImageListening)
    // console.log(this.saveY);
  },
  methods: {
    // 判断是哪个选项点击
    goodsclick(index) {
      switch (index) {
        case 0: {
          this.currentType = "pop";
          break;
        }
        case 1: {
          this.currentType = "new";
          break;
        }
        case 2: {
          this.currentType = "sell";
          break;
        }
        
      }
    console.log(index);
       this.$refs.tabControl1.currentIndex = index;
       this.$refs.tabControl2.currentIndex = index;
    },
    // 点击返回最顶部
    backclick() {
      this.$refs.scroll.scroll && this.$refs.scroll.scroll.scrollTo(0, 0, 500);
      // console.log(this.$refs.scroll.message);
    },
    imageLoad() {
      // 计算吸顶效果的offsettop
      this.tabOffsetTop=this.$refs.tabControl2.$el.offsetTop
      // console.log();
    },
    scrollposition(position) {
      // console.log(-position.y);
      this.isback = -position.y > 1000;
      this.istabControl = -position.y > (this.tabOffsetTop-44)
      // console.log(this.isback);
    },
    // 加载更多
    loadMore() {
      // console.log(this.currentType);
      this.getHomeFood(this.currentType);
    },

    // 网络请求的方法
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        // console.log(res);
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    getHomeFood(type) {
      let page = this.goods[type].page + 1;
      getHomeFood(type, page).then(res => {
        this.goods[type].page += 1;
        this.goods[type].list.push(...res.data.list);
        this.$refs.scroll.scroll.finishPullUp();
      });
    }
  }
};
</script>

<style scoped>
.swiper {
  padding-top: 44px;
  position: relative;
}
.home-navbar {
  background-color: var(--color-tint);
  color: #ffffff;
  position: fixed;
  z-index: 9;
  width: 100%;
}

.content {
  position: absolute;
  top: 0px;
  bottom: 49px;
  left: 0;
  right: 0;
}

.tabCcontrol{
  /* margin-top: 44px; */
  position: relative;
  top: 44px;
  background-color: #ffffff;
  z-index: 9;
}
@media screen and (min-width: 750px) {
   .swiper{
     padding-top: 44px !important;
   }
}
</style>