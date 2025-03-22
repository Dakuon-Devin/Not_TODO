/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * 新しいタスクを追加する
     */
    addTask(taskTitle: string, options?: object): Chainable<Element>
    /**
     * タスクが表示されるまで待機する
     */
    waitForTask(taskName: string, options?: object): Chainable<Element>
    /**
     * Not-ToDoとしてタスクを選択する
     */
    selectAsNotTodo(taskTitle: string): Chainable<Element>
    /**
     * 理由を選択する
     */
    selectReason(reason: string): Chainable<Element>
    /**
     * DOM構造を詳細にログ出力する
     */
    debugDom(selector?: string, options?: object): Chainable<Element>
    /**
     * タスク関連要素の状態を詳細にログ出力する
     */
    debugTask(taskName: string): Chainable<Element>
    /**
     * ローカルストレージの状態をログ出力する
     */
    debugLocalStorage(): Chainable<Element>
  }
}
