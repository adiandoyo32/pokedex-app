import { DetailCard } from '@/components/detail/DetailCard'
import TypeChip from '@/components/pokedex/TypeChip'
import { defenseMultipliers, multiplierLabel } from '@/utils/type-chart'

const GROUPS: { label: string; test: (m: number) => boolean }[] = [
  { label: 'Weak to', test: m => m > 1 },
  { label: 'Resists', test: m => m > 0 && m < 1 },
  { label: 'Immune to', test: m => m === 0 }
]

type Props = {
  types: string[]
  /** Flat layout (design 5d): tighter groups. */
  flat?: boolean
}

const TypeDefensesCard: React.FC<Props> = ({ types, flat }) => {
  const mults = defenseMultipliers(types)

  return (
    <DetailCard title="Type defenses" className={flat ? 'gap-3' : ''}>
      {GROUPS.map(group => {
        const items = Object.keys(mults)
          .filter(type => group.test(mults[type]))
          .sort((a, b) => mults[b] - mults[a])
        if (!items.length) return null
        return (
          <div
            key={group.label}
            className={`flex flex-col ${flat ? 'gap-1.5' : 'gap-2'}`}
          >
            <span
              className={`font-extrabold text-pkx-ink3 ${flat ? 'text-xs' : 'text-[13px]'}`}
            >
              {group.label}
            </span>
            <div className="flex flex-wrap gap-1.5">
              {items.map(type => (
                <TypeChip
                  key={type}
                  type={type}
                  size="md"
                  mult={multiplierLabel(mults[type])}
                />
              ))}
            </div>
          </div>
        )
      })}
    </DetailCard>
  )
}

export default TypeDefensesCard
