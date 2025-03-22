// src/components/Header.tsx
import React, { useState } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import { Task } from '@/types';
import { generateId, getTodayDate } from '@/utils/storage';

interface HeaderProps {
  onAddTask: (task: Task) => void;
}

const Header: React.FC<HeaderProps> = ({ onAddTask }) => {
  const [showModal, setShowModal] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  
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
    setShowModal(false);
  };
  
  return (
    <div className="mb-8 relative">
      <header className="mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium text-gray-800">
            Not-ToDo
          </h1>
          <button
            onClick={() => {
              console.log('Button clicked, setting showModal to true');
              setShowModal(true);
            }}
            className="px-3 py-1 rounded-lg bg-blue-100 hover:bg-blue-200 focus:outline-none text-blue-800"
            type="button"
          >
            タスク追加
          </button>
        </div>
        <p className="text-center text-gray-500 text-sm mt-1">
          今日は、やらないことを決める日
        </p>
      </header>
      
      {/* タスク追加モーダル */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4" onClick={(e) => e.stopPropagation()}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-medium text-gray-700">
                新しいタスクを追加
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="text-gray-500 hover:text-gray-700"
                type="button"
              >
                <FiX size={20} />
              </button>
            </div>
            
            <form onSubmit={handleAddTask}>
              <div className="flex gap-2 mb-4">
                <input
                  type="text"
                  value={newTaskTitle}
                  onChange={(e) => setNewTaskTitle(e.target.value)}
                  placeholder="新しいタスクを追加"
                  className="flex-1 p-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-300"
                  autoFocus
                />
                <button 
                  type="submit"
                  className="p-2 bg-blue-100 text-blue-800 rounded-lg hover:bg-blue-200"
                  disabled={!newTaskTitle.trim()}
                >
                  <FiPlus size={20} />
                </button>
              </div>
            </form>
            
            <div className="text-sm text-gray-500 mt-2">
              ここに将来的に各種APIとの連携設定などを追加予定
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
