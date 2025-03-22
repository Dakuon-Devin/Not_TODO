// src/components/Header.tsx
import React, { useState, useRef, useEffect } from 'react';
import { FiPlus, FiX, FiMenu } from 'react-icons/fi';
import { Task } from '@/types';
import { generateId, getTodayDate } from '@/utils/storage';

interface HeaderProps {
  onAddTask: (task: Task) => void;
}

const Header: React.FC<HeaderProps> = ({ onAddTask }) => {
  const [showForm, setShowForm] = useState(false);
  const [showMenu, setShowMenu] = useState(false);
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const menuRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // フォームの表示/非表示を切り替え
  const toggleForm = () => {
    console.log('Toggling form visibility, current state:', !showForm);
    setShowForm(!showForm);
    // フォームを開くときはメニューを閉じる
    if (!showForm) {
      setShowMenu(false);
    }
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

  // メニュー以外の部分がクリックされたらメニューを閉じる
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        menuRef.current && 
        !menuRef.current.contains(event.target as Node) &&
        buttonRef.current && 
        !buttonRef.current.contains(event.target as Node)
      ) {
        setShowMenu(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // NotionAPI連携の処理（現在は仮の実装）
  const handleNotionIntegration = () => {
    alert('NotionAPIとの連携は将来的に実装予定です。');
    setShowMenu(false);
  };

  return (
    <div className="mb-8 relative">
      <header className="mb-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-medium text-gray-800">
            Not-ToDo
          </h1>
          <button
            ref={buttonRef}
            onClick={() => {
              console.log('Toggling menu visibility, current state:', !showMenu);
              setShowMenu(!showMenu);
            }}
            className="px-3 py-1 rounded-lg bg-sand-200 hover:bg-sand-300 focus:outline-none text-sand-800 flex items-center"
            type="button"
          >
            <FiMenu className="text-sand-700" size={20} />
          </button>
        </div>
        <p className="text-center text-gray-500 text-sm mt-1">
          今日は、やらないことを決める日
        </p>
      </header>
      
      {/* ハンバーガーメニュー */}
      {showMenu && (
        <div 
          ref={menuRef}
          className="absolute right-0 top-12 bg-white rounded-lg shadow-lg border border-gray-200 w-48 z-50 overflow-hidden"
        >
          <div className="py-1">
            <button
              onClick={() => { toggleForm(); setShowMenu(false); }}
              className="w-full px-4 py-2 text-left hover:bg-sand-100 text-gray-700 flex items-center"
            >
              <FiPlus className="mr-2 text-sand-500" />
              タスクを追加
            </button>
            <button
              onClick={handleNotionIntegration}
              className="w-full px-4 py-2 text-left hover:bg-sand-100 text-gray-700 flex items-center"
            >
              <FiPlus className="mr-2 text-sand-500" />
              NotionAPIと連携
            </button>
          </div>
        </div>
      )}
      
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
