import CommitRow from './CommitRow';
import type Commit from '@shared/types/commit';

interface CommitsTableProps {
  commits: readonly Commit[];
}

function CommitsTable({ commits }: CommitsTableProps) {
  return (
    <div className="border-border shadow-glow bg-bg rounded-lg border p-2">
      {commits.length === 0 && (
        <div className="text-text-secondary py-4 text-center">No commits to display</div>
      )}
      <table className="w-full min-w-0 table-fixed">
        <colgroup>
          <col className="" />
          <col className="w-1/6" />
          <col className="w-1/6" />
          <col className="w-1/12" />
        </colgroup>
        <tbody className="divide-border divide-y">
          {commits.map((commit) => (
            <CommitRow key={commit.hash} commit={commit} />
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default CommitsTable;
