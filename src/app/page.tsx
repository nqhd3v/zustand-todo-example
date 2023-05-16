'use client'
import AddNewTodo from '@/components/AddNew';
import TodoItem from '@/components/TodoItem';
import { useAppStore } from '@/zustand/store';

export default function Home() {
  const { undoneIds, doneIds } = useAppStore(state => ({
    doneIds: state.doneIds,
    undoneIds: state.undoneIds,
  }));

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-900">
      <div className="w-[500px] rounded-md shadow-md backdrop-blur-sm p-5 border border-white bg-white/10">
        <AddNewTodo />
        
        <div className={undoneIds.length > 0 ? "mt-5" : ""}>
          {undoneIds.sort().map(id => <TodoItem id={id} key={`todo-${id}`} className='mb-2 last:mb-0' />)}
        </div>

        <div className={doneIds.length > 0 ? "mt-5" : ""}>
          {doneIds.sort().map(id => <TodoItem id={id} key={`todo-${id}`} className='mb-2 last:mb-0' />)}
        </div>
      </div>
    </main>
  )
}
