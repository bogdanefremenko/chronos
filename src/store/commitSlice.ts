import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import Commit from '@shared/types/commit';
import { trpc } from '../trpc';
import type { RootState } from './index';

export const commitsLoadingStatus = {
  idle: 'idle',
  loading: 'loading',
  loadingMore: 'loadingMore',
  succeeded: 'succeeded',
  failed: 'failed',
} as const;

type CommitsLoadingStatus = (typeof commitsLoadingStatus)[keyof typeof commitsLoadingStatus];

interface CommitsState {
  byRepository: Record<string, RepositoryCommitsState>;
}

interface RepositoryCommitsState {
  commits: Commit[];
  selectedCommitHash: string | null;
  commitsLoadingStatus: CommitsLoadingStatus;
  count: number;
  error: string | null;
}

const initialCommitsState: CommitsState = {
  byRepository: {},
};

const initialRepositoryCommitsState: RepositoryCommitsState = {
  commits: [],
  selectedCommitHash: null,
  commitsLoadingStatus: commitsLoadingStatus.idle,
  count: 0,
  error: null,
};

export const fetchInitialCommits = createAsyncThunk(
  'commits/fetchInitial',
  async ({ repositoryPath }: { repositoryPath: string }) => {
    const [response, commitsCount] = await Promise.all([
      trpc.getGitCommits.query({
        path: repositoryPath,
        skip: 0,
        maxCount: 50,
      }),
      trpc.getGitCommitsCount.query({ path: repositoryPath }),
    ]);
    return { commits: response, count: commitsCount, repositoryPath: repositoryPath };
  },
);

export const fetchMoreCommits = createAsyncThunk(
  'commits/fetchMore',
  async (
    { repositoryPath, pageSize }: { repositoryPath: string; pageSize: number },
    { getState },
  ) => {
    const state = getState() as RootState;
    const repositoryCommitsState =
      state.commits.byRepository[repositoryPath] || initialRepositoryCommitsState;
    const skip = repositoryCommitsState.commits.length;

    const response = await trpc.getGitCommits.query({
      path: repositoryPath,
      skip,
      maxCount: pageSize,
    });
    return { commits: response, repositoryPath: repositoryPath };
  },
  {
    condition: ({ repositoryPath }, { getState }) => {
      const state = getState() as RootState;
      const repositoryCommitsState = state.commits.byRepository[repositoryPath];
      return (
        repositoryCommitsState !== undefined &&
        repositoryCommitsState.commitsLoadingStatus !== commitsLoadingStatus.loadingMore &&
        repositoryCommitsState.commits.length < repositoryCommitsState.count
      );
    },
  },
);

const commitsSlice = createSlice({
  name: 'commits',
  initialState: initialCommitsState,
  reducers: {
    selectCommit: (state, action: { payload: { repositoryPath: string; commitHash: string } }) => {
      const { repositoryPath, commitHash } = action.payload;
      const repository = state.byRepository[repositoryPath];
      if (repository) {
        repository.selectedCommitHash = commitHash;
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchInitialCommits.pending, (state, action) => {
      const { repositoryPath } = action.meta.arg;
      state.byRepository[repositoryPath] = {
        ...initialRepositoryCommitsState,
        commitsLoadingStatus: commitsLoadingStatus.loading,
      };
    });
    builder.addCase(fetchInitialCommits.fulfilled, (state, action) => {
      const repository = state.byRepository[action.payload.repositoryPath]!;
      repository.commits = action.payload.commits as Commit[];
      repository.count = action.payload.count;
      repository.commitsLoadingStatus = commitsLoadingStatus.succeeded;
    });
    builder.addCase(fetchInitialCommits.rejected, (state, action) => {
      const repository = state.byRepository[action.meta.arg.repositoryPath]!;
      repository.commitsLoadingStatus = commitsLoadingStatus.failed;
      repository.error = action.error.message ?? 'Failed to load commits';
    });

    builder.addCase(fetchMoreCommits.pending, (state, action) => {
      const repository = state.byRepository[action.meta.arg.repositoryPath]!;
      repository.commitsLoadingStatus = commitsLoadingStatus.loadingMore;
    });
    builder.addCase(fetchMoreCommits.fulfilled, (state, action) => {
      const repository = state.byRepository[action.payload.repositoryPath]!;
      repository.commits.push(...(action.payload.commits as Commit[]));
      repository.commitsLoadingStatus = commitsLoadingStatus.succeeded;
    });
    builder.addCase(fetchMoreCommits.rejected, (state, action) => {
      const repository = state.byRepository[action.meta.arg.repositoryPath]!;
      repository.commitsLoadingStatus = commitsLoadingStatus.failed;
      repository.error = action.error.message ?? 'Failed to load more commits';
    });
  },
});

export const { selectCommit } = commitsSlice.actions;
export default commitsSlice.reducer;
