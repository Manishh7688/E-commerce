const {createSlice} = require('@reduxjs/toolkit');

const CartSlice = createSlice({
  name: 'cart',
  initialState: {
    data: [],
  },
  reducers: {
    addItemToCart(state, action) {
      let tempData = state.data;
      let isItemExist = false;
      tempData.map(item => {
        if (action.payload.id === item.id) {
          isItemExist = true;
          item.qty += 1;
        }
      });
      if (!isItemExist) {
        tempData.push(action.payload);
      }
      state.data = tempData;
    },
    reduceItemFromCart(state, action) {
      let tempData = state.data;
      let isItemExist = false;
      tempData.map(item => {
        if (action.payload.id === item.id) {
          item.qty -= 1;
        }
      });
      state.data = tempData;
    },
    removeItemFromCart(state, action) {
      let tempData = state.data;
      tempData.splice(action.payload, 1);
      state.data = tempData;
    },
    emptyCart(state, action) {
      state.data = action.payload;
    },
  },
});

export const {addItemToCart} = CartSlice.actions;
export const {removeItemFromCart} = CartSlice.actions;
export const {reduceItemFromCart} = CartSlice.actions;
export const {emptyCart} = CartSlice.actions;
export default CartSlice.reducer;
