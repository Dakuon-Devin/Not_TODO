/// <reference types="cypress" />

declare namespace Cypress {
  interface Chainable {
    /**
     * ハンバーガーメニューを開く
     */
    openHamburgerMenu(): Chainable<Element>
    /**
     * 新しいタスクを追加する
     */
    addTask(taskTitle: string): Chainable<Element>
    /**
     * Not-ToDoとしてタスクを選択する
     */
    selectAsNotTodo(taskTitle: string): Chainable<Element>
    /**
     * 理由を選択する
     */
    selectReason(reason: string): Chainable<Element>
  }
}
