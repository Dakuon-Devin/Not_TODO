// カスタムコマンド

// ハンバーガーメニューを開く
Cypress.Commands.add('openHamburgerMenu', () => {
  cy.get('button').first().click();
});

// タスクを追加する
Cypress.Commands.add('addTask', (taskTitle) => {
  cy.openHamburgerMenu();
  cy.contains('タスクを追加').click();
  cy.get('input[placeholder="タスクを入力"]').type(taskTitle);
  cy.contains('追加').click();
});

// Not-ToDoとしてタスクを選択する
Cypress.Commands.add('selectAsNotTodo', (taskTitle) => {
  cy.contains(taskTitle).click();
});

// 理由を選択する
Cypress.Commands.add('selectReason', (reason) => {
  cy.contains(reason).click();
});
