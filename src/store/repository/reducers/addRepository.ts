import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { RepositoriesState } from '../types/repositoriesState';

const addRepositoryReducer: CaseReducer<RepositoriesState, PayloadAction<string>> = (
  state,
  action,
) => {
  state.repositories[action.payload] = {
    commits: {},
    selectedCommitHash: null,
  };
};

export default addRepositoryReducer;
