import Commit from '@shared/types/commit';

const CommitCard = ({ commit }: { commit: Commit }) => {
  return <div className="border-border bg-bg rounded-lg border p-4">{commit.message}</div>;
};

export default CommitCard;
