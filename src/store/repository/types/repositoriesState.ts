import { initialRepositoryState, repositoryState } from '.';

interface RepositoriesState {
  selectedRepositoryPath: string | null;
  repositories: Record<string, repositoryState>;
}

const initialRepositoriesState: RepositoriesState = {
  selectedRepositoryPath: null,
  repositories: {
    '/Users/bohdan/Documents/Repos/test2drive': { ...initialRepositoryState },
    '/Users/bohdan/Documents/Repos/chronos': { ...initialRepositoryState },
    '/Users/bohdan/Documents/Repos/schooltoday': { ...initialRepositoryState },
    '/Users/bohdan/Documents/Repos/lkjhgnmjnhg': { ...initialRepositoryState },
  },
};

export { initialRepositoriesState };
export type { RepositoriesState };
