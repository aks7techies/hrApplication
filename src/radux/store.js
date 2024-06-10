import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/UpdateStagesStepper';
import multistepFormReducer from './slices/MultistepSlice';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web


const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, counterReducer , multistepFormReducer);

export const store = configureStore({
  reducer: {
    counter: persistedReducer,
    multistepForm: persistedReducer,
  },
});

export const persistor = persistStore(store);
