import FolderIcon from '@heroicons/react/24/outline/FolderIcon';
import Commit from '@shared/types/commit';
import RepositoriesTable from '../RepositoriesList';
import { useState, useEffect, useRef } from 'react';

function RepositoryDropdown({ setCommits }: { setCommits: (commits: readonly Commit[]) => void }) {
  const [showRepositories, setShowRepositories] = useState(false);
  const dropdownDivRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setShowRepositories(false);
        document.activeElement instanceof HTMLElement && document.activeElement.blur();
      }
    };

    const onClickOutside = (event: MouseEvent) => {
      if (dropdownDivRef.current && !dropdownDivRef.current.contains(event.target as Node)) {
        setShowRepositories(false);
      }
    };

    if (showRepositories) {
      document.addEventListener('keydown', onEscape);
      document.addEventListener('mousedown', onClickOutside);
    }

    return () => {
      document.removeEventListener('keydown', onEscape);
      document.removeEventListener('mousedown', onClickOutside);
    };
  }, [showRepositories]);

  return (
    <div className="relative" ref={dropdownDivRef}>
      <button
        className="bg-bg hover:bg-bg-light border-border rounded-lg border px-4 py-2 transition-colors duration-200"
        onClick={() => setShowRepositories(!showRepositories)}
      >
        <FolderIcon className="h-5 w-5" />
      </button>
      {showRepositories && (
        <div className="absolute mt-2 min-h-120 w-60">
          <RepositoriesTable setCommits={setCommits} />
        </div>
      )}
    </div>
  );
}

export default RepositoryDropdown;
