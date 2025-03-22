// カスタムコマンド

// ハンバーガーメニューを開く
Cypress.Commands.add('openHamburgerMenu', () => {
  // ヘッダーのハンバーガーメニューボタンを特定して強制的にクリック
  cy.get('header button').last().click({ force: true });
  // メニューが表示されるのを待つ
  cy.get('div.absolute').should('be.visible');
  cy.log('ハンバーガーメニューを開きました');
});

// タスクを追加する
Cypress.Commands.add('addTask', (taskTitle) => {
  // ハンバーガーメニューを開く
  cy.openHamburgerMenu();
  
  // タスク追加ボタンをクリック
  cy.contains('button', 'タスクを追加').click({ force: true });
  
  // フォームが表示されるのを待つ
  cy.get('form').should('be.visible', { timeout: 5000 });
  cy.log('タスク追加フォームが表示されました');
  
  // 入力フィールドにタスク名を入力
  cy.get('input[placeholder="タスクを入力"]').should('be.visible', { timeout: 5000 }).as('taskInput');
  cy.get('@taskInput').clear().type(taskTitle, { force: true });
  
  // 追加ボタンをクリック
  cy.get('form').find('button[type="submit"]').contains('追加').click({ force: true });
  
  // フォームが閉じるのを待つ
  cy.get('form').should('not.exist', { timeout: 5000 });
  cy.log(`タスク ${taskTitle} を追加しました`);
  
  // タスクが追加されるのを待つ
  cy.wait(1000);
});

// Not-ToDoとしてタスクを選択する
Cypress.Commands.add('selectAsNotTodo', (taskTitle) => {
  cy.contains(taskTitle).should('be.visible', { timeout: 5000 }).click({ force: true });
  cy.log(`タスク ${taskTitle} を選択しました`);
});

// 理由を選択する
Cypress.Commands.add('selectReason', (reason) => {
  cy.contains(reason).should('be.visible', { timeout: 5000 }).click({ force: true });
  cy.log(`理由 ${reason} を選択しました`);
});
