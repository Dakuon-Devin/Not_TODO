describe('Not-ToDo選択のE2Eテスト', () => {
  beforeEach(() => {
    // テスト前にアプリケーションをリセット
    cy.clearLocalStorage();
    cy.visit('/');
    
    // テスト用のタスクを3つ追加
    cy.addTask('E2Eテスト用タスク1');
    cy.addTask('E2Eテスト用タスク2');
    cy.addTask('E2Eテスト用タスク3');
  });

  it('3つのタスクをNot-ToDoとして選択し、理由を設定できる', () => {
    // 3つのタスクを選択
    cy.selectAsNotTodo('E2Eテスト用タスク1');
    cy.selectAsNotTodo('E2Eテスト用タスク2');
    cy.selectAsNotTodo('E2Eテスト用タスク3');
    
    // 選択数が表示されていることを確認
    cy.contains('3/3 選択中').should('exist');
    
    // 次へボタンをクリック
    cy.contains('次へ').click();
    
    // 理由選択画面に遷移したことを確認
    cy.contains('なぜやらない？').should('exist');
    
    // 1つ目のタスクの理由を選択
    cy.contains('E2Eテスト用タスク1').should('exist');
    cy.selectReason('優先度が低い');
    
    // 2つ目のタスクの理由を選択
    cy.contains('E2Eテスト用タスク2').should('exist');
    cy.selectReason('今日は無理しない');
    
    // 3つ目のタスクの理由を選択
    cy.contains('E2Eテスト用タスク3').should('exist');
    cy.selectReason('気が進まない');
    
    // Not-ToDoリスト画面に遷移したことを確認
    cy.contains('今日はこれを置いていく').should('exist');
    
    // 各タスクとその理由が表示されていることを確認
    cy.contains('E2Eテスト用タスク1').should('exist');
    cy.contains('理由: 優先度が低い').should('exist');
    cy.contains('E2Eテスト用タスク2').should('exist');
    cy.contains('理由: 今日は無理しない').should('exist');
    cy.contains('E2Eテスト用タスク3').should('exist');
    cy.contains('理由: 気が進まない').should('exist');
    
    // タスク選択画面に戻る
    cy.contains('タスクに戻る').click();
    
    // タスク選択画面に戻ったことを確認
    cy.contains('今日は何を置いていく？').should('exist');
    
    // Not-ToDo選択されたタスクに取り消し線が付いていることを確認
    cy.contains('E2Eテスト用タスク1').should('have.class', 'line-through');
    cy.contains('E2Eテスト用タスク2').should('have.class', 'line-through');
    cy.contains('E2Eテスト用タスク3').should('have.class', 'line-through');
  });
});
