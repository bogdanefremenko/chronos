import clsx from 'clsx';
import { RootState } from '../../store';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { selectRepository } from '../../store/repository/slice';

function RepositoriesList() {
  const repositories = useAppSelector((state: RootState) => state.repositories);
  const dispatch = useAppDispatch();

  return (
    <div className="border-border shadow-glow bg-bg rounded-lg border p-2">
      <ul className="w-full">
        {Object.entries(repositories.repositories).map(([path]) => (
          <li key={path}>
            <button
              className={clsx(
                'hover:bg-bg-light hover:text-primary w-full cursor-pointer rounded-md px-3 py-1 text-left transition-colors duration-150',
                repositories.selectedRepositoryPath === path && 'text-primary',
              )}
              title={path}
              onClick={async () => {
                dispatch(selectRepository(path));
              }}
            >
              {path.split('/').pop()}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default RepositoriesList;
