import { configureStore } from '@reduxjs/toolkit';
import { createLogger } from 'redux-logger';
import { carsMapReducer } from './slices/carsMapSlice';
import { carsSettingsReducer } from './slices/carsSettingsSlice';
import { profileStoreReducer } from './slices/profileSlice';

const logger = createLogger({
  collapsed: true,
  duration: true
});

export const store = configureStore({
  reducer: {
    carsMap: carsMapReducer,
    carsSettings: carsSettingsReducer,
    profileStore: profileStoreReducer
  },
  devTools: process.env.NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => {
    const middleware = getDefaultMiddleware({
      serializableCheck: false,
    });

    if (process.env.NODE_ENV === 'development') {
      middleware.push(logger);
    }

    return middleware;
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
