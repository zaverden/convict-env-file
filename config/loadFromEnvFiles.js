const { existsSync, readFileSync } = require('fs')

module.exports = function loadFromEnvFiles(config) {
  const env = config.getEnv()
  for (const key of Object.keys(config._env)) {
    if (env[key] !== undefined) {
      // if exact key exists we don't override it
      continue
    }
    const fileKey = `${key}_FILE`
    if (env[fileKey] === undefined) {
      continue
    }
    const filePath = env[fileKey]
    if (!existsSync(filePath)) {
      throw new Error(`File '${filePath}' from $${fileKey} is missing`)
    }
    try {
      const fileContent = readFileSync(filePath, 'utf8').trim() // TODO: trim is questionable
      config._env[key]
        .forEach(configKey => config.set(configKey, fileContent))
    } catch (err) {
      throw new Error(
        `Failed to load file '${filePath}' from $${fileKey}: ${err}`
      )
    }
  }
}
