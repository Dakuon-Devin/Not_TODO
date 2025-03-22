import { describe, it, expect, vi, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import TaskSelectionScreen from '../TaskSelectionScreen'
import { Task, AppScreen } from '../../types'
import userEvent from '@testing-library/user-event'
import React from 'react'
import '@testing-library/jest-dom'

describe('TaskSelectionScreen コンポーネントのテスト', () => {
  const mockOnTasksChange = vi.fn()
  const mockOnScreenChange = vi.fn()
  
  const mockTasks: Task[] = [
    {
      id: '1',
      title: 'タスク1',
      isNotToDo: false,
      createdAt: '2023-01-01',
    },
    {
      id: '2',
      title: 'タスク2',
      isNotToDo: false,
      createdAt: '2023-01-01',
    },
  ]

  beforeEach(() => {
    vi.clearAllMocks()
  })

  it('タスクリストが正しくレンダリングされる', () => {
    render(
      <TaskSelectionScreen
        tasks={mockTasks}
        onTasksChange={mockOnTasksChange}
        onScreenChange={mockOnScreenChange}
      />
    )
    
    expect(screen.getByText('今日は何を置いていく？')).toBeInTheDocument()
    expect(screen.getByText('タスク1')).toBeInTheDocument()
    expect(screen.getByText('タスク2')).toBeInTheDocument()
    expect(screen.getByText('0/3 選択中')).toBeInTheDocument()
  })

  it('タスクをクリックするとisNotTodoが切り替わる', async () => {
    render(
      <TaskSelectionScreen
        tasks={mockTasks}
        onTasksChange={mockOnTasksChange}
        onScreenChange={mockOnScreenChange}
      />
    )
    
    // タスク1をクリック
    const task1 = screen.getByText('タスク1')
    await userEvent.click(task1)
    
    // onTasksChangeが呼ばれたことを確認
    expect(mockOnTasksChange).toHaveBeenCalledTimes(1)
    
    // タスク1のisNotTodoがtrueになっていることを確認
    const updatedTasks = mockOnTasksChange.mock.calls[0][0] as Task[]
    const updatedTask1 = updatedTasks.find(task => task.id === '1')
    expect(updatedTask1?.isNotToDo).toBe(true)
  })

  it('「次へ」ボタンをクリックすると理由選択画面に遷移する', async () => {
    // タスク1が選択されている状態
    const tasksWithOneSelected = [
      { ...mockTasks[0], isNotToDo: true },
      mockTasks[1],
    ]
    
    render(
      <TaskSelectionScreen
        tasks={tasksWithOneSelected}
        onTasksChange={mockOnTasksChange}
        onScreenChange={mockOnScreenChange}
      />
    )
    
    // 次へボタンをクリック
    const nextButton = screen.getByText('次へ')
    await userEvent.click(nextButton)
    
    // onScreenChangeが呼ばれたことを確認
    expect(mockOnScreenChange).toHaveBeenCalledTimes(1)
    expect(mockOnScreenChange).toHaveBeenCalledWith(AppScreen.REASON_SELECTION)
  })
})
