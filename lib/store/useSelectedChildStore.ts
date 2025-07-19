import { create } from 'zustand';
import { persist } from 'zustand/middleware';

type SelectedChild = {
  id: number;
  name: string;
  grade: number;
  profileImageId: number | null;
  parentId: number;
};

interface SelectedChildState {
  selectedChild: SelectedChild | null;
  setSelectedChild: (child: SelectedChild) => void;
  clearSelectedChild: () => void;
}

export const useSelectedChildStore = create(
  persist<SelectedChildState>(
    (set) => ({
      selectedChild: null,
      setSelectedChild: (child) => set({ selectedChild: child }),
      clearSelectedChild: () => set({ selectedChild: null }),
    }),
    {
      name: 'selected-child',
    }
  )
);
