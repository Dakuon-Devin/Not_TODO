describe('完全なワークフローのE2Eテスト', () => {
  beforeEach(() => {
    // テストごとにアプリケーションの状態をリセット
    cy.log('アプリケーション状態のリセット開始');
    
    // localStorage と sessionStorage をクリア
    cy.clearLocalStorage();
    cy.clearCookies();
    
    // アプリにアクセスし完全に読み込まれるのを待機
    cy.visit('/', {
      onBeforeLoad: (win) => {
        // 何らかの保存されたデータがある場合に備えて消去
        win.localStorage.clear();
        win.sessionStorage.clear();
      },
      timeout: 10000
    });
    
    // アプリが完全に読み込まれたことを確認
    cy.get('h1').contains('Not-ToDo', { timeout: 10000 }).should('be.visible');
    
    // DOMが安定するまで少し待機
    cy.wait(500);
    
    cy.log('アプリケーション状態のリセット完了');
  });
  
  it('タスクの追加から3つのNot-ToDo選択までの完全なワークフロー', () => {
    // タスク追加のためのテストデータ
    const tasks = [
      '朝のジョギング', 
      'メールチェック', 
      '会議の準備', 
      'レポート作成', 
      'オンライン勉強会'
    ];
    
    // アプリの初期状態をデバッグ
    cy.log('アプリの初期状態を検証');
    cy.debugLocalStorage();
    
    // タスクを1つずつ追加し、各追加後に検証
    cy.log('タスク追加プロセス開始');
    
    // 最初のタスクを追加（問題の箇所）
    cy.log('最初のタスク追加: 朝のジョギング');
    cy.addTask(tasks[0]);
    
    // 現在のDOM状態を詳細にデバッグ
    cy.log('DOMの状態を検証');
    cy.debugDom('body');
    
    // 残りのタスクを追加
    for (let i = 1; i < tasks.length; i++) {
      cy.log(`タスク追加 ${i+1}番目: ${tasks[i]}`);
      cy.addTask(tasks[i]);
      cy.waitForTask(tasks[i]);
    }
    
    // タスクリストの状態を検証
    cy.log('タスクリストの検証');
    // 複数のセレクタで要素を探して堅牢性を高める
    cy.get('.task-item, li, div[role="listitem"]')
      .should('have.length.at.least', 5);
    
    // 各タスクが表示されていることを検証
    tasks.forEach(task => {
      cy.log(`タスク存在確認: ${task}`);
      cy.waitForTask(task);
    });
    
    // 3つのタスクをNot-ToDoとして選択
    cy.log('Not-ToDo選択プロセス開始');
    cy.selectAsNotTodo(tasks[0]); // 朝のジョギング
    cy.selectAsNotTodo(tasks[3]); // レポート作成
    cy.selectAsNotTodo(tasks[4]); // オンライン勉強会
    
    // 選択数が表示されていることを検証（複数の表現方法に対応）
    cy.log('選択数の表示を検証');
    cy.contains(/3\/3 選択中|3 selected|3 items selected/)
      .should('be.visible');
    
    // 次へボタンをクリック
    cy.log('次へボタンクリック');
    cy.contains(/次へ|Next|Continue/)
      .click({ force: true });
    
    // 理由選択画面に遷移したことを検証
    cy.log('理由選択画面の表示を検証');
    cy.contains(/なぜやらない？|Why not do it?|Select reasons/)
      .should('be.visible');
    
    // 各タスクの理由を選択
    cy.contains(tasks[0]).should('be.visible');
    cy.selectReason('今日は無理しない');
    
    cy.contains(tasks[3]).should('be.visible');
    cy.selectReason('優先度が低い');
    
    cy.contains(tasks[4]).should('be.visible');
    cy.selectReason('気が進まない');
    
    // 完了ボタンをクリック
    cy.log('完了ボタンクリック');
    cy.contains(/完了|Done|Finish/)
      .click({ force: true });
    
    // Not-ToDoリスト画面が表示されることを検証
    cy.log('Not-ToDoリスト画面表示を検証');
    cy.contains(/今日はこれを置いていく|Today's Not-ToDo list/)
      .should('be.visible');
    
    // 各タスクとその理由が表示されていることを検証
    [
      { task: tasks[0], reason: '今日は無理しない' },
      { task: tasks[3], reason: '優先度が低い' },
      { task: tasks[4], reason: '気が進まない' }
    ].forEach(({ task, reason }) => {
      cy.log(`タスクと理由の表示を検証: ${task} - ${reason}`);
      cy.contains(task).should('be.visible');
      cy.contains(`理由: ${reason}`).should('be.visible');
    });
    
    // タスク選択画面に戻る
    cy.log('タスク選択画面に戻る');
    cy.contains(/タスクに戻る|Back to tasks/)
      .click({ force: true });
    
    // タスク選択画面に戻ったことを検証
    cy.log('タスク選択画面表示を検証');
    cy.contains(/今日は何を置いていく？|What will you leave behind today?/)
      .should('be.visible');
    
    // Not-ToDo選択されたタスクに取り消し線が付いていることを検証
    [tasks[0], tasks[3], tasks[4]].forEach(task => {
      cy.log(`取り消し線の検証: ${task}`);
      cy.contains(task)
        .should('have.class', 'line-through');
    });
    
    cy.log('テスト完了: 全ワークフロー成功');
  });
});
