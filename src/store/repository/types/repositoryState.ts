import type Commit from '@shared/types/commit';
import { commitsLoadingStatus, CommitsLoadingStatus } from '../../enums';

interface RepositoryState {
  commits: Record<string, Commit>;
  selectedCommitHash: string | null;
  commitsLoadingStatus: CommitsLoadingStatus;
}

const initialRepositoryState: RepositoryState = {
  commits: {},
  selectedCommitHash: null,
  commitsLoadingStatus: commitsLoadingStatus.idle,
};

export { initialRepositoryState };
export type { RepositoryState };
