import { createSlice } from '@reduxjs/toolkit';
import { initialRepositoriesState } from './types';
import {
  addRepositoryReducer,
  removeRepositoryReducer,
  selectCommitInActiveRepositoryReducer,
  selectRepositoryReducer,
} from './reducers';

const repositories = createSlice({
  name: 'repositories',
  initialState: initialRepositoriesState,
  reducers: {
    selectRepository: selectRepositoryReducer,
    addRepository: addRepositoryReducer,
    removeRepository: removeRepositoryReducer,
    selectCommitInActiveRepository: selectCommitInActiveRepositoryReducer,
  },
});

export default repositories.reducer;
