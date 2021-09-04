export default {
  addCounter(state,payload){
    payload.count++;
  },
  AddToCart(state,payload){
    state.cartList.push(payload);
    payload.checked = false;
  },
  changeCheck(state,payload){
    payload.isCheck = !payload.isCheck
  },

}