<template>
  <div class="cartList">
   <cart-list-item
      v-for="(item, index) in cartList"
      :key="index"
      :product="item"
    ></cart-list-item>
  </div>
</template>

<script>
import Scroll from "components/common/scroll/Scroll.vue"
import cartListItem from "./cartListItem"

import {mapGetters} from "vuex"
export default {
  name:'cartList',
  components:{
    Scroll,
    cartListItem
  },
  computed:{
    ...mapGetters(["cartList"])
  },
  activated(){
    // console.log("_____");
    // this.$refs.scroll.refresh()
  }
}
</script>


<style lang='less' scoped>
 .cartList {
  overflow: hidden;
}

 
//  .wraper{
//    height:100%;
//    overflow:hidden;
   
//  }
</style>