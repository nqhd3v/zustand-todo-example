import { StateCreator, create } from 'zustand';

import { ToDo } from "@/types/todo"
import { produce } from 'immer';
import { immer } from 'zustand/middleware/immer';
import { devtools, persist } from 'zustand/middleware';

export type TodoStates = {
  doneIds: ToDo['id'][];
  undoneIds: ToDo['id'][];
  dictionary: Record<ToDo['id'], ToDo>;
}
export type TodoSlice = TodoStates & {
  addNewItem: (value: string) => void;
  updateItemById: (id: string, value: string) => void;
  markDoneItemById: (id: string) => void;
  markUndoneItemById: (id: string) => void;
  removeItemById: (id: string) => void;
}

export const createTodoSlice: StateCreator<TodoSlice> = (set, get) => ({
  doneIds: [],
  undoneIds: [],
  dictionary: {},
  addNewItem: (value: string) => {
    const newItem: ToDo = {
      id: Date.now().toString(),
      value,
      isDone: false,
      createdAt: new Date,
    };

    set(produce((state: TodoStates) => {
      state.undoneIds.push(newItem.id);
      state.dictionary[newItem.id] = newItem;
    }));
  },
  updateItemById: (id: string, value: string) => {
    set(produce((state: TodoStates) => {
      state.dictionary[id].value = value;
    }));
  },
  markDoneItemById: (id: string) => {
    const { doneIds, undoneIds } = get();
    const newDoneIds = [...Array.from(new Set([...doneIds, id]))].sort();
    const newUndoneIds = undoneIds.filter(listId => listId !== id);

    set(produce((state: TodoStates) => {
      state.undoneIds = newUndoneIds;
      state.doneIds = newDoneIds;
      state.dictionary[id].isDone = true;
    }));
  },
  markUndoneItemById: (id: string) => {
    const { doneIds, undoneIds } = get();
    const newDoneIds = doneIds.filter(listId => listId !== id);
    const newUndoneIds = [...Array.from(new Set([...undoneIds, id]))].sort();

    set(produce((state: TodoStates) => {
      state.doneIds = newDoneIds;
      state.undoneIds = newUndoneIds;
      state.dictionary[id].isDone = false;
    }));
  },
  removeItemById: (id: string) => {
    const { undoneIds, doneIds } = get();
    const newDoneIds = doneIds.filter(listId => listId !== id);
    const newUndoneIds = undoneIds.filter(listId => listId !== id);

    set(produce((state: TodoStates) => {
      state.doneIds = newDoneIds;
      state.undoneIds = newUndoneIds;
      delete state.dictionary[id];
    }));
  }
})

export const useTodoStore = create<TodoSlice>()(
  immer(devtools(persist(
    (...a) => ({
      ...createTodoSlice(...a),
    }),
    {
      name: 'todo-store',
      // storage: createJSONStorage(() => localStorage), 
    }
  )))
);