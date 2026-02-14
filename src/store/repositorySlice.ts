import { createSlice } from '@reduxjs/toolkit';

interface RepositoryState {
  repositories: string[];
  selectedRepository: string | null;
}

const initialState: RepositoryState = {
  repositories: [
    '/Users/bohdan/Documents/Repos/test2drive',
    '/Users/bohdan/Documents/Repos/chronos',
    '/Users/bohdan/Documents/Repos/schooltoday',
    '/Users/bohdan/Documents/Repos/lkjhgnmjnhg',
  ],
  selectedRepository: null,
};

const repositorySlice = createSlice({
  name: 'repository',
  initialState: initialState,
  reducers: {
    setSelectedRepository(state, action: { payload: string | null }) {
      state.selectedRepository = action.payload;
    },
    addRepository(state, action: { payload: string }) {
      state.repositories.push(action.payload);
    },
    removeRepository(state, action: { payload: string }) {
      state.repositories = state.repositories.filter((repo) => repo !== action.payload);
    },
  },
});

export const { setSelectedRepository, addRepository, removeRepository } = repositorySlice.actions;
export default repositorySlice.reducer;
