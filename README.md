# digai-frontend-hiring-challenge

Desafio para entrar na Digaí: Criar uma interface com a pergunta, gravação e reprodução de áudio e tempo máximo de resposta.

[`┣━━🡪 🔗 **Instruções** do Desafio`](https://marialauramendes.notion.site/Frontend-Hiring-Challenge-f998fa60b4774be795b5f2ac2a42dfd5)

 
![Logo Digai](https://file.notion.so/f/f/38077f14-5ad3-4a4c-81f7-b2156fe90c40/7fa315e4-c280-4b06-97d3-5e07b20f4e0d/full-icon.svg?table=block&id=6e4b7902-a602-4bfd-9846-bcca7af40cc2&spaceId=38077f14-5ad3-4a4c-81f7-b2156fe90c40&expirationTimestamp=1724508000000&signature=bex36v4uOObSM6ddnTZoX4V8bOvxPb02GSL6DQXdrS0&downloadName=full-icon.svg)

⚞ ◥◣◢◤ ⚟

## To Do

* Prototype:
  * [x] Plan the overview
  * [ ] Layout
  * [ ] Vestibulum
  * [ ] Interview
    * [ ] Audio Recorder
    * [ ] Audio Player
  * [ ] Submission
  * [ ] Home page
* Setup:
  * [x] Working simple app
  * [ ] Tailwind
  * [ ] styled-components
  * [ ] react router
  * [ ] Layout components
* Interface
  * [ ] Home page
    * [ ] List of interviews - New / Submitted / Replied
    * [ ] About ?
    * [ ] Profile ?
  * [ ] Vestibulum (Pre-interview) page
    * [ ] info & preparation
    * [ ] Start Interview button
  * [ ] Interview page
    * [ ] Interview-wide timer
    * [ ] Display the question
    * [ ] Start Recording answer component - Record / Pause / Continue / Stop (Finish)
    * [ ] Audio component - Play / Pause / Set
    * [ ] option to delete recording, to then record a new one
    * [ ] submit
    * [ ] auto-submit from timer
  * [ ] Submission page
    * [ ] info, show audio, etc

---
---
---
---
---

## Repo's creation default readme

### React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

### Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default tseslint.config({
  languageOptions: {
    // other options...
    parserOptions: {
      project: ['./tsconfig.node.json', './tsconfig.app.json'],
      tsconfigRootDir: import.meta.dirname,
    },
  },
})
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from 'eslint-plugin-react'

export default tseslint.config({
  // Set the react version
  settings: { react: { version: '18.3' } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs['jsx-runtime'].rules,
  },
})
```
