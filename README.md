# digai-frontend-hiring-challenge

Desafio para entrar na Digaí: Criar uma interface com a pergunta, gravação e reprodução de áudio e tempo máximo de resposta.

[`┣━━🡪 🔗 **Instruções** do Desafio`](https://marialauramendes.notion.site/Frontend-Hiring-Challenge-f998fa60b4774be795b5f2ac2a42dfd5)

![Logo Digai](https://file.notion.so/f/f/38077f14-5ad3-4a4c-81f7-b2156fe90c40/7fa315e4-c280-4b06-97d3-5e07b20f4e0d/full-icon.svg?table=block&id=6e4b7902-a602-4bfd-9846-bcca7af40cc2&spaceId=38077f14-5ad3-4a4c-81f7-b2156fe90c40&expirationTimestamp=1724508000000&signature=bex36v4uOObSM6ddnTZoX4V8bOvxPb02GSL6DQXdrS0&downloadName=full-icon.svg)

⚞ ◥◣◢◤ ⚟

## To Do

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
    * [ ] Audio Recorder
    * [ ] Audio Player
  * [x] Submission
  * [X] Home page
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
  * [x] 🛠️ Vestibulum (Pre-interview) page
    * [x] 🛠️ info & preparation
    * [x] Test audio
      * [x] Permission, Devices and Stream hooks
      * [x] Permission, Devices and Stream feedback components
      * [x] Select input device, Select output device, update etc
      * [x] Visual feedback for mic (simple, volume bar)
      * [x] ↖️ play sound - test output
      * [x] ↖️ listen to yourself
      * [ ] ↖️ detailed audio visualizer
      * [ ] ↖️ volume slider
      * [ ] ↖️ audio effects
    * [x] Start Interview button
      * [ ] ↖️ disabled until properly configured
  * [ ] Interview page
    * [ ] Display the question
      * [ ] ↖️ mock data source
      * [ ] ↖️ next question(s) state management
    * [ ] Start Recording answer component - Record / Pause / Continue / Stop (Finish)
    * [ ] Audio component - Play / Pause / Set
    * [ ] option to delete recording, to then record a new one
    * [ ] submit interview
    * [ ] stop recording on time limit
  * [ ] ↖️ Interview: all questions page
    * [ ] ↖️ info, show audio, record again. submit
  * [ ] Submission page
    * [ ] info, show audio
    * [ ] ↖️ other (mocked) submission pages with response (approved, rejected) from interviewer

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

---

```javascript

function gotStream(stream) {  
  rec = new MediaRecorder(stream);
  rec.ondataavailable = e => {
    audioChunks.push(e.data);
    if (rec.state == "inactive"){
      let blob = new Blob(audioChunks,{type:'audio/x-mpeg-3'});
      recordedAudio.src = URL.createObjectURL(blob);
      recordedAudio.controls=true;
      recordedAudio.autoplay=true;
      audioDownload.href = recordedAudio.src;
      audioDownload.download = 'mp3';
      audioDownload.innerHTML = 'download';
    }
  }
}

// stop:
stream.getAudioTracks()[0].stop();


full example:
https://github.com/Anurag-Kochar-1/Shadcn-UI-Audio-Recorder-With-Visualizer/blob/master/components/audio-recorder-with-visualizer.tsx

waveshaper:
https://github.com/cwilso/Audio-Input-Effects/blob/main/js/waveshaper.js#L33

visualizer:
https://github.com/imaimai17468/ts-audio-visualizer/blob/main/src/components/AudioVisualizer/AudioVisualizer.tsx

nice:
https://developer.mozilla.org/en-US/docs/Web/API/AnalyserNode/getByteTimeDomainData

```