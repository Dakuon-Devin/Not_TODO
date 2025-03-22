// src/components/NotTodoListScreen.tsx
import React, { useState } from 'react';
import { Task, AppScreen } from '@/types';
import { motion } from 'framer-motion';
import { FiClock } from 'react-icons/fi';
import { getNotTodoTasks, getTodoTasks } from '@/utils/storage';

interface NotTodoListScreenProps {
  tasks: Task[];
  onScreenChange: (screen: AppScreen) => void;
}

const NotTodoListScreen: React.FC<NotTodoListScreenProps> = ({
  tasks,
  onScreenChange
}) => {
  const [showFocusTasks, setShowFocusTasks] = useState(false);
  const notTodoTasks = getNotTodoTasks(tasks);
  const focusTasks = getTodoTasks(tasks);
  const hasNotTodoTasks = notTodoTasks.length > 0;
  const hasFocusTasks = focusTasks.length > 0;
  
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
        {showFocusTasks ? '今日はこれに集中しましょう' : '今日はこれを置いていく'}
      </h2>
      
      {showFocusTasks ? (
        hasFocusTasks ? (
          <motion.div
            className="mb-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {focusTasks.map(task => (
              <motion.div
                key={task.id}
                className="focus-task-item"
                variants={itemVariants}
              >
                <h3 className="font-medium text-gray-700 mb-1">{task.title}</h3>
              </motion.div>
            ))}
            
            <div className="text-center text-gray-600 text-sm mt-6 mb-2 flex items-center justify-center gap-2">
              <FiClock size={16} />
              <span>これらのタスクに集中しましょう</span>
            </div>
            
            <div className="text-center text-gray-500 text-sm mb-6">
              {focusTasks.length}つのタスクに取り組みます
            </div>
          </motion.div>
        ) : (
          <div className="text-center text-gray-500 py-6 mb-4">
            残りのタスクはありません。
          </div>
        )
      ) : (
        hasNotTodoTasks ? (
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
        )
      )}
      
      {/* タスク選択画面に戻るボタン - 集中タスク表示時は非表示 */}
      {!showFocusTasks && (
        <button
          className="btn-secondary w-full mb-4"
          onClick={() => onScreenChange(AppScreen.TASK_SELECTION)}
          data-testid="back-to-tasks-button"
        >
          タスクに戻る
        </button>
      )}
      
      {/* 完了ボタン - E2Eテスト用に明確なdata-testidを持つ */}
      <button
        className="btn-primary w-full"
        onClick={() => setShowFocusTasks(!showFocusTasks)}
        data-testid="complete-button"
      >
        {showFocusTasks ? 'タスク選択に戻る' : '完了'}
      </button>
    </motion.div>
  );
};

export default NotTodoListScreen;
