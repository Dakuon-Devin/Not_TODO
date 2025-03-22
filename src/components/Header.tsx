// src/components/Header.tsx
import React, { useState, useRef, useEffect } from 'react';
import { FiPlus, FiX } from 'react-icons/fi';
import { Task } from '@/types';
import { generateId, getTodayDate } from '@/utils/storage';

interface HeaderProps {
  onAddTask: (task: Task) => void;
}

const Header: React.FC<HeaderProps> = ({ onAddTask }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  
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
    setIsOpen(false);
  };
  
  // 画面外クリック時にメニューを閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);
  
  return (
    <div className="mb-8">
      <header className="mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium text-gray-800">
            Not-ToDo
          </h1>
          <div className="relative">
            <button
              ref={buttonRef}
              onClick={() => {
                console.log('Button clicked, toggling menu');
                setIsOpen(!isOpen);
              }}
              className="px-3 py-1 rounded-lg bg-blue-100 hover:bg-blue-200 focus:outline-none text-blue-800"
              type="button"
            >
              タスク追加
            </button>
            
            {isOpen && (
              <div 
                ref={menuRef}
                className="absolute right-0 top-10 bg-white rounded-lg shadow-lg border border-gray-200 p-4 w-80 z-50"
              >
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-lg font-medium text-gray-700">
                    新しいタスクを追加
                  </h3>
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="text-gray-500 hover:text-gray-700"
                    type="button"
                  >
                    <FiX size={18} />
                  </button>
                </div>
                
                <form onSubmit={handleAddTask}>
                  <div className="flex gap-2 mb-3">
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
                      <FiPlus size={18} />
                    </button>
                  </div>
                </form>
                
                <div className="text-xs text-gray-500 mt-2">
                  ここに将来的に各種APIとの連携設定などを追加予定
                </div>
              </div>
            )}
          </div>
        </div>
        <p className="text-center text-gray-500 text-sm mt-1">
          今日は、やらないことを決める日
        </p>
      </header>
    </div>
  );
};

export default Header;
