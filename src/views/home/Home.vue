<template>
  <div id="home">
    <!-- <h2>购物街</h2> -->
    <div class="home-nav">
      <nav-bar><div slot="center">购物街</div></nav-bar>
      <tab-control class= 'tab-control'
       :titles="['流行','新款','精选']"
       @tabClick='tabClick' ref="tabControl1"
       v-show='isTabControl'
        />
    </div>
    <scroll class="content" 
    ref='top'
    :probe-type = '3'
    @ascroll = 'contentScroll'
    :pullload = 'true'
    @spullingUp = 'loadMore'
    >
      <home-swiper :banners="banners"  
      @imageItemLoad="imageItemLoad"
      
      />
      <home-recommend-view :recommends='recommends' />
      <feature-view/>
      <tab-control 
       :titles="['流行','新款','精选']"
       @tabClick='tabClick' ref="tabControl2"
        />
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native= 'backTop' v-show='showBackTop' ></back-top>

    
    
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper.vue';
import HomeRecommendView from './childComps/HomeRecommendView.vue'
import FeatureView from './childComps/FeatureView.vue'

import NavBar from "components/common/navbar/NavBar";
import TabControl from 'components/content/tabControl/TabControl'
import GoodsList from 'components/content/goods/GoodsList'
import Scroll from "components/common/scroll/Scroll"
import BackTop from "components/content/backTop/BackTop"


import { getHomeMultidata,getHomeGoods } from "network/home.js";
import { debounce } from 'common/utils.js'

export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods:{
        'pop': { page:0 ,list:[]},
        'new': { page:0 ,list:[]},
        'sell': { page:0 ,list:[]}
      },
      currentType:'pop',
      showBackTop:false,
      offsetTop: null,
      isTabControl: false,
      scrolly:0
    };
  },
  components: {
    HomeSwiper,
    HomeRecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodsList,
    Scroll,
    BackTop,
    getHomeGoods,
  },
  computed:{
    showGoods(){
      return this.goods[this.currentType].list
    }
  },
  created() {       
    // 网络请求相关的
    //1.请求多个数据
    this.getHomeMultidata()
    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted(){
    //监听item中图片加载完成
    const refresh = debounce(this.$refs.top.refresh,200)
    this.$bus.$on("itemImgLoad",()=>{
      refresh();
    })
  },
  activated(){
      this.$refs.top.scroll.scrollTo(0,this.scrolly,200)
      this.$refs.top.refresh()
  },
  deactivated(){
    this.scrolly = this.$refs.top.getScrollY()
    
  },
  methods:{
    /**监听事件*/
    
    tabClick(index){
      switch(index){
          case 0:
          this.currentType ='pop';
          break;
          case 1:
            this.currentType = 'new';
            break;
          case 2:
            this.currentType = 'sell'
      }
      this.$refs.tabControl1.currentIndex = index; 
      this.$refs.tabControl2.currentIndex = index; 
    },
    backTop(){
      this.$refs.top.scrollTo(0,0)
    },
    contentScroll(position){
         this.showBackTop = (-position.y) > 1000
         this.isTabControl = (-position.y) > this.offsetTop
    },
    
    loadMore(){
      this.getHomeGoods(this.currentType)
      console.log("上拉加载");
      this.$refs.top.finishPullUp()
    },
    imageItemLoad(){
        this.offsetTop = this.$refs.tabControl2.$el.offsetTop
        console.log(this.offsetTop);
    },

    /**网络请求 */
    getHomeMultidata(){
      getHomeMultidata().then((res) => {
      console.log("home:",res);
      // this.result = res;
      this.banners = res.data.banner.list;
      this.recommends = res.data.recommend.list;
    });
    }, 
    getHomeGoods(type){
      const page = this.goods[type].page + 1;
      getHomeGoods(type,page).then(res=>{
      // console.log('商品数据：',res);
      this.goods[type].list.push(...res.data.list)
      this.goods[type].page += 1
    })
    }
  }
};
</script>

<style scoped>
  #home{
    height:100vh;
    position:relative;
    
  }
.home-nav {
  position:sticky;
  background-color: var(--color-tint);
  color: #fff;
  z-index: 100;
  
}
.tab-control{
  position:relative;
  z-index:9;
  color:#000;
}
.content{
  position:absolute;
  top:44px;
  bottom:49px;
  left:0px;
  right:0px;
}

</style>