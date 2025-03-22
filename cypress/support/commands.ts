/**
 * タスクを追加するための改善されたカスタムコマンド
 * 
 * Args:
 *     taskName: 追加するタスクの名前
 *     options: 追加のオプション（オプショナル）
 * 
 * Returns:
 *     Cypress チェーン
 */
Cypress.Commands.add('addTask', (taskName: string, options = {}) => {
  cy.log(`タスク追加を開始: "${taskName}"`);
  
  // ハンバーガーメニューを開く
  cy.get('header button').last().click({ force: true });
  cy.get('div.absolute').should('be.visible');
  
  // タスク追加ボタンをクリック
  cy.contains('button', 'タスクを追加').click({ force: true });
  
  // フォームが表示されるのを待つ
  cy.get('form').should('be.visible', { timeout: 5000 });
  cy.log('タスク追加フォームが表示されました');
  
  // 入力フィールドが存在し相互作用可能になるまで待機
  cy.get('input[type="text"], input[placeholder*="タスク"], input.task-input, input[placeholder="タスクを入力"]', 
    { timeout: 5000 })
    .should('be.visible')
    .should('be.enabled')
    .as('taskInput');
  
  // 入力フィールドをクリアしてタスク名を入力
  cy.get('@taskInput').clear();
  cy.get('@taskInput').type(taskName, { delay: 50 });
  
  // 追加ボタンを見つけてクリック
  cy.get('form').find('button[type="submit"]').contains('追加')
    .should('be.visible')
    .should('be.enabled')
    .click({ force: true });
  
  // フォームが閉じるのを待つ
  cy.get('form').should('not.exist', { timeout: 5000 });
  
  // タスクが追加されるのを待機
  cy.waitForTask(taskName);
  
  cy.log(`タスク追加完了: "${taskName}"`);
});

/**
 * タスクが表示されるまで待機する新しいコマンド
 * 
 * Args:
 *     taskName: 待機するタスクの名前
 *     options: 待機オプション（オプショナル）
 * 
 * Returns:
 *     Cypress チェーン
 */
Cypress.Commands.add('waitForTask', (taskName: string, options = {}) => {
  const timeout = options.timeout || 10000;
  
  cy.log(`タスク出現待機開始: "${taskName}"`);
  
  // DOM内のテキスト自体を探す（クラスに依存しない）
  cy.contains(taskName, { timeout })
    .should('be.visible')
    .then($el => {
      cy.log(`タスク見つかりました: "${taskName}" (${$el.length} 要素)`);
    });
  
  cy.log(`タスク出現待機完了: "${taskName}"`);
});

/**
 * Not-ToDoとしてタスクを選択する改善されたコマンド
 * 
 * Args:
 *     taskName: 選択するタスクの名前
 * 
 * Returns:
 *     Cypress チェーン
 */
Cypress.Commands.add('selectAsNotTodo', (taskName: string) => {
  cy.log(`Not-ToDo選択開始: "${taskName}"`);
  
  // まずタスクが存在することを確認
  cy.waitForTask(taskName);
  
  // タスク要素をクリック
  cy.contains(taskName).click({ force: true });
  
  cy.log(`Not-ToDo選択完了: "${taskName}"`);
});

/**
 * タスクの理由を選択する改善されたコマンド
 * 
 * Args:
 *     reason: 選択する理由
 * 
 * Returns:
 *     Cypress チェーン
 */
Cypress.Commands.add('selectReason', (reason: string) => {
  cy.log(`理由選択開始: "${reason}"`);
  
  // 理由選択のラジオボタンをクリック
  cy.contains(reason)
    .should('be.visible', { timeout: 5000 })
    .click({ force: true });
  
  cy.log(`理由選択完了: "${reason}"`);
});

// TSの型定義
declare global {
  namespace Cypress {
    interface Chainable {
      addTask(taskName: string, options?: object): Chainable<Element>;
      waitForTask(taskName: string, options?: object): Chainable<Element>;
      selectAsNotTodo(taskName: string): Chainable<Element>;
      selectReason(reason: string): Chainable<Element>;
    }
  }
}
