// src/types/index.ts
// タスクの型定義
export interface Task {
  id: string;
  title: string;
  isNotToDo: boolean;
  reason?: string;
  createdAt: string;
}

// アプリケーションの状態
export enum AppScreen {
  TASK_SELECTION = 'task_selection',
  REASON_SELECTION = 'reason_selection',
  NOT_TODO_LIST = 'not_todo_list'
}

// 理由の選択肢
export const REASON_OPTIONS = [
  '優先度が低い',
  '今日は無理しない',
  '体力・気力的に合わない',
  '気が進まない'
];

// サンプルタスク
export const SAMPLE_TASKS: Omit<Task, 'id' | 'createdAt'>[] = [
  { title: 'レポート作成', isNotToDo: false },
  { title: '会議の準備', isNotToDo: false },
  { title: 'メール返信', isNotToDo: false },
  { title: 'デザイン確認', isNotToDo: false },
  { title: 'プロジェクト計画', isNotToDo: false },
  { title: '資料の整理', isNotToDo: false },
  { title: '新機能の調査', isNotToDo: false },
];
