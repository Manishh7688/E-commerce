const { createSlice } = require("@reduxjs/toolkit");

const WishlisttSlice = createSlice({
    name: "wishlist",
    initialState:{
        data:[],
    },
    reducers:{
        addItemToWishlist(state, action){
            let tempData = state.data
            tempData.push(action.payload)
            state.data=tempData
        }
    }
})

export const {addItemToWishlist} = WishlisttSlice.actions
export default WishlisttSlice.reducer