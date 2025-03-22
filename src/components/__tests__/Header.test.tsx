import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../Header'
import { Task } from '../../types'
import userEvent from '@testing-library/user-event'
import React from 'react'
import '@testing-library/jest-dom'

describe('Header コンポーネントのテスト', () => {
  const mockOnAddTask = vi.fn()

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('ヘッダーが正しくレンダリングされる', () => {
    render(<Header onAddTask={mockOnAddTask} />)
    expect(screen.getByText('Not-ToDo')).toBeInTheDocument()
    expect(screen.getByText('今日は、やらないことを決める日')).toBeInTheDocument()
  })

  it('ハンバーガーメニューをクリックするとメニューが表示される', async () => {
    render(<Header onAddTask={mockOnAddTask} />)
    
    // ハンバーガーメニューをクリック
    const menuButton = screen.getByRole('button')
    await userEvent.click(menuButton)
    
    // メニューが表示されていることを確認
    expect(screen.getByText('タスクを追加')).toBeInTheDocument()
    expect(screen.getByText('NotionAPIと連携')).toBeInTheDocument()
  })

  it('「タスクを追加」をクリックするとフォームが表示される', async () => {
    render(<Header onAddTask={mockOnAddTask} />)
    
    // ハンバーガーメニューをクリック
    const menuButton = screen.getByRole('button')
    await userEvent.click(menuButton)
    
    // タスクを追加ボタンをクリック
    const addTaskButton = screen.getByText('タスクを追加')
    await userEvent.click(addTaskButton)
    
    // フォームが表示されていることを確認
    expect(screen.getByText('新しいタスクを追加')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('タスクを入力')).toBeInTheDocument()
  })

  it('タスクを追加するとonAddTaskが呼ばれる', async () => {
    render(<Header onAddTask={mockOnAddTask} />)
    
    // ハンバーガーメニューをクリック
    const menuButton = screen.getByRole('button')
    await userEvent.click(menuButton)
    
    // タスクを追加ボタンをクリック
    const addTaskButton = screen.getByText('タスクを追加')
    await userEvent.click(addTaskButton)
    
    // タスクを入力
    const input = screen.getByPlaceholderText('タスクを入力')
    await userEvent.type(input, 'テストタスク')
    
    // 追加ボタンをクリック
    const submitButton = screen.getByText('追加')
    await userEvent.click(submitButton)
    
    // onAddTaskが呼ばれたことを確認
    expect(mockOnAddTask).toHaveBeenCalledTimes(1)
    const calledTask = mockOnAddTask.mock.calls[0][0] as Task
    expect(calledTask.title).toBe('テストタスク')
    expect(calledTask.isNotToDo).toBe(false)
  })
})
