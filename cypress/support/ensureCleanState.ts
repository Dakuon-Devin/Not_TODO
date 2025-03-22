/**
 * アプリケーション状態を確実にリセットするためのユーティリティ
 */

/**
 * アプリケーションの状態を完全にクリーンな状態にリセットする
 * 
 * Returns:
 *     Cypress チェーン
 */
Cypress.Commands.add('ensureCleanState', () => {
  cy.log('アプリケーション状態の完全リセット開始');
  
  // ブラウザキャッシュをクリア
  cy.clearLocalStorage();
  cy.clearCookies();
  
  // ページにアクセスする前にブラウザ自体をリロード
  cy.reload({ forceReload: true });
  
  // アプリにアクセスし完全に読み込まれるのを待機
  cy.visit('/', {
    onBeforeLoad: (win) => {
      // 何らかの保存されたデータがある場合に備えて消去
      win.localStorage.clear();
      win.sessionStorage.clear();
      
      // localStorage が空であることを確認
      expect(win.localStorage.length).to.eq(0);
    },
    timeout: 10000
  });
  
  // アプリが完全に読み込まれたことを確認
  cy.get('h1').contains('Not-ToDo', { timeout: 10000 }).should('be.visible');
  
  // DOMが安定するまで少し待機
  cy.wait(500);
  
  cy.log('アプリケーション状態の完全リセット完了');
});

// 型定義
declare global {
  namespace Cypress {
    interface Chainable {
      ensureCleanState(): Chainable<Element>;
    }
  }
}

export {};
