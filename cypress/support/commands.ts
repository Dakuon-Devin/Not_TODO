// カスタムコマンド

// ハンバーガーメニューを開く
Cypress.Commands.add('openHamburgerMenu', () => {
  // ヘッダーのハンバーガーメニューボタンを特定して強制的にクリック
  cy.get('header button').first().click({ force: true });
  // メニューが表示されるのを待つ
  cy.get('div.absolute').should('be.visible');
});

// タスクを追加する
Cypress.Commands.add('addTask', (taskTitle) => {
  // ハンバーガーメニューを開く
  cy.openHamburgerMenu();
  
  // タスク追加ボタンをクリック
  cy.contains('button', 'タスクを追加').click({ force: true });
  
  // フォームが表示されるのを待つ
  cy.get('form').should('be.visible');
  
  // 入力フィールドにタスク名を入力
  cy.get('input[placeholder="タスクを入力"]', { timeout: 10000 })
    .should('be.visible')
    .clear()
    .type(taskTitle, { force: true });
  
  // 追加ボタンをクリック
  cy.get('form').contains('button', '追加').click({ force: true });
  
  // タスクが追加されるのを待つ
  cy.wait(500);
});

// Not-ToDoとしてタスクを選択する
Cypress.Commands.add('selectAsNotTodo', (taskTitle) => {
  cy.contains(taskTitle).should('be.visible').click({ force: true });
});

// 理由を選択する
Cypress.Commands.add('selectReason', (reason) => {
  cy.contains(reason).should('be.visible').click({ force: true });
});
