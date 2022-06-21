# Readme

Plugins from [bytesfriends/rush-plugins](https://github.com/bytesfriends/rush-plugins) installed here

Packages in this repo share config files by [rush-init-project-plugin](https://github.com/bytesfriends/rush-plugins/blob/main/rush-plugins/rush-init-project-plugin/README.md) instead of a rig package

## About rig package

- [Adding more tasks - Rush](https://rushstack.io/pages/heft_tutorials/adding_tasks/)
- [Using rig packages - Heft](https://rushstack.io/pages/heft/rig_packages/)
- [heft-node-rig-tutorial](https://github.com/microsoft/rushstack-samples/blob/main/heft/heft-node-rig-tutorial/README.md)
- [@rushstack/heft-node-rig](https://github.com/microsoft/rushstack/blob/main/rigs/heft-node-rig/README.md)

### ESLint

> However, if you use the ESLint extension for VS Code, it will try to resolve the eslint package from your project folder. Thus it may still be useful to add ESLint to your package.json file

[heft doc about ESLint](https://rushstack.io/pages/heft_tasks/eslint/#packagejson-dependencies)

Related issues:

- [[eslint-config] rush update fails on eslint-config using @rushstack/heft-node-rig riggable dependencies #2832](https://github.com/microsoft/rushstack/issues/2832)
- [[eslint-config] Loading of ESLint shareable configurations via Heft rigs #3021](https://github.com/microsoft/rushstack/issues/3021)
- [[heft] Allow for custom paths to config files shared in seperate repos #2779](https://github.com/microsoft/rushstack/issues/2779)
- [If you need additional custom lint rules, it's recommended to create a custom NPM package that extends from `@rushstack/eslint-config`.](https://rushstack.io/pages/heft_tasks/eslint/#config-files)
