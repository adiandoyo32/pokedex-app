import { useQuery } from '@apollo/client'
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import PokexLayout from '@/components/layout/PokexLayout'
import useMediaQuery, { WIDE_QUERY } from '@/hooks/useMediaQuery'
import DetailNav from '@/components/detail/DetailNav'
import DetailHero, { DetailHeroHandle } from '@/components/detail/DetailHero'
import AboutCard from '@/components/detail/AboutCard'
import StatsCard from '@/components/detail/StatsCard'
import TypeDefensesCard from '@/components/detail/TypeDefensesCard'
import SpritesCard from '@/components/detail/SpritesCard'
import EvolutionCard from '@/components/detail/EvolutionCard'
import MovesCard from '@/components/detail/MovesCard'
import { FormOption } from '@/components/detail/FormPicker'
import { ListState } from '@/components/pokedex/ListStates'
import { GET_POKEMON_DETAIL } from '@/graphql/queries/getPokemonDetail'
import usePrefetchDetail from '@/hooks/usePrefetchDetail'
import {
  EASE,
  peekDetailTransition,
  prefersReducedMotion,
  setDetailTransition,
  takeDetailTransition
} from '@/utils/detail-transition'
import { GENERATIONS } from '@/utils/pokex-theme'
import { pokemonDetailPath, titleCase } from '@/utils/pokemon'

/** Label, tag and full display name for one of a species' forms. */
const describeForm = (
  form: Pokemon.Form,
  species: Pokemon.Species,
  displayName: string
): FormOption & { name: string } => {
  if (form.isDefault) {
    return { id: form.id, label: 'Normal', tag: 'Base form', name: displayName }
  }
  const suffix = form.name.replace(species.name, '').replace(/^-/, '')
  if (suffix === 'gmax') {
    return {
      id: form.id,
      label: 'Gigantamax',
      tag: 'Gigantamax',
      name: `Gigantamax ${displayName}`
    }
  }
  if (suffix.startsWith('mega')) {
    const variant = titleCase(suffix.replace(/^mega-?/, ''))
    return {
      id: form.id,
      label: variant ? `Mega ${variant}` : 'Mega',
      tag: 'Mega Evolution',
      name: `Mega ${displayName}${variant ? ` ${variant}` : ''}`
    }
  }
  const label = titleCase(suffix || form.name)
  return {
    id: form.id,
    label,
    tag: 'Alternate form',
    name: `${displayName} (${label})`
  }
}

const Skeleton = () => (
  <div className="flex flex-col gap-5" aria-busy="true">
    <div className="h-[440px] animate-pkx-pulse rounded-[28px] bg-pkx-surface2 motion-reduce:animate-none" />
    <div className="grid gap-5 lg:grid-cols-2">
      <div className="h-[320px] animate-pkx-pulse rounded-pkx-card bg-pkx-surface2 motion-reduce:animate-none" />
      <div className="h-[320px] animate-pkx-pulse rounded-pkx-card bg-pkx-surface2 motion-reduce:animate-none" />
    </div>
  </div>
)

const PokemonDetail = () => {
  const params = useParams()
  const id = Number(params.id)
  const navigate = useNavigate()
  const location = useLocation()
  const scrollRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const bodyRef = useRef<HTMLDivElement>(null)
  const heroRef = useRef<DetailHeroHandle>(null)
  /** Species whose entrance already played (guards StrictMode re-runs). */
  const playedFor = useRef<number | null>(null)
  const prefetch = usePrefetchDetail()

  // Wide desktop uses the flat detail layout (design 5d).
  const flat = useMediaQuery(WIDE_QUERY)
  const [formIndex, setFormIndex] = useState(0)
  const [shiny, setShiny] = useState(false)

  const { data, loading, error, refetch } = useQuery<Pokemon.Detail>(
    GET_POKEMON_DETAIL,
    { variables: { id }, skip: !Number.isInteger(id) }
  )

  const species = data?.species[0] ?? null
  const prev = data ? (data.prev[0] ?? data.last[0]) : undefined
  const next = data ? (data.next[0] ?? data.first[0]) : undefined

  // New Pokémon: back to its base form, normal colors and the top.
  useEffect(() => {
    setFormIndex(0)
    setShiny(false)
    // Evolution jumps glide back up; everything else snaps to the top.
    const smooth = peekDetailTransition(id)?.kind === 'jump'
    scrollRef.current?.scrollTo({
      top: 0,
      behavior: smooth ? 'smooth' : 'auto'
    })
  }, [id])

  // Entrance animation once the hero for this Pokémon is on screen.
  useLayoutEffect(() => {
    if (!species || playedFor.current === species.id) return
    playedFor.current = species.id
    const transition = takeDetailTransition(species.id)
    if (prefersReducedMotion()) return
    heroRef.current?.play(transition)
    if (!transition || transition.kind === 'open') {
      contentRef.current?.animate([{ opacity: 0 }, { opacity: 1 }], {
        duration: 220,
        easing: 'ease-out'
      })
      bodyRef.current?.animate(
        [
          { opacity: 0, transform: 'translateY(80px)' },
          { opacity: 1, transform: 'none' }
        ],
        { duration: 520, delay: 60, easing: EASE, fill: 'backwards' }
      )
    }
  }, [species])

  // Warm the neighbours so prev/next animate without a loading state.
  useEffect(() => {
    if (prev) prefetch(prev.id)
    if (next) prefetch(next.id)
  }, [prev, next, prefetch])

  const goBack = () => {
    // Return to the list the user came from; deep links fall back to "/".
    let left = false
    const leave = () => {
      if (left) return
      left = true
      if (location.key !== 'default') navigate(-1)
      else navigate('/')
    }
    const content = contentRef.current
    if (!content || prefersReducedMotion()) return leave()
    content.animate(
      [{ opacity: 1 }, { opacity: 0, transform: 'translateY(24px)' }],
      { duration: 200, easing: 'ease-in', fill: 'forwards' }
    ).onfinish = leave
    // Animations don't advance in a hidden tab; never leave the user stuck.
    window.setTimeout(leave, 400)
  }

  const markStep = (direction: -1 | 1) => {
    const target = direction < 0 ? prev : next
    if (target)
      setDetailTransition({ id: target.id, kind: 'step', dir: direction })
    return target
  }

  const step = (direction: -1 | 1) => {
    const target = markStep(direction)
    if (target) navigate(pokemonDetailPath(target))
  }

  // Arrow keys step through the Pokédex.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const el = e.target as HTMLElement
      if (el.closest('input, textarea, [contenteditable]')) return
      if (e.key === 'ArrowLeft') step(-1)
      if (e.key === 'ArrowRight') step(1)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  })

  const view = useMemo(() => {
    if (!species) return null
    const forms = [...species.forms].sort(
      (a, b) => Number(b.isDefault) - Number(a.isDefault)
    )
    const base = forms[0]
    const form = forms[formIndex] ?? base
    const displayName = species.names[0]?.name ?? titleCase(species.name)
    const genus = species.names[0]?.genus ?? ''
    const options = forms.map(f => describeForm(f, species, displayName))
    const current = options[formIndex] ?? options[0]
    const gen = GENERATIONS.find(g => g.id === species.generationId)

    return {
      form,
      forms: options,
      isBaseForm: form.isDefault,
      name: current.name,
      numLabel: `N° ${species.id}${form.isDefault ? '' : ` · ${current.tag}`}`,
      genus,
      types: form.types.map(t => t.type.name),
      stats: form.stats.map(s => s.base_stat),
      description: (species.flavor[0]?.text ?? '').replace(/[\n\f\r]+/g, ' '),
      facts: [
        { label: 'Height', value: `${(form.height / 10).toFixed(1)} m` },
        // "100 kg", "6.5 kg" — no trailing ".0" (matches the design).
        {
          label: 'Weight',
          value: `${Number((form.weight / 10).toFixed(1))} kg`
        },
        { label: 'Catch rate', value: String(species.captureRate) },
        { label: 'Category', value: genus.replace(/ Pokémon$/, '') || '—' },
        { label: 'Region', value: gen?.region ?? '—' },
        { label: 'Generation', value: gen?.roman ?? '—' }
      ],
      abilities: form.abilities.map(a => ({
        name: titleCase(a.ability.name),
        hidden: a.isHidden
      })),
      // Gigantamax and similar forms have no move list of their own.
      moves: form.moves.length ? form.moves : base.moves,
      chain: species.chain?.species ?? []
    }
  }, [species, formIndex])

  const renderContent = () => {
    if (error && !data) {
      return (
        <ListState
          title="Couldn’t load this Pokémon"
          text="Check your connection and try again."
          action="Retry"
          onAction={() => refetch()}
        />
      )
    }
    if (loading && !data) return <Skeleton />
    if (!species || !view) {
      return (
        <ListState
          title="Pokémon not found"
          text="That Pokédex number doesn’t exist."
          action="Back to Pokédex"
          onAction={() => navigate('/')}
        />
      )
    }

    return (
      <div className="flex flex-col gap-5">
        <DetailHero
          ref={heroRef}
          layout={flat ? 'flat' : 'card'}
          facts={view.facts}
          speciesId={species.id}
          formId={view.form.id}
          name={view.name}
          numLabel={view.numLabel}
          genus={view.genus}
          types={view.types}
          shiny={shiny}
          onToggleShiny={() => setShiny(s => !s)}
          forms={view.forms}
          formIndex={formIndex}
          onPickForm={setFormIndex}
          onSwipe={step}
        />
        <div ref={bodyRef} className="flex flex-col gap-5">
          <div className="grid items-start gap-5 lg:grid-cols-2">
            <AboutCard
              description={view.description}
              facts={view.facts}
              abilities={view.abilities}
              genderRate={species.genderRate}
              flat={flat}
            />
            <StatsCard
              stats={view.stats}
              type={view.types[0] ?? 'normal'}
              flat={flat}
            />
          </div>
          <div className="grid items-start gap-5 lg:grid-cols-2">
            <TypeDefensesCard types={view.types} flat={flat} />
            <SpritesCard
              formId={view.form.id}
              isBaseForm={view.isBaseForm}
              caption={view.isBaseForm ? 'Base form' : view.name}
              flat={flat}
            />
          </div>
          {view.chain.length > 0 && (
            <EvolutionCard
              chain={view.chain}
              currentId={species.id}
              flat={flat}
              onSelect={target =>
                setDetailTransition({ id: target, kind: 'jump' })
              }
            />
          )}
          <MovesCard moves={view.moves} flat={flat} />
        </div>
      </div>
    )
  }

  return (
    <PokexLayout scrollRef={scrollRef} width="detail">
      <div ref={contentRef}>
        <DetailNav onBack={goBack} onStep={markStep} prev={prev} next={next} />
        {renderContent()}
      </div>
    </PokexLayout>
  )
}

export default PokemonDetail
