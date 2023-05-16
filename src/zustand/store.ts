import { create } from 'zustand'
import { persist } from 'zustand/middleware'

import { TodoSlice, createTodoSlice } from './todo/todoSlice'

type StoreState = TodoSlice;

export const useAppStore = create<StoreState>()(
  persist(
    (...a) => ({
    ...createTodoSlice(...a),
    }),
    { name: 'todo-store' }
  )
);
