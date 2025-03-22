// src/utils/storage.ts
import { Task, SAMPLE_TASKS } from '@/types';

// ローカルストレージのキー
const STORAGE_KEY = 'not-todo-tasks';
const STORAGE_DATE_KEY = 'not-todo-last-date';

// ユニークIDの生成
export const generateId = (): string => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
};

// 今日の日付を取得
export const getTodayDate = (): string => {
  return new Date().toISOString().split('T')[0];
};

// ローカルストレージからタスクを取得
export const getTasks = (): Task[] => {
  try {
    // 最後にアプリを使用した日付を確認
    const lastDate = localStorage.getItem(STORAGE_DATE_KEY);
    const today = getTodayDate();
    
    // 日付が変わっていれば、Not-ToDoをリセット
    if (lastDate !== today) {
      const savedTasks = localStorage.getItem(STORAGE_KEY);
      let tasks: Task[] = [];
      
      if (savedTasks) {
        tasks = JSON.parse(savedTasks).map((task: Task) => ({
          ...task,
          isNotToDo: false,
          reason: undefined
        }));
      } else {
        // 初回利用の場合はサンプルタスクを表示
        tasks = SAMPLE_TASKS.map(task => ({
          ...task,
          id: generateId(),
          createdAt: today
        }));
      }
      
      localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
      localStorage.setItem(STORAGE_DATE_KEY, today);
      return tasks;
    }
    
    // 同じ日ならそのまま表示
    const savedTasks = localStorage.getItem(STORAGE_KEY);
    if (savedTasks) {
      return JSON.parse(savedTasks);
    }
    
    // データがない場合はサンプルタスク
    const newTasks = SAMPLE_TASKS.map(task => ({
      ...task,
      id: generateId(),
      createdAt: today
    }));
    
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newTasks));
    return newTasks;
  } catch (error) {
    console.error('Error loading tasks:', error);
    return [];
  }
};

// ローカルストレージにタスクを保存
export const saveTasks = (tasks: Task[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
    localStorage.setItem(STORAGE_DATE_KEY, getTodayDate());
  } catch (error) {
    console.error('Error saving tasks:', error);
  }
};

// Not-ToDo に選択されたタスク
export const getNotTodoTasks = (tasks: Task[]): Task[] => {
  return tasks.filter(task => task.isNotToDo);
};

// Not-ToDo に選択されていないタスク
export const getTodoTasks = (tasks: Task[]): Task[] => {
  return tasks.filter(task => !task.isNotToDo);
};
