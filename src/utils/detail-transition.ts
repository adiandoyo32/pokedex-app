// Hand-off between the page that starts a navigation (list card, prev/next,
// evolution link) and the detail page that plays the matching animation.

type DetailTransition =
  /** Opened from a list card: the sprite flies from `from` into the hero. */
  | { id: number; kind: 'open'; from: DOMRect }
  /** Prev/next: the artwork slides in from that side. */
  | { id: number; kind: 'step'; dir: -1 | 1 }
  /** Jumped to another Pokémon (evolution chain). */
  | { id: number; kind: 'jump' }

/** Ignore a hand-off that was never picked up (e.g. navigation failed). */
const MAX_AGE_MS = 10_000

let pending: (DetailTransition & { at: number }) | null = null

const setDetailTransition = (t: DetailTransition) => {
  pending = { ...t, at: performance.now() }
}

const peekDetailTransition = (id: number): DetailTransition | null =>
  pending && pending.id === id && performance.now() - pending.at < MAX_AGE_MS
    ? pending
    : null

const takeDetailTransition = (id: number) => {
  const t = peekDetailTransition(id)
  pending = null
  return t
}

const EASE = 'cubic-bezier(.2,.8,.2,1)'

const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export {
  setDetailTransition,
  peekDetailTransition,
  takeDetailTransition,
  prefersReducedMotion,
  EASE
}
export type { DetailTransition }
