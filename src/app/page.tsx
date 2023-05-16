'use client'
import AddNewTodo from '@/components/AddNew';
import TodoItem from '@/components/TodoItem';
import GithubIcon from '@/components/svgs/Github';
import { useAppStore } from '@/zustand/store';

export default function Home() {
  const { undoneIds, doneIds } = useAppStore(state => ({
    doneIds: state.doneIds,
    undoneIds: state.undoneIds,
  }));

  return (
    <main className="flex min-h-screen items-center justify-center bg-neutral-900">
      <div className="flex flex-col items-center">
        <div className="w-[500px] rounded-md shadow-md backdrop-blur-sm p-5 border border-white bg-white/10 mb-5">
          <AddNewTodo />
          
          <div className={undoneIds.length > 0 ? "mt-5" : ""}>
            {undoneIds.sort().map(id => <TodoItem id={id} key={`todo-${id}`} className='mb-2 last:mb-0' />)}
          </div>

          <div className={doneIds.length > 0 ? "mt-5" : ""}>
            {doneIds.sort().map(id => <TodoItem id={id} key={`todo-${id}`} className='mb-2 last:mb-0' />)}
          </div>
        </div>
        <div
          className="cursor-pointer rounded-md px-2 py-1 backdrop-blur-md bg-white/10 shadow-sm text-white text-sm flex items-center"
          onClick={() => window.open('https://github.com/nqhd3v/zustand-todo-example')}
        >
          <GithubIcon size={16} className='fill-white mr-1' />
          nqhd3v/zustand-todo-example
        </div>
      </div>
    </main>
  )
}
