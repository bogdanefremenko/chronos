import type Commit from '@shared/types/commit';
import { commitsLoadingStatus, CommitsLoadingStatus } from '../../enums';

interface RepositoryState {
  commits: Map<string, Commit>;
  selectedCommitHash: string | null;
  commitsLoadingStatus: CommitsLoadingStatus;
}

const initialRepositoryState: RepositoryState = {
  commits: new Map<string, Commit>(),
  selectedCommitHash: null,
  commitsLoadingStatus: commitsLoadingStatus.idle,
};

export { initialRepositoryState };
export type { RepositoryState };
