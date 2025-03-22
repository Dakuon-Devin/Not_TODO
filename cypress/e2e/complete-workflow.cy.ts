describe('完全なワークフローのE2Eテスト', () => {
  beforeEach(() => {
    // テスト前にアプリケーションをリセット
    cy.clearLocalStorage();
    cy.visit('/');
    // ページが完全に読み込まれるのを待つ
    cy.get('h1').contains('Not-ToDo').should('be.visible');
  });

  it('タスクの追加から3つのNot-ToDo選択までの完全なワークフロー', () => {
    // 5つのタスクを追加
    cy.addTask('朝のジョギング');
    // タスクが追加されたことを確認
    cy.contains('朝のジョギング').should('exist');
    
    cy.addTask('メールチェック');
    cy.contains('メールチェック').should('exist');
    
    cy.addTask('会議の準備');
    cy.contains('会議の準備').should('exist');
    
    cy.addTask('レポート作成');
    cy.contains('レポート作成').should('exist');
    
    cy.addTask('オンライン勉強会');
    cy.contains('オンライン勉強会').should('exist');
    
    // 3つのタスクをNot-ToDoとして選択
    cy.selectAsNotTodo('朝のジョギング');
    cy.selectAsNotTodo('レポート作成');
    cy.selectAsNotTodo('オンライン勉強会');
    
    // 選択数が表示されていることを確認
    cy.contains('3/3 選択中').should('exist');
    
    // 次へボタンをクリック
    cy.contains('次へ').click();
    
    // 理由選択画面に遷移したことを確認
    cy.contains('なぜやらない？').should('exist');
    
    // 各タスクの理由を選択
    cy.contains('朝のジョギング').should('exist');
    cy.selectReason('今日は無理しない');
    
    cy.contains('レポート作成').should('exist');
    cy.selectReason('優先度が低い');
    
    cy.contains('オンライン勉強会').should('exist');
    cy.selectReason('気が進まない');
    
    // Not-ToDoリスト画面に遷移したことを確認
    cy.contains('今日はこれを置いていく').should('exist');
    
    // 各タスクとその理由が表示されていることを確認
    cy.contains('朝のジョギング').should('exist');
    cy.contains('理由: 今日は無理しない').should('exist');
    cy.contains('レポート作成').should('exist');
    cy.contains('理由: 優先度が低い').should('exist');
    cy.contains('オンライン勉強会').should('exist');
    cy.contains('理由: 気が進まない').should('exist');
    
    // タスク選択画面に戻る
    cy.contains('タスクに戻る').click();
    
    // タスク選択画面に戻ったことを確認
    cy.contains('今日は何を置いていく？').should('exist');
    
    // Not-ToDo選択されたタスクに取り消し線が付いていることを確認
    cy.contains('朝のジョギング').should('have.class', 'line-through');
    cy.contains('レポート作成').should('have.class', 'line-through');
    cy.contains('オンライン勉強会').should('have.class', 'line-through');
  });
});
