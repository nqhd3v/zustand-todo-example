import { useAppStore } from "@/zustand/store"
import React from "react"

const TodoItem: React.FC<{
  id: string;
  className?: string;
}> = ({ id, className = '' }) => {
  const {
    data,
    onMarkDone,
    onMarkUnDone,
    onRemove,
  } = useAppStore(state => ({
    data: state.dictionary[id],
    onMarkDone: () => state.markDoneItemById(id),
    onMarkUnDone: () => state.markUndoneItemById(id),
    onRemove: () => state.removeItemById(id),
  }));

  if (!data) {
    return null;
  }

  return (
    <div
      className={
        "w-full flex items-center justify-between border border-dashed rounded-sm p-2 " +
        (data.isDone ? "opacity-50 " : "") +
        className
      }
    >
      <div className={`w-[calc(100%-96px)] ${data.isDone ? 'line-through' : ''}`}>
        {data.value}
      </div>
      {data.isDone ? (
        <div
          className="w-10 h-10 flex items-center justify-center rounded-sm border border-yellow-500 cursor-pointer"
          onClick={() => onMarkUnDone()}
        >
          👎
        </div>
      ) : (
        <div
          className="w-10 h-10 flex items-center justify-center rounded-sm border border-blue-400 cursor-pointer"
          onClick={() => onMarkDone()}
        >
          👍
        </div>
      )}
      <div
        className="w-10 h-10 flex items-center justify-center rounded-sm border border-red-400 text-red-400 cursor-pointer"
        onClick={() => onRemove()}
      >
        ✘
      </div>
    </div>
  )
}

export default TodoItem;