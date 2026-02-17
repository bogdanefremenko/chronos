import { useEffect, useRef } from 'react';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { commitsLoadingStatus, fetchInitialCommits, fetchMoreCommits } from '../store/commitSlice';

const useCommitsLoader = () => {
  const repositoryPath = useAppSelector((state) => state.repository.selectedRepository);

  const secondStageFinished = useRef(false);
  const repository = useAppSelector((state) =>
    repositoryPath ? state.commits.byRepository[repositoryPath] : undefined,
  );
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!repositoryPath) {
      return;
    }

    dispatch(fetchInitialCommits({ repositoryPath }));
    secondStageFinished.current = false;
  }, [repositoryPath, dispatch]);

  useEffect(() => {
    if (!repositoryPath) {
      return;
    }

    if (
      repository?.commitsLoadingStatus === commitsLoadingStatus.succeeded &&
      !secondStageFinished.current
    ) {
      dispatch(fetchMoreCommits({ repositoryPath, pageSize: 200 }));
      secondStageFinished.current = true;
    }
  }, [dispatch, repository?.commitsLoadingStatus, repositoryPath]);

  const loadMore = () => {
    if (!repositoryPath) {
      return;
    }

    dispatch(fetchMoreCommits({ repositoryPath, pageSize: 100 }));
  };

  return {
    commits: repository?.commits || [],
    loadingStatus: repository?.commitsLoadingStatus || commitsLoadingStatus.idle,
    hasMore: repository ? repository.commits.length < repository.count : false,
    loadMore,
  };
};

export default useCommitsLoader;
