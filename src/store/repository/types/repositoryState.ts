import type Commit from '@shared/types/commit';

interface RepositoryState {
  commits: Commit[];
  selectedCommitHash: string | null;
}

const initialRepositoryState: RepositoryState = {
  commits: [],
  selectedCommitHash: null,
};

export { initialRepositoryState };
export type { RepositoryState };
