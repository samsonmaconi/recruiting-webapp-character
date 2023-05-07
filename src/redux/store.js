import { configureStore } from '@reduxjs/toolkit';
import characterCardsSlice from './slices/characterCardsSlice.js';

const store = configureStore({
  reducer: {
    characterCards: characterCardsSlice
  }
});

export default store;
