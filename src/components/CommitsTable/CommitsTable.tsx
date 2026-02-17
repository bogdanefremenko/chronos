import { useEffect, useRef } from 'react';
import useCommitsLoader from '../../hooks/useCommitsLoader';
import CommitRow from './CommitRow';

function CommitsTable() {
  const { commits, loadMore } = useCommitsLoader();
  const endSensor = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!endSensor.current) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          loadMore();
        }
      },
      { threshold: 1 },
    );
    observer.observe(endSensor.current);
    return () => observer.disconnect();
  }, [loadMore]);

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
      <div ref={endSensor} className="h-1 w-full"></div>
    </div>
  );
}

export default CommitsTable;
