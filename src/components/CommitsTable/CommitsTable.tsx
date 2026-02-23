import CommitRow from './CommitRow';
import useAppSelector from '../../store/hooks/useAppSelector';
import selectActiveRepository from '../../store/repository/selectors/activeRepository';

function CommitsTable() {
  const selectedRepository = useAppSelector(selectActiveRepository);
  const commits = selectedRepository?.commits;

  return (
    <div className="border-border shadow-glow bg-bg rounded-lg border p-2">
      {!commits || commits.size === 0 ? (
        <div className="text-text-secondary py-4 text-center">No commits to display</div>
      ) : (
        <table className="w-full min-w-0 table-fixed">
          <colgroup>
            <col className="" />
            <col className="w-1/6" />
            <col className="w-1/6" />
            <col className="w-1/12" />
          </colgroup>
          <tbody className="divide-border divide-y">
            {[...commits.entries()].map(([hash, commit]) => (
              <CommitRow key={hash} commit={commit} />
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default CommitsTable;
