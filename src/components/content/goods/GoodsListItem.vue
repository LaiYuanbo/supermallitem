<template>
  <div class='goods-item' @click = "itemClick">
    <!-- vue快键监听图片加载用@load -->
    <img :src="showImg" alt="" @load='imgload'>
    <div class='goods-info'>
      <p>{{goodslist.title}}</p>
      <span class='price' >{{goodslist.price}}</span>
      <span class='collect' >{{goodslist.cfav}}</span>
    </div>
  </div>
</template>

<script>
export default {
    name: 'GoodsListItem',
    props:{
      goodslist:{
        type:Object,
        default(){
          return {}
        }
      }
    },
    computed:{
      showImg(){
        return this.goodslist.image || this.goodslist.show.img
      }
  },
    methods:{
      imgload(){
        this.$bus.$emit('itemImgLoad')
      },
      itemClick(){
        this.$router.push('/detail/' + this.goodslist.iid)
      }
    }
}
</script>

<style scoped>
.goods-item {
    padding-bottom: 40px;
    position: relative;

    width: 100%;
  }

  .goods-item img {
    width: 100%;
    border-radius: 5px;
  }

  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
  }

  .goods-info p {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-bottom: 3px;
  }

  .goods-info .price {
    color: var(--color-high-text);
    margin-right: 20px;
  }

  .goods-info .collect {
    position: relative;
  }

  .goods-info .collect::before {
    content: '';
    position: absolute;
    left: -15px;
    top: -1px;
    width: 14px;
    height: 14px;
    background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
  }
</style>