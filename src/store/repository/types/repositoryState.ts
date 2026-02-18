import type Commit from '@shared/types/commit';

interface RepositoryState {
  commits: Commit[];
  path: string;
  selectedCommitHash: string | null;
}

const initialRepositoryState: RepositoryState = {
  commits: [],
  path: '',
  selectedCommitHash: null,
};

export { initialRepositoryState };
export type { RepositoryState };
