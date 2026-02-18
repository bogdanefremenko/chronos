import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { RepositoriesState } from '../types/repositoriesState';

const removeRepositoryReducer: CaseReducer<RepositoriesState, PayloadAction<string>> = (
  state,
  action,
) => {
  delete state.repositories[action.payload];
};

export default removeRepositoryReducer;
