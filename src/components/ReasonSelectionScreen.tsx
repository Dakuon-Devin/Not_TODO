// src/components/ReasonSelectionScreen.tsx
import React from 'react';
import { Task, AppScreen, REASON_OPTIONS } from '@/types';
import { motion } from 'framer-motion';

interface ReasonSelectionScreenProps {
  tasks: Task[];
  onTasksChange: (tasks: Task[]) => void;
  onScreenChange: (screen: AppScreen) => void;
}

const ReasonSelectionScreen: React.FC<ReasonSelectionScreenProps> = ({
  tasks,
  onTasksChange,
  onScreenChange
}) => {
  // 理由がまだ設定されていないNot-ToDoタスクを取得
  const currentTask = tasks.find(task => task.isNotToDo && !task.reason);
  
  // 理由が未設定のタスクがなければ結果画面へ
  if (!currentTask) {
    onScreenChange(AppScreen.NOT_TODO_LIST);
    return null;
  }
  
  // 理由を選択
  const selectReason = (reason: string) => {
    const updatedTasks = tasks.map(task => {
      if (task.id === currentTask.id) {
        return { ...task, reason };
      }
      return task;
    });
    
    onTasksChange(updatedTasks);
    
    // 次のタスクを処理、または結果画面へ
    const nextTask = updatedTasks.find(task => task.isNotToDo && !task.reason);
    if (nextTask) {
      // 理由選択画面にとどまる
    } else {
      // すべての理由が設定されたら結果画面へ
      onScreenChange(AppScreen.NOT_TODO_LIST);
    }
  };
  
  // 理由を設定せずにスキップ
  const skipReason = () => {
    selectReason('');
  };
  
  return (
    <motion.div
      className="card max-w-md mx-auto"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl text-center text-gray-700 mb-6">
        なぜやらない？
      </h2>
      
      {/* 選択中のタスク */}
      <div className="p-3 bg-gray-50 rounded-lg border border-gray-200 mb-6 text-gray-600">
        {currentTask.title}
      </div>
      
      {/* 理由選択ボタン */}
      <div className="flex flex-col gap-3 mb-6">
        {REASON_OPTIONS.map(reason => (
          <motion.button
            key={reason}
            className="reason-btn"
            onClick={() => selectReason(reason)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            data-testid={`reason-option-${reason}`}
          >
            {reason}
          </motion.button>
        ))}
      </div>
      
      {/* スキップリンク */}
      <div className="text-center mb-4">
        <button 
          className="text-gray-400 hover:text-gray-500 underline"
          onClick={skipReason}
        >
          理由を記録しない
        </button>
      </div>
      
      {/* 完了ボタン - 理由選択後に表示 */}
      <div className="text-center mt-6">
        <button 
          className="btn-primary w-full"
          onClick={() => onScreenChange(AppScreen.NOT_TODO_LIST)}
          data-testid="complete-reason-selection"
        >
          完了
        </button>
      </div>
    </motion.div>
  );
};

export default ReasonSelectionScreen;
