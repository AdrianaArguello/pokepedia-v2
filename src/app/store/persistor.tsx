import { configureStore } from '@reduxjs/toolkit';
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import pokemonReducer from './pokemonSlice';
const persistConfig = {
  key: 'root',
  storage,
};

const persistedReducer = persistReducer(persistConfig, pokemonReducer);

export const store = configureStore({
  reducer: persistedReducer,
});

export const persistor = persistStore(store);
