import { create } from 'zustand';

interface LoadingState {
  isDataLoading: boolean;
  setDataLoading: (loading: boolean) => void;
}

export const useLoadingStore = create<LoadingState>((set) => ({
  isDataLoading: false,
  setDataLoading: (loading: boolean) => set({ isDataLoading: loading }),
}));
