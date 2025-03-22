import '@testing-library/jest-dom'
import { expect, afterEach } from 'vitest'
import { cleanup } from '@testing-library/react'

// テストの後にクリーンアップを実行
afterEach(() => {
  cleanup()
})

// localStorageのモック
const localStorageMock = (() => {
  let store: Record<string, string> = {}
  return {
    getItem: (key: string) => store[key] || null,
    setItem: (key: string, value: string) => {
      store[key] = value.toString()
    },
    removeItem: (key: string) => {
      delete store[key]
    },
    clear: () => {
      store = {}
    },
  }
})()

// localStorageをグローバルにモック
Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
})
