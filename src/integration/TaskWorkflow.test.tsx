import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import App from '../App'
// React is imported via JSX
import '@testing-library/jest-dom'

describe('タスク追加と無効化ワークフローのテスト', () => {
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('タスクを追加してNotTodoとして選択し、理由を設定するワークフロー', async () => {
    render(<App />)
    
    // ハンバーガーメニューをクリック
    const menuButton = screen.getByRole('button', { name: '' })
    await userEvent.click(menuButton)
    
    // タスクを追加ボタンをクリック
    const addTaskButton = screen.getByText('タスクを追加')
    await userEvent.click(addTaskButton)
    
    // タスクを入力
    const input = screen.getByPlaceholderText('タスクを入力')
    await userEvent.type(input, '結合テスト用タスク')
    
    // 追加ボタンをクリック
    const submitButton = screen.getByText('追加')
    await userEvent.click(submitButton)
    
    // タスクが追加されたことを確認
    expect(screen.getByText('結合テスト用タスク')).toBeInTheDocument()
    
    // タスクをNotTodoとして選択
    const taskItem = screen.getByText('結合テスト用タスク')
    await userEvent.click(taskItem)
    
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
    expect(screen.getByText('結合テスト用タスク')).toBeInTheDocument()
    expect(screen.getByText('理由: 優先度が低い')).toBeInTheDocument()
  })

  it('複数のタスクをNotTodoとして選択し、理由を設定するワークフロー', async () => {
    render(<App />)
    
    // 3つのタスクを追加
    for (let i = 1; i <= 3; i++) {
      // ハンバーガーメニューをクリック
      const menuButton = screen.getByRole('button', { name: '' })
      await userEvent.click(menuButton)
      
      // タスクを追加ボタンをクリック
      const addTaskButton = screen.getByText('タスクを追加')
      await userEvent.click(addTaskButton)
      
      // タスクを入力
      const input = screen.getByPlaceholderText('タスクを入力')
      await userEvent.type(input, `結合テスト用タスク${i}`)
      
      // 追加ボタンをクリック
      const submitButton = screen.getByText('追加')
      await userEvent.click(submitButton)
    }
    
    // 3つのタスクが追加されたことを確認
    expect(screen.getByText('結合テスト用タスク1')).toBeInTheDocument()
    expect(screen.getByText('結合テスト用タスク2')).toBeInTheDocument()
    expect(screen.getByText('結合テスト用タスク3')).toBeInTheDocument()
    
    // 2つのタスクをNotTodoとして選択
    await userEvent.click(screen.getByText('結合テスト用タスク1'))
    await userEvent.click(screen.getByText('結合テスト用タスク2'))
    
    // 選択数が表示されていることを確認
    expect(screen.getByText('2/3 選択中')).toBeInTheDocument()
    
    // 次へボタンをクリック
    const nextButton = screen.getByText('次へ')
    await userEvent.click(nextButton)
    
    // 理由選択画面に遷移したことを確認
    expect(screen.getByText('なぜやらない？')).toBeInTheDocument()
    
    // 1つ目のタスクの理由を選択
    expect(screen.getByText('結合テスト用タスク1')).toBeInTheDocument()
    const reasonOption1 = screen.getByText('今日は無理しない')
    await userEvent.click(reasonOption1)
    
    // 2つ目のタスクの理由を選択
    expect(screen.getByText('結合テスト用タスク2')).toBeInTheDocument()
    const reasonOption2 = screen.getByText('気が進まない')
    await userEvent.click(reasonOption2)
    
    // NotTodoリスト画面に遷移したことを確認
    expect(screen.getByText('今日はこれを置いていく')).toBeInTheDocument()
    
    // 2つのタスクとその理由が表示されていることを確認
    expect(screen.getByText('結合テスト用タスク1')).toBeInTheDocument()
    expect(screen.getByText('理由: 今日は無理しない')).toBeInTheDocument()
    expect(screen.getByText('結合テスト用タスク2')).toBeInTheDocument()
    expect(screen.getByText('理由: 気が進まない')).toBeInTheDocument()
    
    // タスク選択画面に戻る
    const backButton = screen.getByText('タスクに戻る')
    await userEvent.click(backButton)
    
    // タスク選択画面に戻ったことを確認
    expect(screen.getByText('今日は何を置いていく？')).toBeInTheDocument()
    
    // NotTodoとして選択されたタスクが取り消し線で表示されていることを確認
    const task1 = screen.getByText('結合テスト用タスク1')
    const task2 = screen.getByText('結合テスト用タスク2')
    const task3 = screen.getByText('結合テスト用タスク3')
    
    expect(task1.className).toContain('line-through')
    expect(task2.className).toContain('line-through')
    expect(task3.className).not.toContain('line-through')
  })
})
