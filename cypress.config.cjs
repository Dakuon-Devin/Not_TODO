const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    supportFile: 'cypress/support/e2e.ts',
    specPattern: 'cypress/e2e/**/*.cy.{js,jsx,ts,tsx}',
    video: true, // ビデオ記録を有効化
    videoCompression: 32, // 低い値ほど高品質（0-51）
    screenshotOnRunFailure: true,
    
    // タイムアウト設定
    defaultCommandTimeout: 10000,
    pageLoadTimeout: 30000,
    requestTimeout: 10000,
    responseTimeout: 30000,
    
    // リトライ設定
    retries: {
      runMode: 2, // CI実行時に2回リトライ
      openMode: 1, // 開発時に1回リトライ
    },
    
    setupNodeEvents(on, config) {
      // Cypressプラグインの設定
      on('task', {
        log(message) {
          console.log(message)
          return null
        }
      })
      
      // 環境変数で設定を上書き可能に
      if (process.env.DEBUG_MODE === 'true') {
        config.defaultCommandTimeout = 15000;
        config.pageLoadTimeout = 45000;
      }
      
      return config
    }
  },
  
  // 環境変数
  env: {
    // テスト実行時の速度調整（値が小さいほど遅く実行）
    COMMAND_DELAY: process.env.DEBUG_MODE === 'true' ? 300 : 0,
  },
  
  // Cypressブラウザの表示設定
  viewportWidth: 1280,
  viewportHeight: 800,
})
