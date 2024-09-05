# digai-frontend-hiring-challenge

Desafio para entrar na Digaí: Criar uma interface com a pergunta, gravação e reprodução de áudio e tempo máximo de resposta.

`┓`<br />
[`┣━━🡪 🔗 Instruções do Desafio`](https://marialauramendes.notion.site/Frontend-Hiring-Challenge-f998fa60b4774be795b5f2ac2a42dfd5) <br />
[`┣━━🡪 🔗 App Publicado online`](https://github.com/annibal/digai-frontend-hiring-challenge) <br />
`┛`<br />

### Instalação

```sh
# cd ~/MY_PROJECTS_FOLDER_PATH

# clonar o repositório
git clone "git@github.com:annibal/digai-frontend-hiring-challenge.git";

# mudar para o diretório criado
cd digai-frontend-hiring-challenge;

# instalar o yarn (se não tiver)
# corepack enable

# baixar dependências
yarn install;
```

<details>
  <summary>Opcional</summary>

```sh
# verificar a lista de arquivos e pastas:
ls -a1;

# .git/
# .github/
# .gitignore
# .tailwind-full-example.config.ts
# .vscode/
# LICENSE
# README.md
# eslint.config.js
# index.html
# node_modules/
# package.json
# postcss.config.js
# public/
# src/
# tailwind.config.ts
# tsconfig.app.json
# tsconfig.json
# tsconfig.node.json
# vite.config.ts
# yarn.lock
```

</details>

### Execução Local

```sh
yarn dev;
```

### Publicação e Deploy

```sh
# sugestão: verificar se tem problemas primeiro
yarn build;

yarn lint;

# dar push na branch main
git add .;
git commit -m "changes"
git push origin main;

# verificar os workflow runs do github actions:
https://github.com/annibal/digai-frontend-hiring-challenge/actions
```

## Extras:

### Backlog

<details>
  <summary>Lista de tarefas para controle próprio</summary>
  
* Infra:
  * [x] Github Pages deployment pipeline
    * [x] Fix server static assets
    * [ ] 404 page send back to router flow
  * [ ] Add extra pipeline step to insert version (commit hash and date) into build
    * [ ] Show version in webpage (footer ?)
  * [ ] Installation, definitions and more info in README
  * [ ] web metadata
  * [ ] app optimization
* Prototype:
  * [x] Plan the overview
  * [x] Layout
  * [x] Vestibulum
  * [x] Interview
    * [x] Audio Recorder
    * [x] Audio Player
  * [x] Submission
  * [ ] Home page
* Setup:
  * [x] Working simple app
  * [x] Tailwind
    * ~[ ] styled-components~
    * [x] split layout blocks into components
  * [x] react router
    * [ ] central routes object
* Interface
  * [ ] 🛠️ Home page
    * [ ] ↖️ List of interviews - New / Submitted / Replied
    * [ ] ↖️ About ?
    * [ ] ↖️ Profile ?
  * [x] Vestibulum (Pre-interview) page
    * [x] 🛠️ info & preparation
      * 🛠️ : make more user friendly
    * [x] Test audio
      * [x] Permission, Devices and Stream hooks
      * [x] Permission, Devices and Stream feedback components
      * [x] Select input device, Select output device, update etc
      * [x] Visual feedback for mic (simple, volume bar)
      * [x] ↖️ play sound - test output
      * [x] ↖️ listen to yourself
      * [ ] ↖️ detailed audio visualizer
      * [ ] ↖️ volume gain control slider
      * [ ] ↖️ audio effects
    * [x] Start Interview button
      * [ ] ↖️ disabled until properly configured
  * [x] Interview page
    * [x] Display the question
      * [x] ↖️ mock data source
      * [x] ↖️ next question(s) state management
      * [ ] ↖️ link to list of questions / select question --> go back to recorder
    * [x] Start Recording answer component - Record / Pause / Continue / Stop (Finish)
    * [x] Audio component - Play / Pause / Set
      * [ ] ↖️ audio player with waveform sampling visualization `၊၊||၊--|။||||။‌‌‌‌‌၊|   `
    * [x] option to delete recording, to then record a new one
    * [x] submit interview
    * [x] stop recording on time limit
  * [ ] ↖️ Interview: all questions page
    * [ ] ↖️ info, show audio, record again. submit
  * [x] Submission page
    * [x] info, show audio
    * [ ] ↖️ other (mocked) submission pages with response (approved, rejected) from interviewer

</details>

---

### README padrão

README original que foi gerado automaticamente quando iniciei o projeto, com create-react-app, usando o template de Typescript + Vite

<details>
  <summary>README do `create-react-app`</summary>
  
### Repo's creation default readme

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
      project: ["./tsconfig.node.json", "./tsconfig.app.json"],
      tsconfigRootDir: import.meta.dirname,
    },
  },
});
```

- Replace `tseslint.configs.recommended` to `tseslint.configs.recommendedTypeChecked` or `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and update the config:

```js
// eslint.config.js
import react from "eslint-plugin-react";

export default tseslint.config({
  // Set the react version
  settings: { react: { version: "18.3" } },
  plugins: {
    // Add the react plugin
    react,
  },
  rules: {
    // other rules...
    // Enable its recommended rules
    ...react.configs.recommended.rules,
    ...react.configs["jsx-runtime"].rules,
  },
});
```

</details>

---

### Referências

<details>
  <summary>Links para documentações e tutoriais que ajudaram a construir esse projeto</summary>

- https://github.com/Anurag-Kochar-1/Shadcn-UI-Audio-Recorder-With-Visualizer/blob/master/components/audio-recorder-with-visualizer.tsx
- https://github.com/cwilso/Audio-Input-Effects/blob/main/js/waveshaper.js#L33
- https://github.com/imaimai17468/ts-audio-visualizer/blob/main/src/components/
- https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getByteTimeDomainData
- https://stackoverflow.com/questions/21522036/html-audio-tag-duration-always-infinity
- https://blog.logrocket.com/building-audio-player-react/
- 🛠️ https://css-tricks.com/making-an-audio-waveform-visualizer-with-vanilla-javascript/
- https://developer.mozilla.org/en-US/docs/Web/API/MediaStream_Recording_API/Recording_a_media_element
- https://developer.mozilla.org/en-US/docs/Web/API/AudioContext/createMediaStreamDestination
- https://developer.mozilla.org/en-US/docs/Web/API/AudioParam/linearRampToValueAtTime
- https://developer.mozilla.org/en-US/docs/Web/API/AudioParam/exponentialRampToValueAtTime
- https://www.taniarascia.com/musical-instrument-web-audio-api/
- https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Advanced_techniques
- https://webaudio.github.io/web-audio-api/#OscillatorNode
- https://dobrian.github.io/cmp/topics/intro-to-web-audio-api/0.introduction-to-web-audio-api.html
- https://esonderegger.github.io/web-audio-peak-meter/examples/audio.html
- https://github.com/WebAudio/web-audio-api/issues/722
- https://reference.codeproject.com/dom/web_audio_api/visualizations_with_web_audio_api
- https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/selectAudioOutput
- https://developer.mozilla.org/en-US/docs/Web/API/MediaDevices/getDisplayMedia
- https://stackoverflow.com/questions/55006251/cant-get-two-audio-streams-from-navigator-mediadevices-getusermedia-with-firefo
- https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Build_a_phone_with_peerjs/Connect_peers/Answer_a_call
- https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/Permissions-Policy/microphone
- https://developer.mozilla.org/en-US/docs/Web/API/WebRTC_API/Build_a_phone_with_peerjs/Connect_peers/Get_microphone_permission
- https://source.chromium.org/chromium/chromium/src/+/main:third_party/blink/renderer/modules/permissions/permission_descriptor.idl?originalUrl=https:%2F%2Fcs.chromium.org%2Fchromium%2Fsrc%2Fthird_party%2Fblink%2Frenderer%2Fmodules%2Fpermissions%2Fpermission_descriptor.idl
- https://searchfox.org/mozilla-central/source/dom/webidl/Permissions.webidl#10
- https://github.com/operasoftware/devopera/blob/bed27accab90077fbf98eabf5b503219834f1b8f/src/_extensions/declare-permissions.md
- https://stackoverflow.com/questions/62706697/how-to-enumerate-supported-permission-names-in-navigator-permissions
- https://laracasts.com/discuss/channels/vite/vite-missing-tailwind-classes#reply-904213
  - https://tailwindcss.com/docs/content-configuration#it-just-isnt-working-properly
- https://nerdcave.com/tailwind-cheat-sheet
- https://codepen.io/knyttneve/pen/ZEbQepZ
- https://day.js.org/docs/en/installation/typescript

- https://www.serasaexperian.com.br/carreiras/blog-carreiras/perguntas-de-entrevista-de-emprego/
- https://reactrouter.com/en/main/hooks/use-navigate

</details>

---

⚞ ◥◣◢◤ ⚟