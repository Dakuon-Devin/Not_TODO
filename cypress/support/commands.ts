// カスタムコマンド

// ハンバーガーメニューを開く
Cypress.Commands.add('openHamburgerMenu', () => {
  cy.get('button').first().click({ force: true });
});

// タスクを追加する
Cypress.Commands.add('addTask', (taskTitle) => {
  cy.openHamburgerMenu();
  cy.contains('タスクを追加').click({ force: true });
  cy.get('input[placeholder="タスクを入力"]', { timeout: 10000 }).should('be.visible').type(taskTitle);
  cy.contains('追加').click({ force: true });
});

// Not-ToDoとしてタスクを選択する
Cypress.Commands.add('selectAsNotTodo', (taskTitle) => {
  cy.contains(taskTitle).click({ force: true });
});

// 理由を選択する
Cypress.Commands.add('selectReason', (reason) => {
  cy.contains(reason).click({ force: true });
});
