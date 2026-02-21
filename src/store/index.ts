import { configureStore } from '@reduxjs/toolkit';
import repositories from './repository/slice';

const store = configureStore({
  reducer: {
    repositories: repositories,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
