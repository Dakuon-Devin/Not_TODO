// src/components/Header.tsx
import React, { useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import { Task } from '@/types';
import { generateId, getTodayDate } from '@/utils/storage';

interface HeaderProps {
  onAddTask: (task: Task) => void;
}

const Header: React.FC<HeaderProps> = ({ onAddTask }) => {
  const [showForm, setShowForm] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');

  // フォームの表示/非表示を切り替え
  const toggleForm = () => {
    console.log('Toggling form visibility, current state:', !showForm);
    setShowForm(!showForm);
  };

  // フォームを閉じる
  const closeForm = () => {
    console.log('Closing form');
    setShowForm(false);
    setNewTaskTitle('');
  };

  // 新しいタスクを追加
  const handleAddTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTaskTitle.trim()) return;
    
    const newTask: Task = {
      id: generateId(),
      title: newTaskTitle.trim(),
      isNotToDo: false,
      createdAt: getTodayDate()
    };
    
    onAddTask(newTask);
    setNewTaskTitle('');
    closeForm();
  };

  return (
    <div className="mb-8 relative">
      <header className="mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium text-gray-800">
            Not-ToDo
          </h1>
          <button
            onClick={toggleForm}
            className="px-3 py-1 rounded-lg bg-blue-100 hover:bg-blue-200 focus:outline-none text-blue-800 flex items-center"
            type="button"
          >
            <FiPlus className="mr-1" />
            タスク追加
          </button>
        </div>
        <p className="text-center text-gray-500 text-sm mt-1">
          今日は、やらないことを決める日
        </p>
      </header>
      
      {/* タスク追加フォーム（インライン表示） */}
      {showForm && (
        <div className="absolute right-0 top-12 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-80 z-50">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-medium">新しいタスクを追加</h3>
            <button 
              onClick={closeForm}
              className="text-gray-500 hover:text-gray-700"
              type="button"
            >
              <FiX size={18} />
            </button>
          </div>
          
          <form onSubmit={handleAddTask}>
            <div className="mb-3">
              <input
                type="text"
                value={newTaskTitle}
                onChange={(e) => setNewTaskTitle(e.target.value)}
                placeholder="タスクを入力"
                className="w-full p-2 border border-gray-300 rounded-lg"
                autoFocus
              />
            </div>
            
            <div className="flex justify-end">
              <button
                type="button"
                onClick={closeForm}
                className="mr-2 px-3 py-1 text-sm text-gray-600 bg-gray-100 rounded-lg hover:bg-gray-200"
              >
                キャンセル
              </button>
              <button
                type="submit"
                disabled={!newTaskTitle.trim()}
                className="px-3 py-1 text-sm bg-blue-500 text-white rounded-lg hover:bg-blue-600 disabled:opacity-50"
              >
                追加
              </button>
            </div>
          </form>
          
          <div className="text-xs text-gray-500 mt-3">
            ここに将来的に各種APIとの連携設定などを追加予定
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
