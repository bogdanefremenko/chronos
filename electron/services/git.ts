import simpleGit from 'simple-git';
import Commit from '../../shared/types/commit';
import crypto from 'crypto';

export async function getCommits(repositoryPath: string): Promise<readonly Commit[]> {
  const git = simpleGit(repositoryPath);

  const log = await git.log<Commit>({
    format: {
      hash: '%h',
      message: '%s',
      author_name: '%an',
      author_email: '%ae',
      author_date: '%ad',
      committer_name: '%cn',
      committer_email: '%ce',
      committer_date: '%cd',
    },
  });

  log.all.forEach((element) => {
    element.author_avatar_url = `https://www.gravatar.com/avatar/${crypto.createHash('md5').update(element.author_email.toLowerCase()).digest('hex')}?s=32&d=identicon`;
    element.commiter_avatar_url = `https://www.gravatar.com/avatar/${crypto.createHash('md5').update(element.committer_email.toLowerCase()).digest('hex')}?s=32&d=identicon`;
  });

  return log.all;
}
