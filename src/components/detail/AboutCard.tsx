import { DetailCard, Tile } from '@/components/detail/DetailCard'

const MALE = 'oklch(0.64 0.13 245)'
const FEMALE = 'oklch(0.68 0.14 355)'

type Props = {
  description: string
  facts: { label: string; value: string }[]
  abilities: { name: string; hidden: boolean }[]
  /** Female share in eighths (PokeAPI `gender_rate`); -1 is genderless. */
  genderRate: number
}

const AboutCard: React.FC<Props> = ({
  description,
  facts,
  abilities,
  genderRate
}) => {
  const female = genderRate < 0 ? null : (genderRate / 8) * 100
  const male = female === null ? null : 100 - female

  return (
    <DetailCard title="About" className="gap-5">
      {description && (
        <p className="m-0 -mt-2 text-base font-semibold leading-[1.6] text-pkx-ink2 [text-wrap:pretty]">
          {description}
        </p>
      )}
      <div className="grid grid-cols-3 gap-2 max-sm:grid-cols-2">
        {facts.map(f => (
          <Tile key={f.label} className="flex flex-col gap-1 px-3.5 py-3">
            <span className="text-xs font-extrabold text-pkx-ink3">
              {f.label}
            </span>
            <span className="text-base font-extrabold">{f.value}</span>
          </Tile>
        ))}
      </div>
      <div className="grid grid-cols-2 items-start gap-6 max-sm:grid-cols-1">
        <div className="flex flex-col gap-2.5">
          <span className="text-[13px] font-extrabold text-pkx-ink3">
            Abilities
          </span>
          <div className="flex flex-wrap gap-1.5">
            {abilities.map(a => (
              <Tile
                key={a.name}
                className="inline-flex h-[34px] items-center gap-2 px-3 text-sm font-extrabold"
              >
                {a.name}
                {a.hidden && (
                  <span className="text-[11px] font-extrabold text-pkx-ink3">
                    Hidden
                  </span>
                )}
              </Tile>
            ))}
          </div>
        </div>
        <div className="flex flex-col gap-2.5">
          <span className="text-[13px] font-extrabold text-pkx-ink3">
            Gender ratio
          </span>
          {male === null || female === null ? (
            <span className="text-sm font-extrabold text-pkx-ink2">
              Genderless
            </span>
          ) : (
            <>
              <div className="mt-1 flex h-2 gap-[3px]">
                {male > 0 && (
                  <div
                    className="rounded"
                    style={{ width: `${male}%`, background: MALE }}
                  />
                )}
                {female > 0 && (
                  <div
                    className="flex-1 rounded"
                    style={{ background: FEMALE }}
                  />
                )}
              </div>
              <div className="flex justify-between text-[13px] font-extrabold">
                <span style={{ color: MALE }}>♂ {male}%</span>
                <span style={{ color: FEMALE }}>♀ {female}%</span>
              </div>
            </>
          )}
        </div>
      </div>
    </DetailCard>
  )
}

export default AboutCard
