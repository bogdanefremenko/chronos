import { RootState } from '../..';

const selectActiveRepository = (state: RootState) => {
  const repositoryPath = state.repositories.selectedRepositoryPath;
  if (!repositoryPath) {
    return null;
  }

  return state.repositories.repositories[repositoryPath] ?? null;
};

export default selectActiveRepository;
