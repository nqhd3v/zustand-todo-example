import { create } from 'zustand'
import { persist, devtools, createJSONStorage } from 'zustand/middleware'
import { immer } from 'zustand/middleware/immer'

import { TodoSlice, createTodoSlice } from './todo/todoSlice'
import { useEffect, useState } from 'react';

type StoreState = TodoSlice;

export const useAppStore = create<StoreState>()(
  immer(devtools(persist(
    (...a) => ({
    ...createTodoSlice(...a),
    }),
    {
      name: 'todo-store',
      storage: createJSONStorage(() => localStorage), 
    }
  )))
);

export const useStore = <T, F>(
  store: (callback: (state: T) => unknown) => unknown,
  callback: (state: T) => F
) => {
  const result = store(callback) as F
  const [data, setData] = useState<F>()

  useEffect(() => {
    setData(result)
  }, [JSON.stringify(result)])

  return data
}
