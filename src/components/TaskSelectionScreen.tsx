// src/components/TaskSelectionScreen.tsx
import React from 'react';
import { Task, AppScreen } from '@/types';
import { motion } from 'framer-motion';
import { FiCircle, FiCheckCircle } from 'react-icons/fi';

interface TaskSelectionScreenProps {
  tasks: Task[];
  onTasksChange: (tasks: Task[]) => void;
  onScreenChange: (screen: AppScreen) => void;
}

const TaskSelectionScreen: React.FC<TaskSelectionScreenProps> = ({
  tasks,
  onTasksChange,
  onScreenChange
}) => {
  // Not-ToDo として選択されたタスクの数
  const selectedCount = tasks.filter(task => task.isNotToDo).length;
  const MAX_SELECTION = 3;
  
  // タスクの選択を切り替える
  const toggleTaskSelection = (taskId: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === taskId) {
        // すでに選択されている場合は選択解除
        if (task.isNotToDo) {
          return { ...task, isNotToDo: false, reason: undefined };
        }
        
        // 選択上限に達している場合は選択不可
        if (selectedCount >= MAX_SELECTION) {
          return task;
        }
        
        // 新たに選択
        return { ...task, isNotToDo: true };
      }
      return task;
    });
    
    onTasksChange(updatedTasks);
  };
  
  // 次の画面へ進む（理由選択へ）
  const goToReasonSelection = () => {
    const firstNotTodo = tasks.find(task => task.isNotToDo && !task.reason);
    if (firstNotTodo) {
      onScreenChange(AppScreen.REASON_SELECTION);
    } else {
      // すべてのNot-ToDoタスクに理由が設定済みなら結果画面へ
      onScreenChange(AppScreen.NOT_TODO_LIST);
    }
  };
  
  return (
    <motion.div
      className="card max-w-md mx-auto"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl text-center text-gray-700 mb-6">
        今日は何を置いていく？
      </h2>
      
      {/* タスクリスト */}
      <div className="mb-6">
        {tasks.map(task => (
          <div 
            key={task.id}
            className={`task-item ${task.isNotToDo ? 'selected' : ''}`}
            onClick={() => toggleTaskSelection(task.id)}
          >
            {task.isNotToDo ? (
              <FiCheckCircle className="text-sand-500" size={20} />
            ) : (
              <FiCircle className="text-gray-300" size={20} />
            )}
            <span className={task.isNotToDo ? 'line-through text-gray-500' : ''}>
              {task.title}
            </span>
          </div>
        ))}
        
        {tasks.length === 0 && (
          <p className="text-center text-gray-500 py-4">
            タスクがありません。新しいタスクを追加してください。
          </p>
        )}
      </div>
      
      {/* 選択数カウンター */}
      <div className="text-center text-gray-500 mb-4">
        {selectedCount}/{MAX_SELECTION} 選択中
      </div>
      
      {/* 次へボタン */}
      <button
        className="btn-primary w-full"
        onClick={goToReasonSelection}
        disabled={selectedCount === 0}
      >
        次へ
      </button>
    </motion.div>
  );
};

export default TaskSelectionScreen;
