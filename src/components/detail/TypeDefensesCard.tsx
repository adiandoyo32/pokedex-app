import { DetailCard } from '@/components/detail/DetailCard'
import TypeChip from '@/components/pokedex/TypeChip'
import { defenseMultipliers, multiplierLabel } from '@/utils/type-chart'

const GROUPS: { label: string; test: (m: number) => boolean }[] = [
  { label: 'Weak to', test: m => m > 1 },
  { label: 'Resists', test: m => m > 0 && m < 1 },
  { label: 'Immune to', test: m => m === 0 }
]

const TypeDefensesCard = ({ types }: { types: string[] }) => {
  const mults = defenseMultipliers(types)

  return (
    <DetailCard title="Type defenses">
      {GROUPS.map(group => {
        const items = Object.keys(mults)
          .filter(type => group.test(mults[type]))
          .sort((a, b) => mults[b] - mults[a])
        if (!items.length) return null
        return (
          <div key={group.label} className="flex flex-col gap-2">
            <span className="text-[13px] font-extrabold text-pkx-ink3">
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
