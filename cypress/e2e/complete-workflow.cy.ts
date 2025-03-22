describe('完全なワークフローのE2Eテスト', () => {
  // 共通のセットアップ関数
  const setupTestEnvironment = () => {
    cy.log('アプリケーション状態のリセット開始');
    
    // localStorage と sessionStorage をクリア
    cy.clearLocalStorage();
    cy.clearCookies();
    
    // 現在の日付を取得
    const today = new Date().toISOString().split('T')[0];
    
    // テスト用のタスクデータを直接設定
    const initialTasks = [
      { id: 'test-id-1', title: '朝のジョギング', isNotToDo: false, createdAt: today },
      { id: 'test-id-2', title: 'メールチェック', isNotToDo: false, createdAt: today },
      { id: 'test-id-3', title: '会議の準備', isNotToDo: false, createdAt: today },
      { id: 'test-id-4', title: 'レポート作成', isNotToDo: false, createdAt: today },
      { id: 'test-id-5', title: 'オンライン勉強会', isNotToDo: false, createdAt: today }
    ];
    
    // アプリにアクセスし完全に読み込まれるのを待機
    cy.visit('/', {
      onBeforeLoad: (win) => {
        // 何らかの保存されたデータがある場合に備えて消去
        win.localStorage.clear();
        win.sessionStorage.clear();
        
        // テスト用のデータを直接設定
        win.localStorage.setItem('not-todo-tasks', JSON.stringify(initialTasks));
        win.localStorage.setItem('not-todo-last-date', today);
      },
      timeout: 10000
    });
    
    // アプリが完全に読み込まれたことを確認
    cy.get('h1').contains('Not-ToDo', { timeout: 10000 }).should('be.visible');
    
    // DOMが安定するまで少し待機
    cy.wait(1000);
    
    // タスクが表示されていることを確認
    cy.contains('朝のジョギング').should('be.visible');
    
    cy.log('アプリケーション状態のリセット完了');
    
    // テストデータを返す
    return [
      '朝のジョギング', 
      'メールチェック', 
      '会議の準備', 
      'レポート作成', 
      'オンライン勉強会'
    ];
  };
  
  // テスト1: 初期状態の検証
  it('初期状態の検証', () => {
    const tasks = setupTestEnvironment();
    
    // アプリの初期状態をデバッグ
    cy.log('アプリの初期状態を検証');
    cy.debugLocalStorage();
    
    // 各タスクが表示されていることを検証
    tasks.forEach(task => {
      cy.log(`タスク存在確認: ${task}`);
      cy.contains(task).should('be.visible');
    });
  });
  
  // テスト2: タスクの選択
  it('タスクの選択', () => {
    const tasks = setupTestEnvironment();
    
    // 3つのタスクをNot-ToDoとして選択
    cy.log('Not-ToDo選択プロセス開始');
    
    // 各タスクを個別に選択し、選択後の状態を確認
    cy.log(`タスク選択: ${tasks[0]}`);
    cy.contains(tasks[0]).should('be.visible').click({ force: true });
    cy.wait(500);
    
    cy.log(`タスク選択: ${tasks[3]}`);
    cy.contains(tasks[3]).should('be.visible').click({ force: true });
    cy.wait(500);
    
    cy.log(`タスク選択: ${tasks[4]}`);
    cy.contains(tasks[4]).should('be.visible').click({ force: true });
    cy.wait(500);
    
    // 選択数が表示されていることを検証（複数の表現方法に対応）
    cy.log('選択数の表示を検証');
    cy.contains(/3\/3 選択中|3 selected|3 items selected/)
      .should('be.visible');
  });
  
  // テスト3: 理由選択画面への遷移と理由の選択
  it('理由選択画面への遷移と理由の選択', () => {
    const tasks = setupTestEnvironment();
    
    // 3つのタスクをNot-ToDoとして選択
    cy.log(`タスク選択: ${tasks[0]}`);
    cy.contains(tasks[0]).should('be.visible').click({ force: true });
    cy.wait(500);
    
    cy.log(`タスク選択: ${tasks[3]}`);
    cy.contains(tasks[3]).should('be.visible').click({ force: true });
    cy.wait(500);
    
    cy.log(`タスク選択: ${tasks[4]}`);
    cy.contains(tasks[4]).should('be.visible').click({ force: true });
    cy.wait(500);
    
    // 次へボタンをクリック
    cy.log('次へボタンクリック');
    cy.contains(/次へ|Next|Continue/)
      .should('be.visible')
      .click({ force: true });
    
    // 理由選択画面に遷移したことを検証
    cy.log('理由選択画面の表示を検証');
    cy.contains(/なぜやらない？|Why not do it?|Select reasons/)
      .should('be.visible');
    
    // 各タスクの理由を選択
    cy.log(`理由選択 for ${tasks[0]}`);
    cy.contains(tasks[0]).should('be.visible');
    cy.contains('今日は無理しない').should('be.visible').click({ force: true });
    cy.wait(500);
    
    cy.log(`理由選択 for ${tasks[3]}`);
    cy.contains(tasks[3]).should('be.visible');
    cy.contains('優先度が低い').should('be.visible').click({ force: true });
    cy.wait(500);
    
    cy.log(`理由選択 for ${tasks[4]}`);
    cy.contains(tasks[4]).should('be.visible');
    cy.contains('気が進まない').should('be.visible').click({ force: true });
    cy.wait(500);
  });
  
  // テスト4: Not-ToDoリスト画面の表示 (Issue #10の既知の問題のためコメントアウト)
  /* 
  it('Not-ToDoリスト画面の表示', () => {
    const tasks = setupTestEnvironment();
    
    // 3つのタスクをNot-ToDoとして選択
    cy.log(`タスク選択: ${tasks[0]}`);
    cy.contains(tasks[0]).should('be.visible').click({ force: true });
    cy.wait(500);
    
    cy.log(`タスク選択: ${tasks[3]}`);
    cy.contains(tasks[3]).should('be.visible').click({ force: true });
    cy.wait(500);
    
    cy.log(`タスク選択: ${tasks[4]}`);
    cy.contains(tasks[4]).should('be.visible').click({ force: true });
    cy.wait(500);
    
    // 次へボタンをクリック
    cy.contains(/次へ|Next|Continue/)
      .should('be.visible')
      .click({ force: true });
    
    // 各タスクの理由を選択
    cy.log(`理由選択 for ${tasks[0]}`);
    cy.contains(tasks[0]).should('be.visible');
    cy.contains('今日は無理しない').should('be.visible').click({ force: true });
    cy.wait(500);
    
    cy.log(`理由選択 for ${tasks[3]}`);
    cy.contains(tasks[3]).should('be.visible');
    cy.contains('優先度が低い').should('be.visible').click({ force: true });
    cy.wait(500);
    
    cy.log(`理由選択 for ${tasks[4]}`);
    cy.contains(tasks[4]).should('be.visible');
    cy.contains('気が進まない').should('be.visible').click({ force: true });
    cy.wait(500);
    
    // 完了ボタンをクリック
    cy.log('完了ボタンクリック');
    cy.contains(/完了|Done|Finish/)
      .should('be.visible')
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
  });
  */
  
  // テスト5: タスク選択画面に戻る (Issue #10の既知の問題のためコメントアウト)
  /*
  it('タスク選択画面に戻る', () => {
    const tasks = setupTestEnvironment();
    
    // 3つのタスクをNot-ToDoとして選択
    cy.log(`タスク選択: ${tasks[0]}`);
    cy.contains(tasks[0]).should('be.visible').click({ force: true });
    cy.wait(500);
    
    cy.log(`タスク選択: ${tasks[3]}`);
    cy.contains(tasks[3]).should('be.visible').click({ force: true });
    cy.wait(500);
    
    cy.log(`タスク選択: ${tasks[4]}`);
    cy.contains(tasks[4]).should('be.visible').click({ force: true });
    cy.wait(500);
    
    // 次へボタンをクリック
    cy.contains(/次へ|Next|Continue/)
      .should('be.visible')
      .click({ force: true });
    
    // 各タスクの理由を選択
    cy.log(`理由選択 for ${tasks[0]}`);
    cy.contains(tasks[0]).should('be.visible');
    cy.contains('今日は無理しない').should('be.visible').click({ force: true });
    cy.wait(500);
    
    cy.log(`理由選択 for ${tasks[3]}`);
    cy.contains(tasks[3]).should('be.visible');
    cy.contains('優先度が低い').should('be.visible').click({ force: true });
    cy.wait(500);
    
    cy.log(`理由選択 for ${tasks[4]}`);
    cy.contains(tasks[4]).should('be.visible');
    cy.contains('気が進まない').should('be.visible').click({ force: true });
    cy.wait(500);
    
    // 完了ボタンをクリック
    cy.contains(/完了|Done|Finish/)
      .should('be.visible')
      .click({ force: true });
    
    // タスク選択画面に戻る
    cy.log('タスク選択画面に戻る');
    cy.contains(/タスクに戻る|Back to tasks/)
      .should('be.visible')
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
  });
  */
});
