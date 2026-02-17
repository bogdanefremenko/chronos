import { configureStore } from '@reduxjs/toolkit';
import repositoryReducer from './repositorySlice';
import commitsReducer from './commitSlice';

const store = configureStore({
  reducer: {
    repository: repositoryReducer,
    commits: commitsReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
