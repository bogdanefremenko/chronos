interface Commit {
    hash: string;
    message: string;
    author_name: string;
    author_email: string;
    author_date: string;
    committer_name: string;
    committer_email: string;
    committer_date: string;

    author_avatar_url?: string;
    commiter_avatar_url?: string;
}

export default Commit