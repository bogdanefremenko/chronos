import { useAppSelector } from '../../store/hooks';
import selectActiveRepository from '../../store/repository/selectors/activeRepository';

function CommitCard() {
  const activeRepository = useAppSelector(selectActiveRepository);
  if (!activeRepository || !activeRepository.selectedCommitHash) {
    return null;
  }

  const selectedCommit = activeRepository.commits[activeRepository.selectedCommitHash];

  return <div className="border-border bg-bg rounded-lg border p-4">{selectedCommit?.message}</div>;
}

export default CommitCard;
