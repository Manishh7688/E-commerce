const { configureStore } = require("@reduxjs/toolkit");
import ProductReducer from './slices/ProductSlice'
import WishlistReducer from './slices/WishlistSlice'
import CartReducer from './slices/CartSlice'
import AddressReducer from './slices/AddressSlice'
import OrderReducer from './slices/OrderSlice'
import ProfileSlice from './slices/ProfileSlice'

export const store = configureStore({
  reducer: {
    product:ProductReducer,
    wishlist:WishlistReducer,
    cart:CartReducer,
    address:AddressReducer,
    order:OrderReducer,
    profile:ProfileSlice
  }
})