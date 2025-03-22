// src/App.tsx
import React, { useState, useEffect } from 'react';
import { Task, AppScreen } from '@/types';
import { getTasks, saveTasks } from '@/utils/storage';
import TaskSelectionScreen from '@/components/TaskSelectionScreen';
import ReasonSelectionScreen from '@/components/ReasonSelectionScreen';
import NotTodoListScreen from '@/components/NotTodoListScreen';

function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentScreen, setCurrentScreen] = useState<AppScreen>(AppScreen.TASK_SELECTION);
  const [isLoading, setIsLoading] = useState(true);
  
  // 初期データの読み込み
  useEffect(() => {
    const loadTasks = () => {
      const loadedTasks = getTasks();
      setTasks(loadedTasks);
      setIsLoading(false);
    };
    
    loadTasks();
  }, []);
  
  // タスクの変更を保存
  const handleTasksChange = (updatedTasks: Task[]) => {
    setTasks(updatedTasks);
    saveTasks(updatedTasks);
  };
  
  // 画面を切り替え
  const handleScreenChange = (screen: AppScreen) => {
    setCurrentScreen(screen);
  };
  
  // ローディング中の表示
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-gray-500">読み込み中...</div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen py-8 px-4">
      <header className="mb-8">
        <h1 className="text-center text-2xl font-medium text-gray-800">
          Not-ToDo
        </h1>
        <p className="text-center text-gray-500 text-sm mt-1">
          今日は、やらないことを決める日
        </p>
      </header>
      
      <main>
        {currentScreen === AppScreen.TASK_SELECTION && (
          <TaskSelectionScreen
            tasks={tasks}
            onTasksChange={handleTasksChange}
            onScreenChange={handleScreenChange}
          />
        )}
        
        {currentScreen === AppScreen.REASON_SELECTION && (
          <ReasonSelectionScreen
            tasks={tasks}
            onTasksChange={handleTasksChange}
            onScreenChange={handleScreenChange}
          />
        )}
        
        {currentScreen === AppScreen.NOT_TODO_LIST && (
          <NotTodoListScreen
            tasks={tasks}
            onScreenChange={handleScreenChange}
          />
        )}
      </main>
      
      <footer className="mt-12 text-center text-xs text-gray-400">
        &copy; {new Date().getFullYear()} Not-ToDo App
      </footer>
    </div>
  );
}

export default App;
