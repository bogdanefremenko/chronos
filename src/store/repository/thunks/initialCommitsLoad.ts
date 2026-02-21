import { ActionReducerMapBuilder, createAsyncThunk } from '@reduxjs/toolkit';
import { trpc } from '../../../trpc';
import { RepositoriesState } from '../types/repositoriesState';
import { initialRepositoryState } from '../types';
import { commitsLoadingStatus } from '../../enums';
import Commit from '@shared/types/commit';

const initialCommitsLoadThunk = createAsyncThunk(
  'repository/initialCommitsLoad',
  async ({ repositoryPath }: { repositoryPath: string }) => {
    const commits = await trpc.getGitCommits.query({
      repositoryPath: repositoryPath,
    });

    return commits;
  },
);

const addinitialCommitsLoadThunkCases = (builder: ActionReducerMapBuilder<RepositoriesState>) => {
  builder.addCase(initialCommitsLoadThunk.pending, (state, action) => {
    const { repositoryPath } = action.meta.arg;
    state.repositories[repositoryPath] = {
      ...initialRepositoryState,
      commitsLoadingStatus: commitsLoadingStatus.loading,
    };
  });

  builder.addCase(initialCommitsLoadThunk.fulfilled, (state, action) => {
    const commits = action.payload;
    const { repositoryPath } = action.meta.arg;
    const repository = state.repositories[repositoryPath];
    if (!repository) {
      throw Error();
    }

    repository;

    const commitsRecord = commits.reduce<Record<string, Commit>>((commits, commit) => {
      commits[commit.hash] = commit;
      return commits;
    }, {});

    repository.commits = commitsRecord;
  });
};

export { addinitialCommitsLoadThunkCases };
export default initialCommitsLoadThunk;
