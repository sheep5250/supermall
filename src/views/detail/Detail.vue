<template>
  <div id="detail">
    <nav-bar class="nav-head">
      <div slot="left" @click="back">
        <img src="../../assets/img/common/back.svg" alt class="imgPosition" />
      </div>
      <div slot="center" class="title">
        <div
          v-for="(item,index) in title"
          :key="index"
          class="title-item"
          :class="{active : index===currentIndex}"
          @click="titleClick(index)"
        >{{item}}</div>
      </div>
    </nav-bar>
    <scroll class="content" ref="scroll" @scrollposition='scrollposition'>
      <detail-swiper :banners="topImage"></detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info :detailInfo="detailInfo" @imageLoad="imageLoad"></detail-goods-info>
      <detail-param-info :paramInfo="paramInfo" ref="param"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="comment"></detail-comment-info>
      <good-list :goods="recommendInfo" ref="recommend"></good-list>
    </scroll>
    <detail-button-nav @addToCart="addToCart"></detail-button-nav>
    <toast :show="show"></toast>
  </div>
</template>

<script>
import NavBar from "../../components/common/navbar/NavBar";
import DetailSwiper from "../../common/swiper/DetailSwiper";
import Scroll from "../../components/common/scroll/Scroll";
import DetailBaseInfo from "./childcomps/DetailBaseInfo";
import DetailShopInfo from "./childcomps/DetailShopInfo";
import DetailGoodsInfo from "./childcomps/DetailGoodsInfo";
import DetailParamInfo from "./childcomps/DetailParamInfo";
import DetailCommentInfo from "./childcomps/DetailCommentInfo";
import GoodList from "../../components/content/goods/GoodsList";
import DetailButtonNav from "./childcomps/DetailButtonnav"
import Toast from "../../components/common/toast/Toast"
import { itemListenerMixin } from "../../common/mixin";
import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend,
} from "../../network/detail";
export default {
  name: "Detail",
  mixins: [itemListenerMixin],
  data() {
    return {
      iid: null,
      title: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0,
      topImage: null,
      goods: {},
      shop: {},
      paramInfo: {},
      detailInfo: {},
      commentInfo: {},
      recommendInfo: [],
      itemImageListening: null,
      themeTopYs: [],
      getThemeTopY: null,
      currentI:0,
      show:false
    };
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
    titleClick(index) {
      this.currentIndex = index;
      this.$refs.scroll.scroll.scrollTo(0, -this.themeTopYs[index], 100);
      // console.log(index);
    },
    imageLoad() {
      // console.log(this.$refs.scroll);
      this.$refs.scroll.scroll.refresh();
      this.getThemeTopY();
    },
    // 滚动距离监听
    scrollposition(position){
      let positionY=-position.y
     for(let i=0;i<this.themeTopYs.length;i++){

       if((this.currentI!==i&&i<this.themeTopYs.length-1&&positionY>=this.themeTopYs[i]&&positionY<this.themeTopYs[i+1])||(this.currentI!=i&&i===this.themeTopYs.length-1&&positionY>=this.themeTopYs[i])){
         console.log(i);
         this.currentI=i;
         this.currentIndex=this.currentI
       }
     }
    },
    // 加入购物车
    addToCart(){
      const product = {}
      product.iid = this.iid
      product.image = this.topImage[0]
      product.desc = this.goods.desc
      product.title = this.goods.title
      product.price = this.goods.price
      console.log(product);
      this.$store.commit('addCart',product)
      this.show=true
      setTimeout(()=>{
        this.show=false
      },2000)
    }
  },
  components: {
    NavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    Scroll,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    GoodList,
    DetailButtonNav,
    Toast
  },
  created() {
    this.iid = this.$route.params.iid;
    // console.log(this.iid);
    getDetail(this.iid).then((res) => {
      console.log(res);
      this.topImage = res.result.itemInfo.topImages;
      // console.log(this.topImage);
      // 获取商品信息
      this.goods = new Goods(
        res.result.itemInfo,
        res.result.columns,
        res.result.shopInfo.services
      );
      // 获取店铺信息
      this.shop = new Shop(res.result.shopInfo);
      // 详情信息
      this.detailInfo = res.result.detailInfo;
      // 获取商品参数
      this.paramInfo = new GoodsParam(
        res.result.itemParams.info,
        res.result.itemParams.rule
      );
      // console.log(this.paramInfo);
      if (res.result.rate.cRate > 0) {
        this.commentInfo = res.result.rate.list[0];
        // console.log(this.commentInfo);
      }
    });
    getRecommend().then((res) => {
      this.recommendInfo = res.data.list;
    });
    this.getThemeTopY = this.debounce(() => {
      this.themeTopYs = [];
      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop-44);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop-44);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-44);
      console.log(this.themeTopYs);
    }, 100);
  },
  mounted() {},
  updated() {
    // this.themeTopYs=[]
    //   this.themeTopYs.push(0)
    //   this.themeTopYs.push(this.$refs.param.$el.offsetTop)
    //    this.themeTopYs.push(this.$refs.comment.$el.offsetTop)
    //     this.themeTopYs.push(this.$refs.recommend.$el.offsetTop)
  },
  destroyed() {
    this.$bus.$off("itemImageLoad", this.itemImageListening);
  },
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.imgPosition {
  margin-top: 9px;
}
.active {
  color: var(--color-tint);
}
#detail {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
  height: 100vh;
}
.content {
  height: calc(100% - 44px - 58px);
}
.nav-head {
  position: relative;
  z-index: 9;
  background-color: #ffffff;
}
</style>