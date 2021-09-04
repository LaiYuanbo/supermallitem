<template>
  <div id='detail_main'>
    <!-- <div>{{$store.state.cartList.length}}</div> -->
    <child-nav-bar class="navBar" @titleClick="titleClick"/>  
    

    <scroll class="content" ref="scroll" :probe-type="3" @ascroll="contentScroll">
      
    <detail-swiper  :topImages="topImages"/>
    <detail-base-info :baseInfo="baseInfo"/>
    <detail-shop-info :shopInfo="shopInfo"/>
    <detail-goods-info v-if="detailInfo" :detailGoodsInfo="detailInfo" @imageLoad="imageLoad"/>
    <detail-params ref="params" :goodsParams="detailParams"/>
    <comment-info ref="comments":commentInfo='commentInfo'/>
    <goods-list ref="recommends":goods="recommends"/>
    </scroll>
    <detail-bottom-bar @AddCart="AddToCart"/>
  </div>
</template>

<script>
import ChildNavBar from './childNavBar/ChildNavBar.vue'
import detailSwiper from './childNavBar/detailSwiper.vue'
import DetailBaseInfo from './childNavBar/DetailBaseInfo.vue'
import DetailShopInfo from './childNavBar/DetailShopInfo.vue'
import DetailGoodsInfo from './childNavBar/DetailGoodsInfo'
import DetailParams from './childNavBar/DetailParams'
import CommentInfo from './childNavBar/CommentInfo'
import scroll from "components/common/scroll/Scroll"
import GoodsList from "components/content/goods/GoodsList"
import DetailBottomBar from "./childNavBar/DetailBottomBar.vue"


import {getDetail,Goods,Shop,ShopParams,getRecommend} from 'network/getDetail'
import {itemListenMixin} from "common/mixin.js"
import {debounce} from "common/utils"




export default {
  name: "detail",
  components:{
    ChildNavBar,
    detailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    scroll,
    DetailGoodsInfo ,
    DetailParams ,
    CommentInfo ,
    GoodsList,
    DetailBottomBar
  },
  data(){
    return {
      iid:null,
      topImages: [],
      baseInfo: {},
      shopInfo:{},
      detailInfo:{},
      detailParams:{},
      commentInfo:{},
      recommends:[],
      themeTopYs:[],
      getThemeTopY:null,
      currentIndex:0
    }
  },
  mixins:[itemListenMixin],
  methods:{
    //获取offsetTop
      imageLoad(){
        this.$refs.scroll.refresh()
        this.getThemeTopY()
      },
      titleClick(index){
        this.$refs.scroll.scrollTo(0,-this.themeTopYs[index],100)
      },
      contentScroll(position){
        
        const positionY =  -position.y;
        // console.log(this.themeTopYs);
        let length = this.themeTopYs.length
        for(let i = 0;i < length ;i++){
            if(this.currentIndex !==i&&(i < length - 1&&positionY >= 
            this.themeTopYs[i]&&positionY < this.themeTopYs[i+1])
            ||(i === length - 1&&positionY >= this.themeTopYs[i])){
              this.currentIndex = i
              // console.log(i);
            }
        }
        
      },
      //加入购物车
      AddToCart(){
        console.log("加入购物车");
        //获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.baseInfo.title;
        product.desc = this.baseInfo.desc;
        product.price = this.baseInfo.realPrice;
        product.iid = this.iid;
        // this.$store.commit("addCart1",product)
        this.$store.dispatch('addCart1',product)
        }
      
  },
  created(){
    //1.保存存入的iid
    this.iid = this.$route.params.iid,
    //2.根据iid请求详情页的数据
    getDetail(this.iid).then(res=>{
      const data = res.result
      this.topImages = data.itemInfo.topImages
      // 获取商品信息
      this.baseInfo = new Goods(data.itemInfo,data.columns,data.shopInfo.services)
      // 获取店铺数据
        this.shopInfo = new Shop(data.shopInfo);
        //店铺信息
        this.detailInfo = data.detailInfo
        //获取参数
        this.detailParams = new ShopParams(data.itemParams)
        //获取评论信息
        if(data.rate.cRate!==0) {
          this.commentInfo = data.rate.list[0]
        }
    })
    
  
    //3.请求推荐数据
    getRecommend().then(res=>{
        // console.log(res);
      this.recommends = res.data.list
    })

    this.getThemeTopY = debounce(()=>{
          this.themeTopYs = []
          this.themeTopYs.push(0)
          this.themeTopYs.push(this.$refs.params.$el.offsetTop)
          this.themeTopYs.push(this.$refs.comments.$el.offsetTop)
          this.themeTopYs.push(this.$refs.recommends.$el.offsetTop)
          console.log(this.themeTopYs);
        },100)
  },
  mounted(){
    
  },

  destroy(){
    //取消全局监听
    this.$bus.$off('itemImgLoad',this.itemImgListener)
  }
}
</script>

<style scoped>
#detail_main{
  position:relative;
  z-index: 9;
  background-color: #fff;
  height: 100vh;
}
.navBar{
  position:relative;
  z-index: 9;
  background-color: #fff;
}
.content{
  position:absolute;
  background-color: #fff;
  top:44px;
  bottom:49px;
  left:0;
  right:0;
  
}
</style>