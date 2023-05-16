import { create } from 'zustand'
import { TodoSlice, createTodoSlice } from './todo/todoSlice'

type StoreState = TodoSlice;

export const useAppStore = create<StoreState>()((...a) => ({
  ...createTodoSlice(...a),
}));
