import {debounce} from "./utils"

export const itemListenMixin =  {
  data(){
    return {
      itemImgListener: null
    }
  },
  mounted(){
    let newRefresh = debounce(this.$refs.scroll.refresh,100);
    this.itemImgListener =()=>{
      newRefresh()
    };
    this.$bus.$on("itemImgLoad",this.itemImgListener);
    // console.log("我是混入其中的");
  }
}