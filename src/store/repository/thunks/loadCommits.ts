import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { trpc } from '../../../trpc';
import { RepositoriesState } from '../types/repositoriesState';
import { initialRepositoryState } from '../types';
import { commitsLoadingStatus } from '../../enums';
import Commit from '@shared/types/commit';

const loadCommitsThunk = createAsyncThunk(
  'repository/loadCommits',
  async ({ repositoryPath }: { repositoryPath: string }) => {
    const commits = await trpc.getGitCommits.query({
      repositoryPath: repositoryPath,
    });

    return commits;
  },
);

const addLoadCommitsThunkCases = (builder: ActionReducerMapBuilder<RepositoriesState>) => {
  builder.addCase(loadCommitsThunk.pending, (state, action) => {
    const { repositoryPath } = action.meta.arg;
    state.repositories[repositoryPath] = {
      ...initialRepositoryState,
      commitsLoadingStatus: commitsLoadingStatus.loading,
    };
  });

  builder.addCase(loadCommitsThunk.fulfilled, (state, action) => {
    const commits = action.payload;
    const { repositoryPath } = action.meta.arg;
    const repository = state.repositories[repositoryPath];
    if (!repository) {
      throw Error();
    }

    const commitsRecord = commits.reduce<Record<string, Commit>>((commits, commit) => {
      commits[commit.hash] = commit;
      return commits;
    }, {});

    repository.commits = commitsRecord;
    repository.commitsLoadingStatus = commitsLoadingStatus.succeeded;
  });

  builder.addCase(loadCommitsThunk.rejected, (state, action) => {
    const { repositoryPath } = action.meta.arg;
    const repository = state.repositories[repositoryPath];
    if (!repository) {
      throw Error();
    }

    repository.commitsLoadingStatus = commitsLoadingStatus.failed;
  });
};

export { addLoadCommitsThunkCases };
export default loadCommitsThunk;
