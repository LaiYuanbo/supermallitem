<template>
  <div class='cart-bottom'>
    <div class='content'>
      <check-button class='checkIcon' />
     <span class='spanItem'>全选</span>
     <div class='totalPrice'>合计：{{totalPrice}}</div>
    </div>
    
  </div>
</template>

<script>

import CheckButton from 'components/content/checkButton/CheckButton.vue'
export default {
  name:'cartBottomBar',
  components:{
      CheckButton
 },
 computed:{
   totalPrice(){
     return '￥'+ this.$store.state.cartList.filter(item=>{
       console.log("选中：",item.checked);
       return item.checked
     }).reduce((preValaue,item)=>{
       return preValaue + item.price*item.count
     },0)
   }
 }
}
</script>

<style scoped>
.cart-bottom{
  position:relative;
  height:40px;
  
  top:439px
}
.content{
  display:flex;
}
.checkIcon{
  width:20px;
  height: 20px;
}
</style>