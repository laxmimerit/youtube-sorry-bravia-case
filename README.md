# Claim Ready: a landing page built with Google Antigravity

Live: https://sorrybravia.vercel.app

A sample one-page site made for a KGP Talkie YouTube tutorial. Two plain files went in, and Antigravity
built the Next.js app from them:

- `DESIGN.md`: the design system (colors, fonts, spacing, components) of sonybravia.com, published for
  anyone to use at https://designmd.ai/laxmimerit/sorry-bravia-emerald-editorial
- `content.txt`: the page text, a general warranty-claim checklist.

## Prompts used in Antigravity (Gemini 3.8 Flash)

1. Create a Next.js app in this folder and build one landing page from the text in content.txt. Follow
   DESIGN.md exactly for the colors, fonts, spacing and components. Use every section of content.txt and keep
   its wording. Make it work on phones too. When it is done, run it locally so I can preview it.
2. The page has text that is not in content.txt, like "Official checklist", the extra tip under every step,
   and lines such as "Brands cannot legally withhold the technical assessment report". Remove every sentence,
   label and tip that is not in content.txt, so the page only says what content.txt says. Keep the design and
   layout.
3. Good, the text is right now. Three fixes: 1) KEY NUMBERS FOR THE PAGE, CALL TO ACTION and FOOTER NOTE are
   my notes, not page headings, so hide those three headings. 2) Keep the header on one line: the logo, two
   links "The 15 steps" and "Key numbers", and the Download button. 3) In "Who this is for", show the full
   sentence once and remove the four device cards. Keep everything else as it is.
4. On a phone the header is too wide and the Download button is cut off on the right. On small screens, hide
   the two header links so the logo and the Download button fit.
5. Add a .gitignore for Next.js, then commit everything and push it to this repository on the main branch.

## Use it for your own page

1. Download a DESIGN.md you like from designmd.ai (or write your own).
2. Put your own text in a `content.txt`.
3. Open the folder as a project in Antigravity and use prompt 1 above.
4. Read the result against your text, and ask for fixes in plain words.
5. Push to GitHub and import the repository on Vercel.

## Run locally

```bash
npm install
npm run dev
```

Claim Ready is a free, general guide. It is not legal advice.
