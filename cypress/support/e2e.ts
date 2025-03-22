// カスタムコマンドとデバッグユーティリティのインポート
import './commands';
import './debug-utils';

// テスト実行前のフック
beforeEach(() => {
  // テスト開始のログ出力
  cy.log('テスト開始');
  
  // ローカルストレージをクリア
  cy.clearLocalStorage();
});

// テスト実行後のフック
afterEach(() => {
  // テスト終了のログ出力
  cy.log('テスト終了');
});

// テスト失敗時のハンドラ
Cypress.on('test:after:run', (test) => {
  if (test && test.state === 'failed') {
    cy.log('テスト失敗');
  }
});
