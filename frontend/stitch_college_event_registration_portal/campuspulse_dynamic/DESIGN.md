---
name: CampusPulse Dynamic
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#464555'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#777587'
  outline-variant: '#c7c4d8'
  surface-tint: '#4d44e3'
  primary: '#3525cd'
  on-primary: '#ffffff'
  primary-container: '#4f46e5'
  on-primary-container: '#dad7ff'
  inverse-primary: '#c3c0ff'
  secondary: '#9d4300'
  on-secondary: '#ffffff'
  secondary-container: '#fd761a'
  on-secondary-container: '#5c2400'
  tertiary: '#00505f'
  on-tertiary: '#ffffff'
  tertiary-container: '#006a7c'
  on-tertiary-container: '#93e8ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#e2dfff'
  primary-fixed-dim: '#c3c0ff'
  on-primary-fixed: '#0f0069'
  on-primary-fixed-variant: '#3323cc'
  secondary-fixed: '#ffdbca'
  secondary-fixed-dim: '#ffb690'
  on-secondary-fixed: '#341100'
  on-secondary-fixed-variant: '#783200'
  tertiary-fixed: '#acedff'
  tertiary-fixed-dim: '#4cd7f6'
  on-tertiary-fixed: '#001f26'
  on-tertiary-fixed-variant: '#004e5c'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '800'
    lineHeight: 48px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.02em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 36px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '700'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
    letterSpacing: 0em
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
    letterSpacing: 0em
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
    letterSpacing: 0.01em
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: JetBrains Mono
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.04em
  label-sm:
    fontFamily: JetBrains Mono
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 12px
    letterSpacing: 0.06em
rounded:
  sm: 0.25rem
  DEFAULT: 0.5rem
  md: 0.75rem
  lg: 1rem
  xl: 1.5rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-desktop: 1.5rem
  margin: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 0.75rem
  space-lg: 1.25rem
  space-xl: 2rem
---

## Brand & Style

This design system targets modern university students seeking active campus engagement, social discovery, and academic networking. The personality blends high-energy community vibrancy with the precise, structured efficiency of developer-friendly API interfaces. 

The aesthetic is Modern Tactile Minimalism: clean, generous layouts infused with vibrant energetic accents, smooth pill-shaped indicators, micro-textured cards, and subtle layered elevation. The UI evokes forward momentum, enthusiasm, and effortless navigation without clutter or cognitive overload.

## Colors

- **Primary (`#4f46e5` - Indigo Electric):** Serves as the structural anchor for brand identity, primary navigation states, primary buttons, and selected tabs.
- **Secondary (`#f97316` - Energetic Citrus):** Delivers high-voltage callouts, live indicator tags, urgent notifications, and interactive event timestamps.
- **Tertiary (`#06b6d4` - Cyan Bright):** Applied for specialized metadata tags, filter highlights, and supportive analytics/stats counters.
- **Neutral Palette:** Ranges from `#0f172a` (rich slate body copy) to `#f8fafc` (crisp canvas surface). Intermediate cool slates (`#64748b`, `#cbd5e1`, `#e2e8f0`) structure borders, dividers, and disabled states.
- **Functional Semantics (API Method & Status Tokens):**
  - `GET`: `#0284c7` (Sky) with an 8% tint container.
  - `POST`: `#16a34a` (Emerald) with an 8% tint container.
  - `PUT / PATCH`: `#d97706` (Amber) with an 8% tint container.
  - `DELETE`: `#dc2626` (Rose) with an 8% tint container.
  - `LIVE / ACTIVE`: `#ea580c` with pulsating status dot.

## Typography

The type scale pairs the open geometric contours of `Plus Jakarta Sans` for titles and prose with the technical crispness of `JetBrains Mono` for badges, metadata chips, event timestamps, and method calls.

- **Display & Headlines:** Utilize bold-to-extra-bold weights with negative tracking to convey youth, authority, and dynamism on high-density mobile viewports.
- **Body:** Standardized on `Plus Jakarta Sans` at 14px/20px and 16px/24px for legibility during fast-scrolling scenarios.
- **Labels & Code Badges:** `JetBrains Mono` provides instant mechanical precision, transforming API verbs, attendee counts, and venue codes into instantly recognizable, scannable elements.

## Layout & Spacing

This design system uses a mobile-first fluid column structure that transitions gracefully to centered application shells on wider screens.

- **Mobile (< 640px):** 4-column fluid layout with `1rem` margins and `1rem` gutters. Touch targets must maintain a 44x44px minimum bounding box. Sticky bottom navigation and quick-action toolbars anchor primary interactions.
- **Tablet (640px - 1024px):** 8-column layout with `1.5rem` outer margins. Content groups reflow into dual-column cards with persistent filter side-rails.
- **Desktop (> 1024px):** 12-column layout max-width constrained to `1200px` centered canvas, utilizing `2rem` margins and `1.5rem` gutters. Side navigation replaces the bottom drawer.

## Elevation & Depth

Visual depth is achieved through an ambient layered model combining soft Indigo-tinted drop shadows with semi-translucent surface borders.

- **Level 0 (Flat Canvas):** `#f8fafc` background with subtle `#f1f5f9` structural section cards.
- **Level 1 (Standard Card & Shell):** Pure white `#ffffff` surface, bounded by a 1px border of `rgba(226, 232, 240, 0.8)`. Soft ambient drop shadow: `0 4px 16px -2px rgba(79, 70, 229, 0.04), 0 2px 6px -1px rgba(15, 23, 42, 0.04)`.
- **Level 2 (Hovered Card / Floating Nav):** `0 12px 24px -4px rgba(79, 70, 229, 0.08), 0 4px 10px -2px rgba(15, 23, 42, 0.03)`.
- **Level 3 (Modal Sheets & Action Overlays):** `0 20px 32px -6px rgba(15, 23, 42, 0.12), 0 8px 16px -4px rgba(79, 70, 229, 0.06)`. Accompanied by a 16px backdrop-blur scrim (`rgba(15, 23, 42, 0.4)`).

## Shapes

The geometric signature is grounded on modern extra-rounded architecture:
- **Base UI Elements & Standard Cards:** Standardized on `rounded-2xl` (1rem to 1.25rem) to evoke an approachable, modern smartphone OS sensation.
- **Chips, Pills, & Badges:** Fully circular/pill boundaries (`rounded-full`) to complement the compact monospaced text.
- **Interactive Buttons:** `rounded-xl` (0.75rem) to provide structured differentiation from rounded cards while maintaining comfortable tap ergonomics.

## Components

### Buttons
- **Primary:** Filled with Primary Indigo (`#4f46e5`), pure white text, bold tracking. Active press state applies scale `0.98` with `#4338ca` fill.
- **Secondary / Energetic:** Energetic Citrus (`#f97316`) background with white text for critical CTAs like "RSVP Now" or "Check In".
- **Ghost / Outlined:** 1px border in `#e2e8f0`, background transparent, text `#0f172a`. Hover transitions to 5% indigo tint.

### Badges & Method Chips
- Pill-shaped (`rounded-full`), padded `4px 10px`.
- **HTTP Badges (`GET`, `POST`):** JetBrains Mono bold label at 10px/12px uppercase. `GET` uses Sky tint background (`#e0f2fe`) with `#0369a1` text. `POST` uses Emerald tint background (`#dcfce7`) with `#15803d` text.
- **Live / Status Badges:** Neutral-dark or orange-tinted background accompanied by a 6px pulsing circular light indicator in the prefix.

### Event Cards
- Built with `rounded-2xl`, `#ffffff` fill, and Level 1 elevation.
- Features dual-row headers: Date pill tag in upper-left (e.g., `OCT 24`), Method/Category tag in upper-right.
- Image containers maintain 16:9 or 2:1 ratios with `rounded-xl` inner overflow masks.
- Bottom footer contains event meta (attendee avatars, location icon, and quick-save bookmark toggle).

### Form Controls & Inputs
- **Inputs:** 48px height for touch confidence, `rounded-xl`, `#f8fafc` surface fill with 1px `#e2e8f0` stroke. Transition to 2px `#4f46e5` border on focus with 3px `rgba(79, 70, 229, 0.15)` ring.
- **Selection Controls:** Checkboxes and radios styled in `#4f46e5` when selected, with smooth spring scale transitions.

### Navigation Elements
- **Bottom Navigation Bar (Mobile):** Fixed dock, 64px height, Level 2 elevation, frosted background blur (`rgba(255, 255, 255, 0.9)`), with active items highlighting via an Indigo top-accent pip and high-contrast icon fill.