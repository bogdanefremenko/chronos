import clsx from 'clsx';
import { RootState } from '../../store';
import { setSelectedRepository } from '../../store/repositorySlice';
import { useAppDispatch, useAppSelector } from '../../store/hooks';

function RepositoriesList() {
  const repositoryState = useAppSelector((state: RootState) => state.repository);
  const dispatch = useAppDispatch();

  return (
    <div className="border-border shadow-glow bg-bg rounded-lg border p-2">
      <ul className="w-full">
        {repositoryState.repositories.map((repository) => (
          <li key={repository}>
            <button
              className={clsx(
                'hover:bg-bg-light hover:text-primary w-full cursor-pointer rounded-md px-3 py-1 text-left transition-colors duration-150',
                repositoryState.selectedRepository === repository && 'text-primary',
              )}
              title={repository}
              onClick={async () => {
                dispatch(setSelectedRepository(repository));
              }}
            >
              {repository.split('/').pop()}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RepositoriesList;
