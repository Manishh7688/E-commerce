const { createSlice } = require("@reduxjs/toolkit");

export const AddressSlice = createSlice({
    name: "address",
    initialState:{
        data:[],
    },
    reducers:{
        addAddress(state, action){   
            state.data.push(action.payload)
        },
        deleteAddress(state, action){
            let newArr = state.data.filter(item=>{
                return  item.id !== action.payload
            })
             state.data = newArr
        },
        updateAddress(state, action){
            let temp = state.data
            temp.map(item=>{
               if (item.id === action.payload.id) {
                item.state = action.payload.state
                item.city = action.payload.city
                item.pin = action.payload.pin
                item.type = action.payload.type
               }
            })
            state.data = temp
        }
    }
})

export const {addAddress} = AddressSlice.actions
export const {deleteAddress} = AddressSlice.actions
export const {updateAddress} = AddressSlice.actions
export default AddressSlice.reducer