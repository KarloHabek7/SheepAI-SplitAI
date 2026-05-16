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
