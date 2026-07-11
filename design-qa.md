# Design QA - M14 landing refinements

- Source visual truth: `/Users/gloutchov/Desktop/Screenshot 2026-07-11 alle 14.54.24.png`
- Final desktop implementation: `docs/design-qa/m14-landing-desktop.png`
- Mobile implementation: `docs/design-qa/m14-landing-mobile.png`
- Desktop viewport: 1440 x 1200
- Mobile viewport: 390 x 844
- State: landing, Italian, carousel visible

## Full-view comparison evidence

The source showed the existing landing with carousel indicators wrapping onto a second line. The revised implementation preserves the established typography, indigo/teal palette, card radii, controls, and carousel structure. A compact teal callout has been intentionally added above the carousel content, as requested. The carousel card was compacted to offset the new callout, and all eleven indicators remain on one line.

## Focused-region evidence

The focused comparison concerned the carousel footer and new novice callout. Desktop evidence shows a single unbroken indicator row with the explanatory copy retaining its own space. Mobile evidence shows the callout stacked vertically, a readable CTA, no horizontal clipping, and the carousel continuing below it. No separate image assets or icons were introduced.

## Findings and comparison history

- P2 resolved: carousel indicators wrapped in the source screenshot.
  - Fix: `flex-wrap: nowrap`, non-shrinking indicator container, and compact carousel spacing.
  - Post-fix evidence: final desktop screenshot shows every indicator on one line.
- P2 resolved: adding a novice promotion could have made the carousel substantially taller.
  - Fix: compact callout plus reduced carousel frame margin, card padding, fact padding, and internal vertical gaps.
  - Post-fix evidence: the callout and complete mode information remain visible together at the target desktop viewport.
- P2 resolved: a new generic green would have drifted from the product palette.
  - Fix: existing teal/cyan family used for border, background, badge, and CTA.
- P2 resolved: ASCII approximations of Italian accents reduced copy quality.
  - Fix: visible Italian strings and their Markdown source were normalized to Unicode accents; the generated learning asset was rebuilt.

## Required fidelity surfaces

- Fonts and typography: existing families, weights, hierarchy, wrapping, and antialiasing preserved; callout uses the established scale.
- Spacing and layout rhythm: callout and carousel compaction balance each other; indicators no longer wrap; mobile stacks without overflow.
- Colors and visual tokens: callout reuses the existing teal/cyan accent and indigo context rather than adding a foreign green.
- Image quality and asset fidelity: no new raster, placeholder, SVG, or substitute asset was required.
- Copy and content: accents corrected; novice promise is concise and consistent with the implemented learning path.

## Primary interactions and console

- Novice CTA selects `first-steps` and opens the profile step.
- Carousel controls and indicators remain interactive.
- Desktop and mobile layouts inspected.
- Browser console: zero errors and zero warnings.

## Follow-up polish

No remaining P0, P1, or P2 findings. Minor P3 spacing adjustments can be considered after broader device testing.

final result: passed
