<template>
  <div class="checkButton" :class='{isactive:isheck}' >
    <img src="~assets/img/cart/tick.svg" />
    <!-- <span class="checkButton" :class="isCheck? 'iconfont icon-mg-checkbox':'iconfont icon-duoxuankuang1' "></span> -->
    <!-- <span class="icon-duoxuankuang checkButton"></span> -->

  </div>
</template>

<script>
export default {
  name: "CheckButton",
  data() {
    return {};
  },
  props: {
    isheck: {
      type: Boolean,
      default() {
        return false
      },
    },
  },
  methods: {
    
  },
};
</script>

<style scoped>
.checkButton {
  /* font-size: 22px; */
  
  border-radius: 50%;
  border: 2px solid #aaa;
}
.isactive{
  background-color: red;
  border-color: red;
  /* border: 2px solid #aaa; */
}
</style>