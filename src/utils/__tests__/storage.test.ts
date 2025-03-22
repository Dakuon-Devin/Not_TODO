import { describe, it, expect, beforeEach, vi } from 'vitest'
import { generateId, getTodayDate, getTasks, saveTasks, getNotTodoTasks, getTodoTasks } from '../storage'
import { Task } from '../../types'

describe('storage ユーティリティのテスト', () => {
  // テストの前に localStorage をクリア
  beforeEach(() => {
    localStorage.clear()
    vi.clearAllMocks()
  })

  it('generateId() はユニークなIDを生成する', () => {
    const id1 = generateId()
    const id2 = generateId()
    expect(id1).not.toBe(id2)
  })

  it('getTodayDate() は正しい形式の日付を返す', () => {
    const date = getTodayDate()
    expect(date).toMatch(/^\d{4}-\d{2}-\d{2}$/)
  })

  it('getTasks() は初回利用時にサンプルタスクを返す', () => {
    const tasks = getTasks()
    expect(tasks.length).toBeGreaterThan(0)
    expect(tasks[0]).toHaveProperty('id')
    expect(tasks[0]).toHaveProperty('title')
    expect(tasks[0]).toHaveProperty('isNotToDo', false)
  })

  it('saveTasks() はタスクを保存する', () => {
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'テストタスク',
        isNotToDo: false,
        createdAt: getTodayDate(),
      },
    ]
    
    saveTasks(mockTasks)
    const savedTasks = getTasks()
    expect(savedTasks).toEqual(mockTasks)
  })

  it('getNotTodoTasks() はNotTodoのタスクのみを返す', () => {
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'タスク1',
        isNotToDo: true,
        createdAt: getTodayDate(),
      },
      {
        id: '2',
        title: 'タスク2',
        isNotToDo: false,
        createdAt: getTodayDate(),
      },
    ]
    
    const notTodoTasks = getNotTodoTasks(mockTasks)
    expect(notTodoTasks.length).toBe(1)
    expect(notTodoTasks[0].id).toBe('1')
  })

  it('getTodoTasks() はNotTodoではないタスクのみを返す', () => {
    const mockTasks: Task[] = [
      {
        id: '1',
        title: 'タスク1',
        isNotToDo: true,
        createdAt: getTodayDate(),
      },
      {
        id: '2',
        title: 'タスク2',
        isNotToDo: false,
        createdAt: getTodayDate(),
      },
    ]
    
    const todoTasks = getTodoTasks(mockTasks)
    expect(todoTasks.length).toBe(1)
    expect(todoTasks[0].id).toBe('2')
  })
})
