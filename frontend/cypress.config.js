const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      on('before:browser:launch', (browser = {}, launchOptions) => {
        if (browser.family === 'chromium' && browser.name !== 'electron') {
          launchOptions.args.push('--start-fullscreen')
      
          return launchOptions
        }
      
        if (browser.name === 'electron') {
          launchOptions.preferences.fullscreen = true
      
          return launchOptions
        }
      })
    },
  },
});
