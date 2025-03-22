describe('完全なワークフローのE2Eテスト', () => {
  beforeEach(() => {
    // テスト前にアプリケーションを完全にリセット
    cy.clearLocalStorage();
    cy.visit('/');
    // ページが完全に読み込まれるのを待つ
    cy.get('h1').contains('Not-ToDo').should('be.visible');
    // ローカルストレージの初期化を確認する
    cy.window().then((win) => {
      win.localStorage.clear();
      expect(win.localStorage.length).to.eq(0);
    });
  });

  it('タスクの追加から3つのNot-ToDo選択までの完全なワークフロー', () => {
    // デバッグ用：アプリの初期状態を確認
    cy.log('アプリの初期状態を確認');
    
    // 最初のタスクを追加して待機
    cy.log('最初のタスクを追加');
    cy.addTask('朝のジョギング');
    
    // 追加されたタスクが表示されるまで十分に待機
    cy.log('タスクが追加されたことを確認');
    cy.get('.task-item', { timeout: 10000 }).should('exist');
    cy.contains('朝のジョギング', { timeout: 10000 }).should('be.visible');
    
    // 2つ目のタスクを追加
    cy.log('2つ目のタスクを追加');
    cy.addTask('メールチェック');
    cy.contains('メールチェック', { timeout: 10000 }).should('be.visible');
    
    // 3つ目のタスクを追加
    cy.log('3つ目のタスクを追加');
    cy.addTask('会議の準備');
    cy.contains('会議の準備', { timeout: 10000 }).should('be.visible');
    
    // 4つ目のタスクを追加
    cy.log('4つ目のタスクを追加');
    cy.addTask('レポート作成');
    cy.contains('レポート作成', { timeout: 10000 }).should('be.visible');
    
    // 5つ目のタスクを追加
    cy.log('5つ目のタスクを追加');
    cy.addTask('オンライン勉強会');
    cy.contains('オンライン勉強会', { timeout: 10000 }).should('be.visible');
    
    // タスクリストの状態を確認
    cy.log('タスクリストの状態を確認');
    cy.get('.task-item').should('have.length.at.least', 5);
    
    // 3つのタスクをNot-ToDoとして選択
    cy.log('タスクを選択');
    cy.selectAsNotTodo('朝のジョギング');
    cy.selectAsNotTodo('レポート作成');
    cy.selectAsNotTodo('オンライン勉強会');
    
    // 選択数が表示されていることを確認
    cy.log('選択数を確認');
    cy.contains('3/3 選択中', { timeout: 10000 }).should('be.visible');
    
    // 次へボタンをクリック
    cy.log('次へボタンをクリック');
    cy.contains('次へ').click({ force: true });
    
    // 理由選択画面に遷移したことを確認
    cy.log('理由選択画面を確認');
    cy.contains('なぜやらない？', { timeout: 10000 }).should('be.visible');
    
    // 各タスクの理由を選択
    cy.log('理由を選択: 朝のジョギング');
    cy.contains('朝のジョギング', { timeout: 10000 }).should('be.visible');
    cy.selectReason('今日は無理しない');
    
    cy.log('理由を選択: レポート作成');
    cy.contains('レポート作成', { timeout: 10000 }).should('be.visible');
    cy.selectReason('優先度が低い');
    
    cy.log('理由を選択: オンライン勉強会');
    cy.contains('オンライン勉強会', { timeout: 10000 }).should('be.visible');
    cy.selectReason('気が進まない');
    
    // Not-ToDoリスト画面に遷移したことを確認
    cy.log('Not-ToDoリスト画面を確認');
    cy.contains('今日はこれを置いていく', { timeout: 10000 }).should('be.visible');
    
    // 各タスクとその理由が表示されていることを確認
    cy.log('タスクと理由を確認');
    cy.contains('朝のジョギング', { timeout: 10000 }).should('be.visible');
    cy.contains('理由: 今日は無理しない', { timeout: 10000 }).should('be.visible');
    cy.contains('レポート作成', { timeout: 10000 }).should('be.visible');
    cy.contains('理由: 優先度が低い', { timeout: 10000 }).should('be.visible');
    cy.contains('オンライン勉強会', { timeout: 10000 }).should('be.visible');
    cy.contains('理由: 気が進まない', { timeout: 10000 }).should('be.visible');
    
    // タスク選択画面に戻る
    cy.log('タスク選択画面に戻る');
    cy.contains('タスクに戻る').click({ force: true });
    
    // タスク選択画面に戻ったことを確認
    cy.log('タスク選択画面を確認');
    cy.contains('今日は何を置いていく？', { timeout: 10000 }).should('be.visible');
    
    // Not-ToDo選択されたタスクに取り消し線が付いていることを確認
    cy.log('取り消し線を確認');
    cy.contains('朝のジョギング', { timeout: 10000 }).should('have.class', 'line-through');
    cy.contains('レポート作成', { timeout: 10000 }).should('have.class', 'line-through');
    cy.contains('オンライン勉強会', { timeout: 10000 }).should('have.class', 'line-through');
  });
});
