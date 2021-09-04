<template>
   <div class="cart">
     <!-- 导航 -->
     <nav-bar class="navbar">
      <div  slot="center">购物车({{cartLength}})</div>
     </nav-bar>
     <!-- 商品列表 -->
     <scroll ref="scroll" class="scroll">
       <cart-list></cart-list>
     </scroll>
     <!-- 底部汇总 -->
     <cart-bottom-bar/>
   </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar"
import cartList from "./childComps/cartList.vue"
import scroll from "components/common/scroll/Scroll"
import cartBottomBar from './childComps/cartBottomBar.vue'

import {mapGetters} from "vuex"
  export default {
    name: "Cart",
    components:{
      NavBar,
      cartList,
      scroll,
      cartBottomBar
    },
    computed:{
      // cartLength(){
      //   return this.$store.state.cartList.length
      // mapGetters辅助函数语法
      //1.语法1 数组格式
      // ...mapGetters(["cartListLength","cartList"])

      //2 对象语法
      ...mapGetters({
        cartLength: "cartListLength",
        cartlist: "cartList"
      })
      },
      activated(){
        this.$refs.scroll.scroll.refresh();
      }
    
  }
</script>

<style scoped>
.cart{
  height: 100vh;
  width: 100%;
  position: relative;
  left: 0;
  top: 0;
  right: 0;
  background-color: #f6f6f6;
  font-size: 16px;
}
.scroll{
  position: absolute;
  top: 44px;
  left: 0;
  right: 0;
  bottom: 89px;
  overflow: hidden;
}
.navbar{
  background-color: var(--color-tint);
  color:#fff;
}

</style>
