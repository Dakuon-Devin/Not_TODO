import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
// React is imported via JSX
import '@testing-library/jest-dom'
import { getTasks, saveTasks } from '../utils/storage'
import { Task } from '../types'

describe('アプリケーション状態の結合テスト', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('localStorageからタスクが正しく読み込まれる', () => {
    // テスト用のタスクをlocalStorageに保存
    const testTasks: Task[] = [
      {
        id: 'test-1',
        title: 'テスト用タスク1',
        isNotToDo: false,
        createdAt: '2023-01-01',
      },
      {
        id: 'test-2',
        title: 'テスト用タスク2',
        isNotToDo: true,
        reason: '優先度が低い',
        createdAt: '2023-01-01',
      },
    ]
    
    saveTasks(testTasks)
    
    // アプリをレンダリング
    render(<App />)
    
    // 保存したタスクが表示されていることを確認
    expect(screen.getByText('テスト用タスク1')).toBeInTheDocument()
    expect(screen.getByText('テスト用タスク2')).toBeInTheDocument()
    
    // NotTodoタスクが取り消し線で表示されていることを確認
    const task2 = screen.getByText('テスト用タスク2')
    expect(task2.className).toContain('line-through')
  })

  it('タスクの状態変更がlocalStorageに保存される', async () => {
    // アプリをレンダリング
    render(<App />)
    
    // タスクを追加
    const menuButton = screen.getByRole('button', { name: '' })
    await userEvent.click(menuButton)
    
    const addTaskButton = screen.getByText('タスクを追加')
    await userEvent.click(addTaskButton)
    
    const input = screen.getByPlaceholderText('タスクを入力')
    await userEvent.type(input, 'ストレージテスト用タスク')
    
    const submitButton = screen.getByText('追加')
    await userEvent.click(submitButton)
    
    // タスクをNotTodoとして選択
    const taskItem = screen.getByText('ストレージテスト用タスク')
    await userEvent.click(taskItem)
    
    // localStorageに保存されたタスクを確認
    const savedTasks = getTasks()
    const addedTask = savedTasks.find(task => task.title === 'ストレージテスト用タスク')
    
    expect(addedTask).toBeDefined()
    expect(addedTask?.isNotToDo).toBe(true)
  })

  it('画面遷移が正しく動作する', async () => {
    // テスト用のタスクをlocalStorageに保存
    const testTasks: Task[] = [
      {
        id: 'test-1',
        title: '画面遷移テスト用タスク',
        isNotToDo: true,
        createdAt: '2023-01-01',
      },
    ]
    
    saveTasks(testTasks)
    
    // アプリをレンダリング
    render(<App />)
    
    // タスク選択画面が表示されていることを確認
    expect(screen.getByText('今日は何を置いていく？')).toBeInTheDocument()
    
    // 次へボタンをクリック
    const nextButton = screen.getByText('次へ')
    await userEvent.click(nextButton)
    
    // 理由選択画面に遷移したことを確認
    expect(screen.getByText('なぜやらない？')).toBeInTheDocument()
    
    // 理由を選択
    const reasonOption = screen.getByText('優先度が低い')
    await userEvent.click(reasonOption)
    
    // NotTodoリスト画面に遷移したことを確認
    expect(screen.getByText('今日はこれを置いていく')).toBeInTheDocument()
    
    // タスク選択画面に戻る
    const backButton = screen.getByText('タスクに戻る')
    await userEvent.click(backButton)
    
    // タスク選択画面に戻ったことを確認
    expect(screen.getByText('今日は何を置いていく？')).toBeInTheDocument()
  })
})
