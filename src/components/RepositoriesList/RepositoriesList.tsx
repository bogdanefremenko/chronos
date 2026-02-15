import clsx from 'clsx';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../store';
import { setSelectedRepository } from '../../store/repositorySlice';
import Commit from '@shared/types/commit';
import { trpc } from '../../trpc';

function RepositoriesList({ setCommits }: { setCommits: (commits: readonly Commit[]) => void }) {
  const repositoryState = useSelector((state: RootState) => state.repository);
  const dispatch = useDispatch();

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

                const commits = await trpc.getGitHistory.query({ path: repository });
                setCommits(commits);
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
