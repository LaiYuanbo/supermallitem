<template>
  <div class='recommends'>
    <div v-for='item in recommends' class='item-recommends'>
      <a :href="item.link">
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
      
    </div>
  </div>
</template>

<script>
export default {
    name: 'HomeRecommendView',
    props: {
      recommends: {
        type: Array,
        default(){
          return []
        }
      }
    }
}
</script>

<style scoped>
.recommends{
  display: flex;
  text-align: center;
  font-size: 12px;
  padding: 15px 0 20px;
  border-bottom: 5px solid #eee;
}
.item-recommends{
  flex:1;
  

  
}
.item-recommends img {
  height: 65px;
  width: 65px;
  margin-bottom: 10px;
}

</style>