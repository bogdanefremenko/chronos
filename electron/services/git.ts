import simpleGit, { LogOptions } from 'simple-git';
import Commit from '../../shared/types/commit';
import crypto from 'crypto';

export async function getCommits(
  repositoryPath: string,
  skip: number = 0,
  take?: number,
  allBranches: boolean = false,
): Promise<readonly Commit[]> {
  const git = simpleGit(repositoryPath);

  const format = {
    hash: '%H',
    message: '%s',
    author_name: '%an',
    author_email: '%ae',
    author_date: '%ad',
    committer_name: '%cn',
    committer_email: '%ce',
    committer_date: '%cd',
    parentHashes: '%p',
    refs: '%D',
  };

  const options: LogOptions<typeof format> = {
    format,
    maxCount: take,
    '--skip': skip,
    ...(allBranches ? { '--all': null } : {}),
  } as LogOptions<typeof format>;

  const log = await git.log(options);

  const processedCommits = log.all.map((element) => {
    const commit: Commit = {
      hash: element.hash,
      message: element.message,
      author_name: element.author_name,
      author_email: element.author_email,
      author_date: element.author_date,
      committer_name: element.committer_name,
      committer_email: element.committer_email,
      committer_date: element.committer_date,
      parentHashes: element.parentHashes.split(' '),
      refs: element.refs.split(', ').filter((ref) => ref),
    };

    commit.author_avatar_url = `https://www.gravatar.com/avatar/${crypto.createHash('md5').update(element.author_email.toLowerCase()).digest('hex')}?s=32&d=identicon`;
    commit.committer_avatar_url = `https://www.gravatar.com/avatar/${crypto.createHash('md5').update(element.committer_email.toLowerCase()).digest('hex')}?s=32&d=identicon`;

    return commit;
  });

  return processedCommits;
}

export async function getCommitsCount(repositoryPath: string): Promise<number> {
  const git = simpleGit(repositoryPath);
  const log = await git.raw(['rev-list', '--count', 'HEAD']);
  return parseInt(log.trim(), 10);
}
