import { createSlice } from '@reduxjs/toolkit';
import { initialRepositoriesState } from './types';
import {
  addRepositoryReducer,
  removeRepositoryReducer,
  selectCommitInActiveRepositoryReducer,
  selectRepositoryReducer,
} from './reducers';
import { addinitialCommitsLoadThunkCases } from './thunks/initialCommitsLoad';

const repositories = createSlice({
  name: 'repositories',
  initialState: initialRepositoriesState,
  reducers: {
    selectRepository: selectRepositoryReducer,
    addRepository: addRepositoryReducer,
    removeRepository: removeRepositoryReducer,
    selectCommitInActiveRepository: selectCommitInActiveRepositoryReducer,
  },
  extraReducers: (builder) => {
    addinitialCommitsLoadThunkCases(builder);
  },
});

export const { selectRepository, addRepository, removeRepository, selectCommitInActiveRepository } =
  repositories.actions;
export default repositories.reducer;
