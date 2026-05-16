---
name: SplitAI
colors:
  surface: '#faf8ff'
  surface-dim: '#d9d9e2'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f3f3fc'
  surface-container: '#ededf6'
  surface-container-high: '#e7e7f0'
  surface-container-highest: '#e2e2eb'
  on-surface: '#191b22'
  on-surface-variant: '#434653'
  inverse-surface: '#2e3037'
  inverse-on-surface: '#f0f0f9'
  outline: '#737784'
  outline-variant: '#c3c6d5'
  surface-tint: '#2559bd'
  primary: '#00327d'
  on-primary: '#ffffff'
  primary-container: '#0047ab'
  on-primary-container: '#a5bdff'
  inverse-primary: '#b1c5ff'
  secondary: '#bb0013'
  on-secondary: '#ffffff'
  secondary-container: '#e22427'
  on-secondary-container: '#fffbff'
  tertiary: '#745b00'
  on-tertiary: '#ffffff'
  tertiary-container: '#cda72c'
  on-tertiary-container: '#4f3d00'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#dae2ff'
  primary-fixed-dim: '#b1c5ff'
  on-primary-fixed: '#001946'
  on-primary-fixed-variant: '#00419e'
  secondary-fixed: '#ffdad6'
  secondary-fixed-dim: '#ffb4ab'
  on-secondary-fixed: '#410002'
  on-secondary-fixed-variant: '#93000d'
  tertiary-fixed: '#ffe08b'
  tertiary-fixed-dim: '#ebc246'
  on-tertiary-fixed: '#241a00'
  on-tertiary-fixed-variant: '#584400'
  background: '#faf8ff'
  on-background: '#191b22'
  surface-variant: '#e2e2eb'
  bg-primary: '#F8F9FA'
  bg-card: '#FFFFFF'
  bg-elevated: '#F3F4F6'
  text-primary: '#111827'
  text-secondary: '#4B5563'
  border: rgba(0, 71, 171, 0.15)
  success: '#10B981'
typography:
  hero-lg:
    fontFamily: DM Sans
    fontSize: 4.5rem
    fontWeight: '200'
    lineHeight: '1.05'
  h1:
    fontFamily: DM Sans
    fontSize: 3rem
    fontWeight: '200'
    lineHeight: '1.1'
  h2:
    fontFamily: DM Sans
    fontSize: 2.25rem
    fontWeight: '200'
    lineHeight: '1.3'
  body:
    fontFamily: Inter
    fontSize: 1rem
    fontWeight: '300'
    lineHeight: '1.6'
  small:
    fontFamily: Inter
    fontSize: 0.875rem
    fontWeight: '300'
    lineHeight: '1.5'
  hero-lg-mobile:
    fontFamily: DM Sans
    fontSize: 2.5rem
    fontWeight: '300'
    lineHeight: '1.1'
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  xs: 8px
  sm: 16px
  md: 32px
  lg: 56px
  xl: 128px
---

# Design System — SplitAI

> Generated from branding website: [Local / Pending Vercel]
> Source template: Aura "Decentralized Planetary Infrastructure" (Hajduk Theme)
> Date: 2026-05-16

## Color Palette

### Core Colors
| Token | HSL | Hex | Usage |
|---|---|---|---|
| `--color-bg-primary` | hsl(210, 17%, 98%) | #F8F9FA | Page background |
| `--color-bg-card` | hsl(0, 0%, 100%) | #FFFFFF | Card backgrounds |
| `--color-bg-elevated` | hsl(220, 14%, 96%) | #F3F4F6 | Sub-cards, input fields |
| `--color-text-primary` | hsl(221, 39%, 11%) | #111827 | Main body text |
| `--color-text-secondary` | hsl(215, 16%, 34%) | #4B5563 | Muted/supporting text |
| `--color-border` | hsla(215, 100%, 34%, 0.15) | rgba(0, 71, 171, 0.15) | Borders and dividers |

### Accent Colors
| Token | HSL | Hex | Usage |
|---|---|---|---|
| `--color-primary` | hsl(215, 100%, 34%) | #0047AB | Hajduk Blue - Primary buttons, links |
| `--color-secondary` | hsl(357, 79%, 47%) | #D71920 | Hajduk Red - Danger, secondary highlights |
| `--color-accent` | hsl(45, 87%, 62%) | #F2C94C | Hajduk Gold - Decorative accents |

### Status Colors
| Token | HSL | Hex | Usage |
|---|---|---|---|
| `--color-success` | hsl(158, 64%, 52%) | #10B981 | Positive states |
| `--color-warning` | hsl(45, 87%, 62%) | #F2C94C | Caution states |
| `--color-error` | hsl(357, 79%, 47%) | #D71920 | Error states |

## Typography

### Font Families
- **Sans-serif (primary):** `'Inter'`, system-ui, sans-serif — body text, UI elements
- **Display:** `'DM Sans'`, sans-serif — hero headings

### Type Scale
| Token | Size | Weight | Line Height | Usage |
|---|---|---|---|---|
| `--font-size-hero` | 4.5rem | 200 | 1.05 | Hero headlines (lg) |
| `--font-size-h1` | 3rem | 200 | 1.1 | Page titles (md) |
| `--font-size-h2` | 2.25rem | 200 | 1.3 | Section headings |
| `--font-size-body` | 1rem | 300 | 1.6 | Body text |
| `--font-size-small` | 0.875rem | 300 | 1.5 | Captions, labels |

## Spacing

| Token | Value | Usage |
|---|---|---|
| `--space-xs` | 8px | Tight internal spacing |
| `--space-sm` | 16px | Small gaps, icon padding |
| `--space-md` | 32px | Default padding, card internal |
| `--space-lg` | 56px | Section padding |
| `--space-xl` | 128px | Page-level spacing |

## Border Radius
| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | 8px | Small buttons, tags |
| `--radius-md` | 12px | Default cards, inputs |
| `--radius-lg` | 16px | Large cards |
| `--radius-xl` | 32px | Container shells |
| `--radius-full` | 9999px | Avatars, pills |

## Shadows
| Token | Value | Usage |
|---|---|---|
| `--shadow-card` | 0 12px 40px rgba(0, 71, 171, 0.08) | Default card elevation |
| `--shadow-elevated` | 0 20px 50px rgba(0, 71, 171, 0.12) | Modals, active cards |
| `--shadow-primary` | 0 4px 14px rgba(0, 71, 171, 0.2) | Primary button shadow |

## Effects
- **Glassmorphism:** `backdrop-filter: blur(12px)` + `background: rgba(255, 255, 255, 0.85)`
- **Primary gradient:** `linear-gradient(135deg, var(--color-primary), var(--color-secondary))`
- **Transition default:** `all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)`

## Component Patterns

### Buttons
- **Primary:** bg `--color-primary`, text white, radius `--radius-full`, shadow `--shadow-primary`, hover bg `--color-secondary`
- **Secondary:** bg transparent, border `1px solid var(--color-primary)`, text `--color-primary`, radius `--radius-full`
- **Ghost:** bg transparent, text `--color-text-secondary`, hover bg `--color-bg-elevated`

### Cards
- Background: `--color-bg-card`
- Border: `1px solid var(--color-border)`
- Radius: `--radius-xl`
- Shadow: `--shadow-card`
- Padding: `--space-md`
