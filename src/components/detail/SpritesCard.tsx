import { DetailCard, Tile } from '@/components/detail/DetailCard'
import { SpriteKind, spriteUrl } from '@/utils/pokemon'

// Base forms show the classic pixel sprites; alternate forms (Mega,
// Gigantamax…) only have artwork and 3D renders.
const BASE: [string, SpriteKind][] = [
  ['Front', 'front'],
  ['Back', 'back'],
  ['Shiny', 'shiny'],
  ['Shiny back', 'backShiny']
]
const FORM: [string, SpriteKind][] = [
  ['Artwork', 'art'],
  ['Shiny artwork', 'artShiny'],
  ['3D model', 'home'],
  ['3D shiny', 'homeShiny']
]

type Props = {
  formId: number
  isBaseForm: boolean
  caption: string
}

const SpritesCard: React.FC<Props> = ({ formId, isBaseForm, caption }) => (
  <DetailCard title="Sprites" meta={caption}>
    <div className="grid grid-cols-4 gap-2.5 max-sm:grid-cols-2">
      {(isBaseForm ? BASE : FORM).map(([label, kind]) => (
        <Tile key={kind} className="relative aspect-square overflow-hidden">
          <img
            src={spriteUrl(formId, kind)}
            alt={label}
            loading="lazy"
            className={`absolute left-[8%] top-[6%] h-[78%] w-[84%] object-contain ${
              isBaseForm ? 'pixelated' : ''
            }`}
          />
          <span className="absolute bottom-[9px] left-2.5 text-xs font-extrabold text-pkx-ink2">
            {label}
          </span>
        </Tile>
      ))}
    </div>
  </DetailCard>
)

export default SpritesCard
