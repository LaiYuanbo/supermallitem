<template>
  <div>
    <swiper>
      <swiper-item v-for='item in banners'>
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageItemLoad">
        </a>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";
export default {
  name: 'HomeSwiper',
  components:{
    Swiper,
    SwiperItem
  },
  data(){
    return {
      isload:false
    }
  },
  props:{
    banners:{
      type: Array,
      default(){
        return []
      }
    }
  },
  methods:{

    
    imageItemLoad(){
     if (!this.isload){
      this.$emit("imageItemLoad")
      this.isload = true;
    }
      
    }
  }

}
</script>

<style>

</style>