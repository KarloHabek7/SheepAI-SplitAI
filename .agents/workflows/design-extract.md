---
description: "Phase 1.6: Extract the design system (DESIGN.md + tokens.css) from the deployed branding website."
---

# Design Extraction Workflow (`/design-extract`)

You are now acting as the **Design System Extractor**. Your goal is to analyze the deployed branding website's visual system and produce two canonical artifacts: `DESIGN.md` (human/AI-readable design specification) and `app/src/styles/tokens.css` (CSS custom properties for the app).

> **Who uses this:** Team Lead or Creative Lead.
> **Model recommendation:** Opus 4.6 — requires careful analysis of CSS values and design pattern recognition.
> **Prerequisite:** Run `/brand-site` first. The branding site must be deployed and `Decisions/brand_site.md` must exist.

## Instructions

1. **Read Context:**
   - Read `Decisions/brand_site.md` (live URL and template source).
   - Read `Decisions/selected_idea.md` (app name, target user — needed for DESIGN.md header).
   - List and read all CSS/style files in `brand_site/src/` or `brand_site/` (depending on template structure).
   - Read `brand_site/tailwind.config.js` if it exists (contains theme tokens).
   - Read `brand_site/index.html` or main template file for embedded styles.

2. **Extract Color Palette:**
   - Scan all CSS files, Tailwind config, and inline styles for color values.
   - Identify the semantic roles:
     - **Background primary** — the main page background color
     - **Background secondary** — card/section backgrounds
     - **Background elevated** — modals, dropdowns, tooltips
     - **Text primary** — main body text color
     - **Text secondary** — muted/supporting text
     - **Accent/Primary** — the main brand accent color (CTAs, links, highlights)
     - **Accent/Secondary** — secondary accent (badges, tags, supporting elements)
     - **Success/Warning/Error** — status colors (infer from template or generate sensible defaults)
     - **Border** — divider and border colors
   - Convert all hex values to HSL format for DESIGN.md and keep hex for tokens.css.

3. **Extract Typography:**
   - Identify font families (Google Fonts or system fonts used in the template).
   - Extract the type scale: font sizes, line heights, font weights, and letter spacing.
   - Identify heading styles (h1–h6) and body text styles.
   - Note any display/hero typography that uses larger or decorative fonts.

4. **Extract Spacing & Layout:**
   - Identify the spacing scale (padding, margin, gap values used consistently).
   - Extract container max-widths and content widths.
   - Note grid column counts and gap sizes.
   - Extract border-radius values (cards, buttons, inputs, avatars).

5. **Extract Effects & Motion:**
   - Catalog box-shadow definitions (card shadows, elevated shadows, hover shadows).
   - Identify transition/animation timing curves and durations.
   - Note any glassmorphism effects (backdrop-blur values, semi-transparent backgrounds).
   - Catalog gradient patterns used (direction, color stops).

6. **Extract Component Patterns:**
   Identify recurring visual patterns in the template:
   - **Button variants** — primary, secondary, ghost, outline (colors, padding, border-radius)
   - **Card patterns** — background, border, shadow, padding, border-radius
   - **Input/Form styles** — background, border, focus ring color
   - **Badge/Tag styles** — small colored labels
   - **Navigation patterns** — header background, link styling, active states

7. **Generate `DESIGN.md`:**
   Create/overwrite `DESIGN.md` at the project root with this structure:

   ```markdown
   # Design System — [App Name]

   > Generated from branding website: [Live URL]
   > Source template: [Aura template name]
   > Date: [Date]

   ## Color Palette

   ### Core Colors
   | Token | HSL | Hex | Usage |
   |---|---|---|---|
   | `--color-bg-primary` | hsl(X, X%, X%) | #XXXXXX | Page background |
   | `--color-bg-card` | hsl(X, X%, X%) | #XXXXXX | Card backgrounds |
   | ... | ... | ... | ... |

   ### Accent Colors
   | Token | HSL | Hex | Usage |
   |---|---|---|---|
   | `--color-primary` | hsl(X, X%, X%) | #XXXXXX | CTAs, links, active states |
   | `--color-secondary` | hsl(X, X%, X%) | #XXXXXX | Badges, secondary highlights |

   ### Status Colors
   | Token | HSL | Hex | Usage |
   |---|---|---|---|
   | `--color-success` | ... | ... | Positive states |
   | `--color-warning` | ... | ... | Caution states |
   | `--color-error` | ... | ... | Error states |

   ## Typography

   ### Font Families
   - **Sans-serif (primary):** `'[Font Name]', sans-serif` — body text, UI elements
   - **Display (optional):** `'[Font Name]', sans-serif` — hero headings

   ### Type Scale
   | Token | Size | Weight | Line Height | Usage |
   |---|---|---|---|---|
   | `--font-size-hero` | Xrem | 700 | 1.1 | Hero headlines |
   | `--font-size-h1` | Xrem | 700 | 1.2 | Page titles |
   | `--font-size-h2` | Xrem | 600 | 1.3 | Section headings |
   | `--font-size-body` | Xrem | 400 | 1.6 | Body text |
   | `--font-size-small` | Xrem | 400 | 1.5 | Captions, labels |

   ## Spacing

   | Token | Value | Usage |
   |---|---|---|
   | `--space-xs` | Xpx | Tight internal spacing |
   | `--space-sm` | Xpx | Small gaps, icon padding |
   | `--space-md` | Xpx | Default padding, card internal |
   | `--space-lg` | Xpx | Section padding |
   | `--space-xl` | Xpx | Page-level spacing |

   ## Border Radius
   | Token | Value | Usage |
   |---|---|---|
   | `--radius-sm` | Xpx | Small buttons, tags |
   | `--radius-md` | Xpx | Cards, inputs |
   | `--radius-lg` | Xpx | Modals, large containers |
   | `--radius-full` | 9999px | Avatars, pills |

   ## Shadows
   | Token | Value | Usage |
   |---|---|---|
   | `--shadow-card` | ... | Default card elevation |
   | `--shadow-elevated` | ... | Modals, dropdowns |
   | `--shadow-hover` | ... | Interactive hover states |

   ## Effects
   - **Glassmorphism:** `backdrop-filter: blur(Xpx)` + `background: hsla(...)` with X% opacity
   - **Primary gradient:** `linear-gradient(Xdeg, [color1], [color2])`
   - **Transition default:** `all Xms ease` or `all Xms cubic-bezier(...)`

   ## Component Patterns

   ### Buttons
   - **Primary:** bg `--color-primary`, text white, radius `--radius-md`, padding `--space-sm --space-md`
   - **Secondary:** bg transparent, border `--color-primary`, text `--color-primary`
   - **Ghost:** bg transparent, text `--color-text-secondary`, hover bg `--color-bg-card`

   ### Cards
   - Background: `--color-bg-card`
   - Border: `1px solid --color-border`
   - Radius: `--radius-md`
   - Shadow: `--shadow-card`
   - Padding: `--space-md`

   ### Inputs
   - Background: `--color-bg-primary` or `--color-bg-card`
   - Border: `1px solid --color-border`
   - Focus ring: `--color-primary` with 2px outline offset
   - Radius: `--radius-md`
   ```

8. **Generate `tokens.css`:**
   Create/overwrite `app/src/styles/tokens.css` with CSS custom properties matching every token in DESIGN.md:

   ```css
   /* Design System Tokens — Auto-generated from branding website
      Source: [Live URL]
      Do NOT hardcode visual values elsewhere — use these variables. */

   :root {
     /* Colors — Background */
     --color-bg-primary: #XXXXXX;
     --color-bg-card: #XXXXXX;
     --color-bg-elevated: #XXXXXX;

     /* Colors — Text */
     --color-text-primary: #XXXXXX;
     --color-text-secondary: #XXXXXX;

     /* Colors — Accent */
     --color-primary: #XXXXXX;
     --color-secondary: #XXXXXX;

     /* Colors — Status */
     --color-success: #XXXXXX;
     --color-warning: #XXXXXX;
     --color-error: #XXXXXX;

     /* Colors — Border */
     --color-border: #XXXXXX;

     /* Typography */
     --font-sans: '[Font]', sans-serif;
     --font-display: '[Font]', sans-serif;

     /* Font Sizes */
     --font-size-hero: Xrem;
     --font-size-h1: Xrem;
     --font-size-h2: Xrem;
     --font-size-h3: Xrem;
     --font-size-body: Xrem;
     --font-size-small: Xrem;

     /* Spacing */
     --space-xs: Xpx;
     --space-sm: Xpx;
     --space-md: Xpx;
     --space-lg: Xpx;
     --space-xl: Xpx;

     /* Border Radius */
     --radius-sm: Xpx;
     --radius-md: Xpx;
     --radius-lg: Xpx;
     --radius-full: 9999px;

     /* Shadows */
     --shadow-card: ...;
     --shadow-elevated: ...;
     --shadow-hover: ...;

     /* Transitions */
     --transition-default: all Xms ease;
     --transition-fast: all Xms ease;
   }
   ```

9. **Generate Asset Manifest (Optional):**
   If the branding site uses Aura CDN-hosted images, list them:
   ```markdown
   ## Reusable Assets from Branding Site
   | Asset | URL | Usage in Brand Site | Potential App Usage |
   |---|---|---|---|
   | hero-bg.webp | https://aura.build/... | Hero background | App hero/splash |
   | feature-1.webp | https://aura.build/... | Feature card 1 | Dashboard card |
   ```

10. **Transition to Next Phase:**
    Tell the user:
    > "Design system extracted. `DESIGN.md` and `tokens.css` are ready. Run `/stitch-generate` to use the branding site URL + DESIGN.md as input for generating the app's React UI in Google Stitch."

**Out of Scope (What NOT to do):**
- Do NOT modify the branding site — this workflow is read-only analysis.
- Do NOT write React components — that's `/stitch-generate` or `/execute`.
- Do NOT invent colors or styles not present in the branding site — extract what exists.
- Do NOT modify `app/src/` files other than `styles/tokens.css`.

When finished, suggest:
`git add DESIGN.md app/src/styles/tokens.css ; git commit -m "style(creative): extract design system from branding website"`
