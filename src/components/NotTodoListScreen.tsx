// src/components/NotTodoListScreen.tsx
import React from 'react';
import { Task, AppScreen } from '@/types';
import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';
import { getNotTodoTasks } from '@/utils/storage';

interface NotTodoListScreenProps {
  tasks: Task[];
  onScreenChange: (screen: AppScreen) => void;
}

const NotTodoListScreen: React.FC<NotTodoListScreenProps> = ({
  tasks,
  onScreenChange
}) => {
  const notTodoTasks = getNotTodoTasks(tasks);
  const hasNotTodoTasks = notTodoTasks.length > 0;
  
  // アニメーションの設定
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.4
      }
    }
  };
  
  return (
    <motion.div
      className="card max-w-md mx-auto"
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3 }}
    >
      <h2 className="text-xl text-center text-gray-700 mb-6" data-testid="not-todo-list-title">
        今日はこれを置いていく
      </h2>
      
      {hasNotTodoTasks ? (
        <motion.div
          className="mb-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {notTodoTasks.map(task => (
            <motion.div
              key={task.id}
              className="not-todo-item"
              variants={itemVariants}
            >
              <h3 className="font-medium text-gray-700 mb-1">{task.title}</h3>
              {task.reason && (
                <p className="text-sm text-gray-500">
                  理由: {task.reason}
                </p>
              )}
            </motion.div>
          ))}
          
          <div className="text-center text-gray-600 text-sm mt-6 mb-2 flex items-center justify-center gap-2">
            <FiClock size={16} />
            <span>残りのタスクに集中できます</span>
          </div>
          
          <div className="text-center text-gray-500 text-sm mb-6">
            {notTodoTasks.length}つのタスクから解放されました
          </div>
        </motion.div>
      ) : (
        <div className="text-center text-gray-500 py-6 mb-4">
          Not-ToDo タスクが選択されていません。
        </div>
      )}
      
      <button
        className="btn-primary w-full"
        onClick={() => onScreenChange(AppScreen.TASK_SELECTION)}
      >
        タスクに戻る
      </button>
    </motion.div>
  );
};

export default NotTodoListScreen;
