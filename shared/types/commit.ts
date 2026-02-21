interface Commit {
  hash: string;
  message: string;
  author_name: string;
  author_email: string;
  author_date: string;
  committer_name: string;
  committer_email: string;
  committer_date: string;
  parentHashes: string[];
  refs: string[];

  author_avatar_url?: string;
  committer_avatar_url?: string;
}

export default Commit;
