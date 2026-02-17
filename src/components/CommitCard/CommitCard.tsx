import { useAppSelector } from '../../store/hooks';

function CommitCard() {
  const selectedCommit = useAppSelector((state) => {
    const selectedRepository = state.repository.selectedRepository;
    if (selectedRepository) {
      const hash = state.commits.byRepository[selectedRepository]?.selectedCommitHash ?? undefined;
      if (hash) {
        return state.commits.byRepository[selectedRepository]?.commits.find((c) => c.hash === hash);
      }
    }
    return undefined;
  });

  return <div className="border-border bg-bg rounded-lg border p-4">{selectedCommit?.message}</div>;
}

export default CommitCard;
