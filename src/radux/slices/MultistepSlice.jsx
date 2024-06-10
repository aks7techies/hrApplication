// src/slices/multistepFormSlice.js

import { createSlice } from '@reduxjs/toolkit';
const initialState = {
    step1: {
      firstName: '',
      middleName: '',
      lastName: '',
      dob: null,
      fatherName: '',
      gender: '',
      state: '',
      city: '',
      district: '',
      pincode: '',
      email: '',
      mobileNo: '',
      communicationAddress: ''
    }
    // Other steps...
  };
  
  const multistepSlice = createSlice({
    name: 'multistepForm',
    initialState,
    reducers: {
      updateStep1: (state, action) => {
        state.step1 = { ...state.step1, ...action.payload };
      },
      // Other reducers...
    },
  });
  
  export const { updateStep1 } = multistepSlice.actions;
  
  export default multistepSlice.reducer;
  