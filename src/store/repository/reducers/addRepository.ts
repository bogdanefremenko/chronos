import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { RepositoriesState } from '../types/repositoriesState';
import { initialRepositoryState } from '../types';

const addRepositoryReducer: CaseReducer<RepositoriesState, PayloadAction<string>> = (
  state,
  action,
) => {
  state.repositories[action.payload] = { ...initialRepositoryState };
};

export default addRepositoryReducer;
