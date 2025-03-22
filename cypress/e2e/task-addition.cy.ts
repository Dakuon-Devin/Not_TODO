describe('タスク追加のE2Eテスト', () => {
  beforeEach(() => {
    // テスト前にアプリケーションをリセット
    cy.clearLocalStorage();
    cy.visit('/');
  });

  it('新しいタスクを追加できる', () => {
    // タスクを追加
    cy.addTask('E2Eテスト用タスク');

    // タスクが追加されたことを確認
    cy.contains('E2Eテスト用タスク').should('exist');
  });

  it('複数のタスクを追加できる', () => {
    // 複数のタスクを追加
    cy.addTask('E2Eテスト用タスク1');
    cy.addTask('E2Eテスト用タスク2');
    cy.addTask('E2Eテスト用タスク3');

    // すべてのタスクが追加されたことを確認
    cy.contains('E2Eテスト用タスク1').should('exist');
    cy.contains('E2Eテスト用タスク2').should('exist');
    cy.contains('E2Eテスト用タスク3').should('exist');
  });
});
