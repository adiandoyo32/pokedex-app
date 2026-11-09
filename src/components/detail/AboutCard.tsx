import { DetailCard, Tile } from '@/components/detail/DetailCard'

const MALE = 'oklch(0.64 0.13 245)'
const FEMALE = 'oklch(0.68 0.14 355)'

const GenderBar = ({
  male,
  female,
  thin
}: {
  male: number
  female: number
  thin?: boolean
}) => {
  const seg = thin ? 'rounded-[3px]' : 'rounded'
  return (
    <div className={`flex gap-[3px] ${thin ? 'h-1.5' : 'h-2'}`}>
      {male > 0 && (
        <div className={seg} style={{ width: `${male}%`, background: MALE }} />
      )}
      {female > 0 && (
        <div className={`flex-1 ${seg}`} style={{ background: FEMALE }} />
      )}
    </div>
  )
}

type Props = {
  description: string
  facts: { label: string; value: string }[]
  abilities: { name: string; hidden: boolean }[]
  /** Female share in eighths (PokeAPI `gender_rate`); -1 is genderless. */
  genderRate: number
  /** Flat layout (design 5d): "Profile" card — facts live in the hero. */
  flat?: boolean
}

const AboutCard: React.FC<Props> = ({
  description,
  facts,
  abilities,
  genderRate,
  flat
}) => {
  const female = genderRate < 0 ? null : (genderRate / 8) * 100
  const male = female === null ? null : 100 - female

  if (flat) {
    return (
      <DetailCard title="Profile">
        {description && (
          <p className="m-0 -mt-1 text-[15px] font-semibold leading-[1.55] text-pkx-ink2 [text-wrap:pretty]">
            {description}
          </p>
        )}
        <div className="grid grid-cols-2 items-start gap-7">
          <div className="flex flex-col gap-2">
            <span className="text-xs font-extrabold text-pkx-ink3">
              Abilities
            </span>
            <div className="flex flex-wrap gap-x-[18px] gap-y-1.5">
              {abilities.map(a => (
                <span
                  key={a.name}
                  className="inline-flex items-baseline gap-1.5 text-[15px] font-extrabold"
                >
                  {a.name}
                  {a.hidden && (
                    <span className="text-[11px] font-extrabold text-pkx-ink3">
                      Hidden
                    </span>
                  )}
                </span>
              ))}
            </div>
          </div>
          <div className="flex flex-col gap-2">
            {male === null || female === null ? (
              <>
                <span className="text-xs font-extrabold text-pkx-ink3">
                  Gender ratio
                </span>
                <span className="text-[15px] font-extrabold text-pkx-ink2">
                  Genderless
                </span>
              </>
            ) : (
              <>
                <div className="flex justify-between text-[13px] font-extrabold">
                  <span style={{ color: MALE }}>♂ {male}%</span>
                  <span className="text-pkx-ink3">Gender ratio</span>
                  <span style={{ color: FEMALE }}>♀ {female}%</span>
                </div>
                <GenderBar male={male} female={female} thin />
              </>
            )}
          </div>
        </div>
      </DetailCard>
    )
  }

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
              <div className="mt-1">
                <GenderBar male={male} female={female} />
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
