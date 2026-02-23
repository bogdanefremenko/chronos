import { useCallback, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { loadCommitsThunk } from '../store/repository/thunks';

const useCommitsSync = () => {
  const dispatch = useAppDispatch();
  const activeRepositoryPath = useAppSelector((state) => state.repositories.selectedRepositoryPath);

  const updateCommitsIfNeeded = useCallback(() => {
    if (!activeRepositoryPath) {
      return;
    }
    dispatch(loadCommitsThunk({ repositoryPath: activeRepositoryPath }));
  }, [activeRepositoryPath, dispatch]);

  useEffect(() => {
    updateCommitsIfNeeded();
  }, [updateCommitsIfNeeded]);

  const refresh = () => updateCommitsIfNeeded();

  return { refresh };
};

export default useCommitsSync;
