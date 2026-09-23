# AK Premium AI Chat

## Goal
Build a responsive, production-ready single-screen chatbot called **AK** with a restrained Apple-inspired dark glass aesthetic and direct message delivery to the provided webhook.

## Experience
- Floating glass header with a compact original AK identity, online status, New Chat, Clear Chat, and Settings controls.
- Centered conversation column with a refined empty state, distinct high-contrast user messages, calm assistant responses, and a subtle animated thinking state.
- Elevated multiline composer with keyboard submit, a premium gradient send control, focus glow, and clear disabled/error states.
- Assistant controls for copying and regenerating replies, plus Markdown, links, lists, headings, and syntax-highlighted code with copy actions.
- Responsive desktop, tablet, and mobile layouts with touch-friendly controls, keyboard focus, reduced-motion support, and a minimal scrollbar.

## Visual system
- Deep near-black/navy surfaces with restrained blue, indigo, and violet ambient lighting.
- Semantic design tokens for opaque foundations, selective frosted glass, thin cool borders, inner highlights, and soft shadows.
- Inter typography with balanced weights and unchanged letter spacing.
- Original compact AK monogram/avatar; no copied branding or assets.
- Subtle message entry, control hover/press, modal, focus, and thinking animations without flashy neon or decorative blobs.

## Chat behavior
- Send each submitted user message as the raw `text/plain` request body to `https://cme-community.app.n8n.cloud/webhook/AK`.
- Keep the conversation in the current browser session and support New Chat/Clear Chat without adding accounts or permanent storage.
- Accept plain-text webhook replies and common JSON reply fields; show a polished recoverable error when the webhook fails or returns no usable response.
- Regenerate by resending the relevant user prompt; prevent duplicate sends while a request is active.

## Technical details
- Compose the transcript, messages, Markdown response, composer, and loading state from installed AI Elements primitives.
- Add a small public server route as the webhook relay so browser cross-origin restrictions do not break sending; validate request size and forward only the raw body.
- Use existing Shadcn controls and Lucide icons for accessible buttons, tooltips, dialogs, and menus.
- Add unique page metadata for AK.

## Validation
- Run lint and the production build.
- Test message submission, webhook error handling, copy, regenerate, clear/new chat, keyboard behavior, and scrolling.
- Inspect desktop and mobile screenshots for spacing, contrast, clipping, control alignment, composer sizing, and visual consistency.
