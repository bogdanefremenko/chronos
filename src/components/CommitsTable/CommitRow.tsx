import Commit from '@shared/types/commit';

interface CommitRowProps {
  commit: Commit;
}

function CommitRow({ commit }: CommitRowProps) {
  return (
    <tr className="hover:bg-bg-light transition-colors duration-30">
      <td className="truncate py-1" title={commit.message}>
        {commit.message}
      </td>
      <td className="flex items-center gap-2 truncate py-1 whitespace-nowrap">
        <img
          className="ml-2 h-4 w-4 rounded-full"
          src={commit.author_avatar_url}
          alt="Author avatar"
        />
        {commit.author_name}
      </td>
      <td className="truncate py-1 text-right whitespace-nowrap">
        {formatDate(commit.author_date)}
      </td>
      <td className="truncate py-1 text-right whitespace-nowrap">{commit.hash.slice(0, 7)}</td>
    </tr>
  );
}

function formatDate(dateString: string) {
  const date = new Date(dateString);

  const time = new Intl.DateTimeFormat('en', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: false,
  }).format(date);

  const prefix = getPrefix(date);

  return `${prefix} at ${time}`;
}

function getPrefix(date: Date) {
  const dateCopy = new Date(date);
  dateCopy.setHours(0, 0, 0, 0);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (dateCopy.getTime() === today.getTime()) {
    return 'Today';
  }

  if (dateCopy.getTime() === today.getTime() - 24 * 60 * 60 * 1000) {
    return 'Yesterday';
  }

  const month = new Intl.DateTimeFormat('en', { month: 'short' }).format(date);

  return `${date.getDate()} ${month} ${date.getFullYear()}`.trim();
}

export default CommitRow;
