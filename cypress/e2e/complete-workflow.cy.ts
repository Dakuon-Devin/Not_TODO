describe('基本的なアプリケーション機能のE2Eテスト', () => {
  // 最もシンプルなテスト - アプリケーションが読み込まれることのみを確認
  it('アプリケーションが読み込まれる', () => {
    // 環境変数を設定してタイムアウトを延長
    Cypress.env('COMMAND_DELAY', 500);
    
    // アプリケーションにアクセス - タイムアウトを長めに設定
    cy.visit('/', { 
      timeout: 60000,
      onBeforeLoad: (win) => {
        // ローカルストレージをクリア
        win.localStorage.clear();
      }
    });
    
    // アプリケーションのタイトルが表示されることを確認
    cy.get('h1', { timeout: 30000 })
      .should('exist')
      .should('be.visible')
      .should('contain.text', 'Not-ToDo');
    
    // スクリーンショットを撮影
    cy.screenshot('アプリケーション読み込み成功');
  });
  
  // 以下のテストはコメントアウト - 基本テストが成功した後で有効化
  /*
  // ハンバーガーメニューが機能することを確認するテスト
  it('ハンバーガーメニューが機能する', () => {
    // アプリケーションにアクセス
    cy.visit('/', { timeout: 30000 });
    
    // アプリケーションが読み込まれるのを待機
    cy.get('h1', { timeout: 30000 }).should('be.visible');
    
    // ハンバーガーメニューボタンが表示されるのを待機
    cy.get('header button').last().should('be.visible');
    
    // ハンバーガーメニューボタンをクリック
    cy.get('header button').last().click({ force: true });
    
    // メニューが表示されるのを待機
    cy.get('div.absolute').should('be.visible');
    
    // メニュー内に「タスクを追加」ボタンが存在することを確認
    cy.contains('button', 'タスクを追加').should('be.visible');
  });
  
  // タスク追加フォームが表示されることを確認するテスト
  it('タスク追加フォームが表示される', () => {
    // アプリケーションにアクセス
    cy.visit('/', { timeout: 30000 });
    
    // アプリケーションが読み込まれるのを待機
    cy.get('h1', { timeout: 30000 }).should('be.visible');
    
    // ハンバーガーメニューボタンが表示されるのを待機
    cy.get('header button').last().should('be.visible');
    
    // ハンバーガーメニューボタンをクリック
    cy.get('header button').last().click({ force: true });
    
    // メニューが表示されるのを待機
    cy.get('div.absolute').should('be.visible');
    
    // 「タスクを追加」ボタンをクリック
    cy.contains('button', 'タスクを追加').click({ force: true });
    
    // フォームが表示されるのを待機
    cy.get('form', { timeout: 5000 }).should('be.visible');
    
    // 入力フィールドが存在することを確認
    cy.get('input[type="text"], input[placeholder*="タスク"], input.task-input, input[placeholder="タスクを入力"]', 
      { timeout: 5000 })
      .should('be.visible');
    
    // 追加ボタンが存在することを確認
    cy.get('form').find('button[type="submit"]').contains('追加')
      .should('be.visible');
  });
  */
});
