import { create } from 'zustand'
import { persist, devtools, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { TodoSlice, createTodoSlice } from './todo/todoSlice'

type StoreState = TodoSlice;

export const useAppStore = create<StoreState>()(
  immer(devtools(persist(
    (...a) => ({
    ...createTodoSlice(...a),
    }),
    {
      name: 'todo-store',
      storage: createJSONStorage(() => sessionStorage),
      skipHydration: true,
    }
  )))
);
