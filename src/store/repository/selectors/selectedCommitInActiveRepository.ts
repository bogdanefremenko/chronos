import { RootState } from '../..';
import selectActiveRepository from './activeRepository';

const selectSelectedCommitInActiveRepository = (state: RootState) => {
  const activeRepository = selectActiveRepository(state);
  if (!activeRepository || !activeRepository.selectedCommitHash) {
    return null;
  }

  return activeRepository.commits[activeRepository.selectedCommitHash] ?? null;
};

export default selectSelectedCommitInActiveRepository;
