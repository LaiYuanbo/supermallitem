<template>
  <div class="detailGoodsInfo" >
    <div class="desc">{{ detailGoodsInfo.desc }}</div>
    <div v-for="item in detailGoodsInfo.detailImage[0].list" >
      <img  class="defailImage" :src="item" alt="" @load = 'imgLoad' />
    </div>
  </div>
</template>

<script>
// import debounce from "@/common/utils";

export default {
  name: "DetailGoodsInfo",
  data() {
    return {
      counter:0,
      imgLength:0
    };
  },
  props: {
    detailGoodsInfo: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  methods: {
    imgLoad() {
      this.counter += 1;
      if(this.counter === this.imgLength){
          this.$emit("imgLoad");
      }
    },
  },
  watched:{
    detailGoodsInfo(){
        this.imgLength = this.detailGoodsInfo.detailImage[0].list
    }
  }
};
</script>

<style lang="less" scoped>
.detailGoodsInfo {
  padding: 30px 8px 20px;
  box-shadow: 0px 3px 0 rgba(1, 1, 1, 0.25);
  .desc {
    font-weight: bold;
    padding: 0px 8px 20px;
  }
  .defailImage {
    height: 100%;
    width: 100%;
  }
}
</style>