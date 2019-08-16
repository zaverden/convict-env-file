const convict = require('convict')
const loadFromEnvFiles = require('./loadFromEnvFiles')

const config = convict({
  externalApi: {
    user: {
      doc: 'Username to access external API',
      default: 'service-account',
      format: String,
      env: 'API_USER'
    },
    password: {
      doc: 'Password to access external API',
      default: 'not set',
      format: String,
      env: 'API_PASSWORD'
    },
  },
}, {
    // `env` option is for quick testing purpose only
    env: {
      API_USER: 'admin',
      // API_PASSWORD: 'admin-admin', // uncomment to check that exact env var has priority over a file var
      API_PASSWORD_FILE: './overrides/pswd', // resolve from project root (cwd)
    }
  })

loadFromEnvFiles(config)

module.exports = config
