const { defineConfig } = require('cypress')

module.exports = defineConfig({
  e2e: {
    baseUrl: 'http://localhost:5173',
    viewportWidth: 1280,
    viewportHeight: 720,
    defaultCommandTimeout: 10000,
    setupNodeEvents(on, config) {
      // E2Eテスト用のNode.jsイベントリスナーを実装
      on('task', {
        log(message) {
          console.log(message)
          return null
        }
      })
      return config
    }
  }
})
