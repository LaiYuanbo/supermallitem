<template>
  <div id='detail_main'>
    <child-nav-bar class="navBar"/>  
    <scroll class="content" ref="scroll">
    <detail-swiper  :topImages="topImages"/>
    <detail-base-info :baseInfo="baseInfo"/>
    <detail-shop-info :shopInfo="shopInfo"/>
    <detail-goods-info v-if="detailInfo" :detailGoodsInfo="detailInfo" @imgLoad="imgLoad"/>
    </scroll>
    
  </div>
</template>

<script>
import ChildNavBar from './childNavBar/ChildNavBar.vue'
import detailSwiper from './childNavBar/detailSwiper.vue'
import DetailBaseInfo from './childNavBar/DetailBaseInfo.vue'
import DetailShopInfo from './childNavBar/DetailShopInfo.vue'
import DetailGoodsInfo from './childNavBar/DetailGoodsInfo'
import scroll from "components/common/scroll/Scroll"

import {getDetail,Goods,Shop} from 'network/getDetail'




export default {
  name: "detail",
  components:{
    ChildNavBar,
    detailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    scroll,
    DetailGoodsInfo   
  },
  data(){
    return {
      iid:null,
      topImages: [],
      baseInfo: {},
      shopInfo:{},
      detailInfo:{}
    }
  },
  methods:{
      imgLoad(){
        this.$refs.scroll.refresh()
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
        console.log("详细信息：",this.detailInfo);
    })
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
  height:calc(100% - 44px)
}
</style>