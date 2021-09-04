export default {
  addCart1(context,payload){
    //1.查找之前是否有该商品
    let oldProduct = context.state.cartList.find(item => item.iid === payload.iid)

    //2.判断是否存在该商品
    if(oldProduct){
      // oldProduct.count += 1;
      context.commit("addCounter",oldProduct)
    }else {
      payload.count = 1;
      // state.cartList.push(payload)
      context.commit("AddToCart",payload)
    }
  }
}