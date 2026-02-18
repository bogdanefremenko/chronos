import { CaseReducer, PayloadAction } from '@reduxjs/toolkit';
import { RepositoriesState } from '../types/repositoriesState';

const selectCommitInActiveRepositoryReducer: CaseReducer<
  RepositoriesState,
  PayloadAction<string>
> = (state, action) => {
  const activeRepository = state.selectedRepositoryPath
    ? state.repositories[state.selectedRepositoryPath]
    : null;
  if (!activeRepository) {
    return;
  }

  activeRepository.selectedCommitHash = action.payload;
};

export default selectCommitInActiveRepositoryReducer;
