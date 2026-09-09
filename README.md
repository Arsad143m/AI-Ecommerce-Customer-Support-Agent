# ShopMind — AI E-Commerce Customer Support Agent

A complete React + Vite + TypeScript college project demo for an AI e-commerce customer support agent.

## Features
- Landing page
- AI support dashboard
- Interactive mock chatbot
- Product catalog
- Order tracking
- Returns and refunds workflow
- Customer memory view
- Project architecture/about page
- Responsive layout

## Run locally

```bash
npm install
npm run dev
```

Then open the local URL shown by Vite.

## Build

```bash
npm run build
```

## Replace mock AI logic
The chatbot logic is in `src/main.tsx`, inside the `send()` function. Replace the conditional mock responses with a call to your backend endpoint, for example:

```ts
const response = await fetch('/api/chat', {
  method: 'POST',
  headers: {'Content-Type': 'application/json'},
  body: JSON.stringify({message: text})
})
```

Keep API keys on the server side and never expose them in the React client.
