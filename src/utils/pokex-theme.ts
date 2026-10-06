// Type color system for the Pokex "Duo" design. Each type is a hue + chroma
// pair in OKLCH; lightness is chosen per surface and per light/dark mode.
const TYPE_HUE: Record<string, [hue: number, chroma: number]> = {
  normal: [90, 0.03],
  fire: [45, 0.16],
  water: [245, 0.13],
  electric: [95, 0.16],
  grass: [140, 0.15],
  ice: [205, 0.09],
  fighting: [28, 0.15],
  poison: [315, 0.13],
  ground: [70, 0.11],
  flying: [270, 0.1],
  psychic: [355, 0.14],
  bug: [125, 0.14],
  rock: [80, 0.08],
  ghost: [295, 0.12],
  dragon: [275, 0.16],
  dark: [40, 0.025],
  steel: [230, 0.03],
  fairy: [350, 0.09]
}

const POKEMON_TYPES = Object.keys(TYPE_HUE)

const hueOf = (type: string) => TYPE_HUE[type] ?? TYPE_HUE.normal

const oklch = (l: number, c: number, h: number) =>
  `oklch(${l} ${c.toFixed(3)} ${h})`

/** Card background: flat tint for one type, diagonal blend for dual types. */
const duoBackground = (types: string[], dark: boolean) => {
  const tints = types.slice(0, 2).map(type => {
    const [h, c] = hueOf(type)
    return oklch(dark ? 0.29 : 0.945, c * 0.3, h)
  })
  if (tints.length < 2) return tints[0] ?? oklch(0.945, 0.01, 90)
  return `linear-gradient(110deg, ${tints[0]} 0%, ${tints[0]} 38%, ${tints[1]} 100%)`
}

/** Detail hero: stronger tint than the card, blended top-to-bottom. */
const heroBackground = (types: string[], dark: boolean) => {
  const tints = types.slice(0, 2).map(type => {
    const [h, c] = hueOf(type)
    return dark ? oklch(0.32, c * 0.38, h) : oklch(0.92, c * 0.4, h)
  })
  if (tints.length < 2) return tints[0] ?? oklch(0.92, 0.01, 90)
  return `linear-gradient(160deg, ${tints[0]} 0%, ${tints[0]} 38%, ${tints[1]} 100%)`
}

/** Base-stat bar fill. */
const typeBar = (type: string) => {
  const [h, c] = hueOf(type)
  return oklch(0.72, c, h)
}

/** Solid fill for the type tag on a Duo card. */
const typeSolid = (type: string, dark: boolean) => {
  const [h, c] = hueOf(type)
  return oklch(dark ? 0.58 : 0.6, c, h)
}

/** Small dot used in filter menus. */
const typeDot = (type: string) => {
  const [h, c] = hueOf(type)
  return oklch(0.72, c, h)
}

/** Soft tint behind the sprite in the table view. */
const typeTint = (type: string, dark: boolean) => {
  const [h, c] = hueOf(type)
  return dark ? oklch(0.3, c * 0.35, h) : oklch(0.93, c * 0.5, h)
}

/** Pill colors for type chips in the table view. */
const typePill = (type: string) => {
  const [h, c] = hueOf(type)
  return type === 'dark'
    ? { background: oklch(0.5, 0.03, h), color: '#ffffff' }
    : { background: oklch(0.8, c * 0.95, h), color: '#15172b' }
}

const GENERATIONS = [
  { id: 1, roman: 'I', region: 'Kanto', range: '1–151' },
  { id: 2, roman: 'II', region: 'Johto', range: '152–251' },
  { id: 3, roman: 'III', region: 'Hoenn', range: '252–386' },
  { id: 4, roman: 'IV', region: 'Sinnoh', range: '387–493' },
  { id: 5, roman: 'V', region: 'Unova', range: '494–649' },
  { id: 6, roman: 'VI', region: 'Kalos', range: '650–721' },
  { id: 7, roman: 'VII', region: 'Alola', range: '722–809' },
  { id: 8, roman: 'VIII', region: 'Galar', range: '810–905' },
  { id: 9, roman: 'IX', region: 'Paldea', range: '906–1025' }
]

const SORTS = [
  { label: 'Number ↑', orderBy: { id: 'asc' } },
  { label: 'Number ↓', orderBy: { id: 'desc' } },
  { label: 'Name A–Z', orderBy: { name: 'asc' } },
  { label: 'Name Z–A', orderBy: { name: 'desc' } }
]

const capitalize = (s: string) => (s ? s[0].toUpperCase() + s.slice(1) : s)

export {
  POKEMON_TYPES,
  GENERATIONS,
  SORTS,
  capitalize,
  duoBackground,
  heroBackground,
  typeBar,
  typeSolid,
  typeDot,
  typeTint,
  typePill
}
