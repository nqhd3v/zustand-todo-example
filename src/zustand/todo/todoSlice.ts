import { StateCreator } from 'zustand';

import { ToDo } from "@/types/todo"

export type TodoSlice = {
  doneIds: ToDo['id'][];
  undoneIds: ToDo['id'][];
  dictionary: Record<ToDo['id'], ToDo>;
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
    const { undoneIds, dictionary } = get();
    const newItem: ToDo = {
      id: Date.now().toString(),
      value,
      isDone: false,
      createdAt: new Date,
    };
    set({
      undoneIds: [...undoneIds, newItem.id],
      dictionary: {
        ...dictionary,
        [newItem.id]: newItem,
      }
    });
  },
  updateItemById: (id: string, value: string) => {
    const dictionary = get().dictionary;
    set({
      dictionary: {
        ...dictionary,
        [id]: {
          ...dictionary[id],
          value,
        }
      }
    })
  },
  markDoneItemById: (id: string) => {
    const { dictionary, doneIds, undoneIds } = get();
    const newDoneIds = [...Array.from(new Set([...doneIds, id]))];
    const newUndoneIds = undoneIds.filter(listId => listId !== id);

    set({
      undoneIds: newUndoneIds,
      doneIds: newDoneIds,
      dictionary: {
        ...dictionary,
        [id]: {
          ...dictionary[id],
          isDone: true,
        }
      }
    })
  },
  markUndoneItemById: (id: string) => {
    const { dictionary, doneIds, undoneIds } = get();
    const newDoneIds = doneIds.filter(listId => listId !== id);
    const newUndoneIds = [...Array.from(new Set([...undoneIds, id]))];

    set({
      doneIds: newDoneIds,
      undoneIds: newUndoneIds,
      dictionary: {
        ...dictionary,
        [id]: {
          ...dictionary[id],
          isDone: false,
        }
      }
    })
  },
  removeItemById: (id: string) => {
    const { dictionary, undoneIds, doneIds } = get();
    const newDoneIds = doneIds.filter(listId => listId !== id);
    const newUndoneIds = undoneIds.filter(listId => listId !== id);
    const newDic = { ...dictionary }
    delete newDic[id];
    set({
      doneIds: newDoneIds,
      undoneIds: newUndoneIds,
      dictionary: newDic,
    });
  }
})