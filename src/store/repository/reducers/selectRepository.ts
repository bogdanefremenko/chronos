import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { RepositoriesState } from '../types/repositoriesState';

const selectRepositoryReducer: CaseReducer<RepositoriesState, PayloadAction<string | null>> = (
  state,
  action,
) => {
  state.selectedRepositoryPath = action.payload;
};

export default selectRepositoryReducer;
