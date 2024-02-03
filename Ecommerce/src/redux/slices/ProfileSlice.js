
import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'Manish',
  email: 'mansih@gmial.com',
};

const ProfileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    editProfile: (state, action) => {
      const { name, email } = action.payload;
      state.name = name;
      state.email = email;
    },
  },
});

export const { editProfile } = ProfileSlice.actions;
export default ProfileSlice.reducer;
