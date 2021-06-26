<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from "better-scroll"
export default {
    name: 'Scroll',
    data(){
      return {
        scroll:null,
        
      }
    },
    props:{
      probeType:{
        type:Number,
        default:0
      },
      pullload:{
        type:Boolean,
        default:false
      }
    },
    mounted(){
      this.scroll  = new BScroll(this.$refs.wrapper,{
        click:true,
        probeType:this.probeType,
        pullUpLoad:this.pullload

      })
      //监听滚动的位置
      this.scroll.on("scroll",(position)=>{
        // console.log(position);
        this.$emit("ascroll",position)
      })
      // 上拉加载更多
      this.scroll.on("pullingUp",()=>{
        this.$emit("spullingUp")
        // console.log("上拉加载");
      })
      console.log(this.scroll);
    },
    methods:{
      scrollTo(x,y,time=300){
        this.scroll.scrollTo(x,y,time)
      },
      refresh(){
        
        this.scroll.refresh()
      },
      finishPullUp(){
        this.scroll.finishPullUp()
      },
      getScrollY(){
        return this.scroll.y
      }
    }
}
</script>

<style scoped>

</style>