import { configureStore } from '@reduxjs/toolkit'
import counterReducer from './slices/UpdateStagesStepper';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
})