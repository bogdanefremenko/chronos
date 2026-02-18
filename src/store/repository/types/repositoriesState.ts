import { repositoryState } from '.';

interface RepositoriesState {
  selectedRepositoryPath: string | null;
  repositories: Record<string, repositoryState>;
}

const initialRepositoriesState: RepositoriesState = {
  selectedRepositoryPath: null,
  repositories: {},
};

export { initialRepositoriesState };
export type { RepositoriesState };
