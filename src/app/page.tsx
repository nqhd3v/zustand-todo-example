'use client'
import AddNewTodo from '@/components/AddNew';
import TodoItem from '@/components/TodoItem';
import GithubIcon from '@/components/svgs/Github';
import { THEMES } from '@/types/theme';
import { useStore } from '@/zustand/store';
import { setTheme, useThemeStore } from '@/zustand/themeSlice';
import { useTodoStore } from '@/zustand/todoSlice';

export default function Home() {
  const currentTheme = useStore(useThemeStore, state => state.currentTheme);
  const todoStates = useStore(useTodoStore, state => ({
    doneIds: state.doneIds,
    undoneIds: state.undoneIds,
  }));
  const { undoneIds, doneIds } = todoStates || { doneIds: [], undoneIds: [] };

  return (
    <main
      className={
        "flex min-h-screen items-center justify-center " +
        `theme-${currentTheme}`
      }
    >
      <div className="flex flex-col items-center">
        <div className="w-[500px] rounded-md shadow-md backdrop-blur-sm p-5 border border-white bg-white/10 mb-5">
          <AddNewTodo />
          
          <div className={undoneIds.length > 0 ? "mt-5" : ""}>
            {undoneIds.map(id => <TodoItem id={id} key={`todo-${id}`} className='mb-2 last:mb-0' />)}
          </div>

          <div className={doneIds.length > 0 ? "mt-5" : ""}>
            {doneIds.map(id => <TodoItem id={id} key={`todo-${id}`} className='mb-2 last:mb-0' />)}
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
      <div className="fixed w-full flex justify-between items-center right-0 left-0 bottom-2 px-2">
        <div className="text-sm text-gray-400">Powered by <a href="https://nqhuy.dev" target="_blank" className='font-bold underline'>nqhuy</a></div>
        <div className="flex p-2 rounded-md backdrop-blue-sm bg-white/10">
          {THEMES.map(t => (
            <div
              className={
                "cursor-pointer w-8 h-8 mr-2 last:mr-0 rounded-sm border border-1 border-gray-400 " +
                `theme-${t} ` + 
                (t === currentTheme ? 'theme-selected ' : '')
              }
              onClick={() => t === currentTheme ? null : setTheme(t)}
              key={`theme-options-${t}`}
            />
          ))}
        </div>
      </div>
    </main>
  )
}
