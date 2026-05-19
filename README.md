# GlowUp AI V3

AI Personal Glow-Up Report prototype with the V3 monetization and growth loops:

- Free analysis limit
- Pay-per-report pricing
- Premium plan placeholder
- Viral share card download
- Referral unlock UI
- SEO page examples
- Selfie upload preview

## Preview Now

Open this file in your browser:

```text
C:\Users\eyebe\Documents\Codex\2026-05-18\chatgpt-app\preview.html
```

This version runs without installing React, Vite, or npm packages.

## Run As React App

In an environment with Node.js and npm:

```bash
npm install
npm run dev
```

Then open:

```text
http://127.0.0.1:5173
```

## Gumroad Checkout

The MVP uses Gumroad hosted checkout:

```text
https://eyebelfy.gumroad.com/l/Glow-UpReport
```

To override the link locally, create `.env.local`:

```text
VITE_CHECKOUT_URL=https://your-gumroad-product-url
```

The React app unlocks the premium report when the URL contains:

```text
?checkout=success
```

For the simplest Gumroad MVP delivery, use the standalone unlock page:

```text
https://your-domain.com/unlock.html
```

For Gumroad, configure the product redirect URL to your deployed app with `?checkout=success`, for example:

```text
https://your-domain.com/?checkout=success
```

## Next Production Steps

1. Connect real AI analysis API.
2. Store cached reports per user.
3. Configure Gumroad redirect after purchase.
4. Convert SEO examples into real routes.
5. Track referral codes in a database.

## AI Analysis

The `Analyze free` button calls:

```text
/api/analyze
```

Set these environment variables in Vercel:

```text
OPENAI_API_KEY=your_new_rotated_openai_key
OPENAI_MODEL=gpt-4.1-mini
```

Important: never commit `.env.local` or paste API keys into chat. If a key was exposed, revoke it and create a new one before deploying.

The current analysis is a style and presentation report. It avoids identity, age, ethnicity, health, and other sensitive inferences.
