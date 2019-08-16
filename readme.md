# Problem
Docker Swarm has Secrets support. Each secret is mapped to file system as file under `/run/secrets/secret-name`. See details in [this issue](https://github.com/mozilla/node-convict/issues/305)

# Solution
Add support for `*_FILE` env vars. If `MY_VAR` does not exists, app should check `MY_VAR_FILE`, read file content from provided path and use it as value.

# Implementation
I hope someone will solve [this issue in convict](https://github.com/mozilla/node-convict/issues/305).
For now you can use [loadFromEnvFiles function](./config/loadFromEnvFiles.js).

And [here](./config/index.js#L19-L28) you can see an usage example.
