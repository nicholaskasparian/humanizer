# AI Humanizer

A full-stack web app that paraphrases input text using OpenRouter's AI API to make it sound human-written and undetectable.

## Features

- Frontend: HTML/CSS/JavaScript with a clean UI
- Backend: Node.js + Express server
- Secure API key usage via environment variables
- Ready to deploy to [Render](https://render.com)

## Setup Locally

1. Clone the repo and run:

```bash
npm install
```

2. Create a `.env` file:

```bash
OPENROUTER_API_KEY=sk-or-your-api-key
```

3. Start the app:

```bash
npm start
```

## Deploy to Render

1. Push this folder to a GitHub repo.
2. Go to [Render.com](https://render.com) → New Web Service.
3. Connect your GitHub repo.
4. Set the environment variable `OPENROUTER_API_KEY` in the Render dashboard.
5. Render auto-installs dependencies and deploys your server.

