/**
 * DOM構造やアプリケーション状態のデバッグを支援するユーティリティ関数
 */

/**
 * 現在のDOM構造を詳細にログ出力する
 * 
 * Args:
 *     selector: デバッグしたい要素のセレクタ（デフォルトはbody）
 *     options: オプション設定
 * 
 * Returns:
 *     Cypress チェーン
 */
Cypress.Commands.add('debugDom', (
    selector: string = 'body',
    options: { 
      maxLength?: number, 
      includeAttributes?: boolean 
    } = {},
) => {
  const maxLength = options.maxLength || 500;
  const includeAttributes = options.includeAttributes !== false;
  
  cy.get(selector).then(($el) => {
    const html = $el.html();
    const shortened = html.length > maxLength 
      ? `${html.substring(0, maxLength)}... (${html.length - maxLength} more characters)` 
      : html;
    
    cy.log(`DOM Debug (${selector}):`);
    cy.log(shortened);
    
    if (includeAttributes) {
      const attrsObj: Record<string, string> = {};
      Array.from($el[0].attributes || []).forEach(attr => {
        attrsObj[attr.name] = attr.value;
      });
      
      if (Object.keys(attrsObj).length > 0) {
        cy.log(`Element attributes:`, attrsObj);
      }
    }
  });
});

/**
 * タスク関連要素の状態を詳細にログ出力する
 * 
 * Args:
 *     taskName: デバッグしたいタスクの名前
 * 
 * Returns:
 *     Cypress チェーン
 */
Cypress.Commands.add('debugTask', (taskName: string) => {
  cy.log(`Debugging task: "${taskName}"`);
  
  // タスク名を含む要素を探す
  cy.contains(taskName).then(($el) => {
    if ($el.length === 0) {
      cy.log(`Task "${taskName}" not found in DOM!`);
      return;
    }
    
    cy.log(`Found task element: ${$el.length} match(es)`);
    
    // 要素の詳細情報を取得
    const boundingRect = $el[0].getBoundingClientRect();
    const isVisible = $el.is(':visible');
    const styles = window.getComputedStyle($el[0]);
    const opacity = styles.opacity;
    const display = styles.display;
    const position = styles.position;
    
    // 要素のコンテキストを調査
    cy.log(`Visibility: ${isVisible ? 'Visible' : 'Hidden'}`);
    cy.log(`Position: x=${boundingRect.left}, y=${boundingRect.top}, w=${boundingRect.width}, h=${boundingRect.height}`);
    cy.log(`Style properties: opacity=${opacity}, display=${display}, position=${position}`);
    
    // 親要素の調査
    let parentInfo = '';
    let parent = $el.parent();
    for (let i = 0; i < 3 && parent.length; i++) {
      parentInfo += `\nParent[${i}]: ${parent.prop('tagName')}`;
      if (parent.attr('class')) {
        parentInfo += ` class="${parent.attr('class')}"`;
      }
      parent = parent.parent();
    }
    cy.log(`Parent elements:${parentInfo}`);
  });
});

/**
 * アプリケーションのローカルストレージ状態をログ出力する
 * 
 * Returns:
 *     Cypress チェーン
 */
Cypress.Commands.add('debugLocalStorage', () => {
  cy.window().then((win) => {
    const storage: Record<string, string> = {};
    for (let i = 0; i < win.localStorage.length; i++) {
      const key = win.localStorage.key(i);
      if (key) {
        storage[key] = win.localStorage.getItem(key) || '';
      }
    }
    
    const count = Object.keys(storage).length;
    cy.log(`LocalStorage items (${count}):`);
    
    if (count > 0) {
      Object.entries(storage).forEach(([key, value]) => {
        // 値が長すぎる場合は省略
        const displayValue = value.length > 100 
          ? `${value.substring(0, 100)}... (${value.length - 100} more characters)` 
          : value;
        cy.log(`  ${key}: ${displayValue}`);
      });
    } else {
      cy.log('  (empty)');
    }
  });
});

// TSの型定義
declare global {
  namespace Cypress {
    interface Chainable {
      debugDom(selector?: string, options?: object): Chainable<Element>;
      debugTask(taskName: string): Chainable<Element>;
      debugLocalStorage(): Chainable<Element>;
    }
  }
}

// デバッグユーティリティをエクスポート
export {};
