'use client'

import { useStore } from "@/zustand/store";
import { useTodoStore } from "@/zustand/todoSlice";
import React, { useState } from "react"

const AddNewTodo: React.FC<{ className?: string }> = ({ className = '' }) => {
  const [newValue, setNewValue] = useState<string>('');
  const todoStates = useStore(useTodoStore, state => ({
    onAdd: (v: string) => state.addNewItem(v),
  }));
  const { onAdd } = todoStates || { onAdd: () => null };

  const handleAddNew = () => {
    if (!newValue || newValue.trim() === '') {
      setNewValue('');
      return;
    }
    onAdd?.(newValue.trim());
    setNewValue('');
  }

  return (
    <div className={
      "relative flex items-center justify-between p-2 rounded-sm border border-gray-500 duration-300 " +
      "after:absolute after:bg-gray-500 after:bottom-2 after:left-2 after:h-0.5 after:w-[calc(100%-64px)] focus-within:border-white focus-within:after:h-1 focus-within:after:bg-white after:duration-300 " +
      className
    }>
      <input
        type="text"
        className="peer border-0 py-2 bg-transparent text-gray-600 focus:text-white font-bold focus:outline-none w-[calc(100%-48px)]"
        value={newValue}
        onChange={({ target }) => setNewValue(target.value)}
      />
      <div
        className={
          "w-10 h-10 rounded-sm flex justify-center items-center border border-gray-500 text-gray-500 cursor-pointer duration-300 " +
          "peer-focus:border-white peer-focus:text-white"
        }
        onClick={handleAddNew}
      >
        ✔
      </div>
    </div>
  )
}

export default AddNewTodo