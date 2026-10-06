import { forwardRef, useImperativeHandle, useRef } from 'react'
import FormPicker, { FormOption } from '@/components/detail/FormPicker'
import TypeChip from '@/components/pokedex/TypeChip'
import { HeartIcon, ShinyIcon } from '@/components/icons'
import useFavorites from '@/hooks/useFavorites'
import usePokexTheme from '@/hooks/usePokexTheme'
import {
  DetailTransition,
  EASE,
  prefersReducedMotion
} from '@/utils/detail-transition'
import { heroBackground } from '@/utils/pokex-theme'
import { spriteUrl } from '@/utils/pokemon'

type Props = {
  speciesId: number
  formId: number
  name: string
  numLabel: string
  genus: string
  types: string[]
  shiny: boolean
  onToggleShiny: () => void
  forms: FormOption[]
  formIndex: number
  onPickForm: (index: number) => void
  /** Swipe the artwork left/right to step through the Pokédex. */
  onSwipe: (direction: -1 | 1) => void
}

export type DetailHeroHandle = {
  /** Entrance animation for a newly shown Pokémon (null = no hand-off). */
  play: (transition: DetailTransition | null) => void
}

const SWIPE_THRESHOLD = 60

const DetailHero = forwardRef<DetailHeroHandle, Props>(
  (
    {
      speciesId,
      formId,
      name,
      numLabel,
      genus,
      types,
      shiny,
      onToggleShiny,
      forms,
      formIndex,
      onPickForm,
      onSwipe
    },
    ref
  ) => {
    const { dark } = usePokexTheme()
    const { isFavorite, toggleFavorite } = useFavorites()
    const fav = isFavorite(speciesId)

    const bgRef = useRef<HTMLDivElement>(null)
    const textRef = useRef<HTMLDivElement>(null)
    const artRef = useRef<HTMLDivElement>(null)
    const drag = useRef<{ x: number; dx: number } | null>(null)

    const animateArt = (
      keyframes: Keyframe[],
      options: KeyframeAnimationOptions
    ) => {
      if (prefersReducedMotion()) return
      artRef.current?.animate(keyframes, options)
    }

    useImperativeHandle(ref, () => ({
      play: transition => {
        if (prefersReducedMotion()) return
        const art = artRef.current
        if (art) art.style.transform = ''

        if (transition?.kind === 'step') {
          art?.animate(
            [
              {
                opacity: 0,
                transform: `translateX(${transition.dir * 170}px) scale(.85)`
              },
              { opacity: 1, transform: 'none' }
            ],
            { duration: 420, easing: EASE }
          )
          textRef.current?.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: 300
          })
          return
        }

        if (transition?.kind === 'jump') {
          art?.animate(
            [
              { opacity: 0, transform: 'scale(.6)' },
              { opacity: 1, transform: 'none' }
            ],
            { duration: 500, delay: 200, easing: EASE, fill: 'backwards' }
          )
          return
        }

        // Opening: hero fades up while the card's sprite flies into place.
        bgRef.current?.animate([{ opacity: 0 }, { opacity: 1 }], {
          duration: 320,
          easing: 'ease-out'
        })
        textRef.current?.animate(
          [
            { opacity: 0, transform: 'translateY(10px)' },
            { opacity: 1, transform: 'none' }
          ],
          { duration: 380, delay: 140, easing: 'ease-out', fill: 'backwards' }
        )
        if (!art) return
        if (transition?.kind === 'open') {
          const from = transition.from
          const to = art.getBoundingClientRect()
          const dx = from.left + from.width / 2 - (to.left + to.width / 2)
          const dy = from.top + from.height / 2 - (to.top + to.height / 2)
          const scale = from.width / to.width
          art.animate(
            [
              { transform: `translate(${dx}px, ${dy}px) scale(${scale})` },
              { transform: 'none' }
            ],
            { duration: 560, easing: EASE }
          )
        } else {
          art.animate(
            [
              { opacity: 0, transform: 'scale(.7)' },
              { opacity: 1, transform: 'none' }
            ],
            { duration: 400, easing: EASE }
          )
        }
      }
    }))

    const toggleShiny = () => {
      onToggleShiny()
      animateArt(
        [
          { transform: 'scale(.9) rotate(-8deg)', filter: 'brightness(1.6)' },
          { transform: 'none', filter: 'none' }
        ],
        { duration: 450, easing: EASE }
      )
    }

    const pickForm = (index: number) => {
      if (index === formIndex) return
      onPickForm(index)
      animateArt(
        [
          { opacity: 0, transform: 'scale(.7)' },
          { opacity: 1, transform: 'none' }
        ],
        { duration: 420, easing: EASE }
      )
    }

    // Drag the artwork sideways; past the threshold it steps to prev/next,
    // otherwise it springs back.
    const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
      drag.current = { x: e.clientX, dx: 0 }
      e.currentTarget.setPointerCapture(e.pointerId)
    }
    const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
      const art = artRef.current
      if (!drag.current || !art) return
      drag.current.dx = e.clientX - drag.current.x
      if (!prefersReducedMotion()) {
        art.style.transform = `translateX(${drag.current.dx}px) rotate(${drag.current.dx / 18}deg)`
      }
    }
    const onPointerUp = () => {
      const art = artRef.current
      if (!drag.current) return
      const { dx } = drag.current
      drag.current = null
      if (Math.abs(dx) > SWIPE_THRESHOLD) {
        onSwipe(dx < 0 ? 1 : -1)
        return
      }
      if (art && art.style.transform) {
        const current = art.style.transform
        art.style.transform = ''
        art.animate([{ transform: current }, { transform: 'none' }], {
          duration: 260,
          easing: 'ease-out'
        })
      }
    }

    const ink = dark ? '#ffffff' : 'var(--pkx-ink)'
    const buttonBg = dark ? 'rgba(255,255,255,.1)' : 'rgba(255,255,255,.65)'

    return (
      <div
        className="relative h-[440px] rounded-[28px] border border-pkx-card max-md:h-[470px]"
        style={{ color: ink }}
      >
        <div
          ref={bgRef}
          className="absolute inset-0 rounded-[28px] transition-[background] duration-[450ms]"
          style={{ background: heroBackground(types, dark) }}
        />
        <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[28px]">
          <svg
            viewBox="0 0 100 100"
            className="absolute left-[calc(50%-170px)] top-[50px] size-[340px] rotate-[18deg] text-white max-md:left-[calc(50%-130px)] max-md:top-[150px] max-md:size-[260px]"
            style={{ opacity: dark ? 0.07 : 0.45 }}
            fill="none"
            stroke="currentColor"
            strokeWidth="4"
            aria-hidden="true"
          >
            <circle cx="50" cy="50" r="45" />
            <path d="M5 50h31M64 50h31" />
            <circle cx="50" cy="50" r="14" />
          </svg>
        </div>

        <div
          ref={textRef}
          className="absolute left-8 top-7 flex flex-col gap-0.5 max-md:inset-x-5 max-md:top-5"
        >
          <span className="text-[15px] font-extrabold opacity-60">
            {numLabel}
          </span>
          <h1
            className={`m-0 font-black leading-[1.1] tracking-[-0.02em] ${
              name.length > 12 ? 'text-[30px]' : 'text-[40px]'
            } max-md:text-[30px]`}
          >
            {name}
          </h1>
          <span className="text-[15px] font-bold opacity-65">{genus}</span>
          <div className="mt-3 flex gap-1.5">
            {types.map(type => (
              <TypeChip key={type} type={type} size="lg" />
            ))}
          </div>
        </div>

        <div
          ref={artRef}
          className="absolute left-[calc(50%-150px)] top-[70px] z-[3] size-[300px] cursor-grab touch-pan-y select-none active:cursor-grabbing max-md:left-[calc(50%-115px)] max-md:top-[160px] max-md:size-[230px]"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerCancel={onPointerUp}
        >
          <img
            src={spriteUrl(formId, shiny ? 'artShiny' : 'art')}
            alt={name}
            draggable={false}
            className="pointer-events-none size-full object-contain drop-shadow-[0_18px_22px_rgba(0,0,0,0.2)]"
          />
        </div>

        <div className="absolute right-6 top-6 z-[6] flex gap-2 max-md:bottom-4 max-md:right-4 max-md:top-auto">
          {forms.length > 1 && (
            <FormPicker
              forms={forms}
              current={formIndex}
              onPick={pickForm}
              buttonBg={buttonBg}
            />
          )}
          <button
            type="button"
            className="flex h-11 items-center gap-1.5 rounded-pkx-btn px-4 text-[13px] font-extrabold"
            style={
              shiny
                ? { background: 'var(--pkx-ink)', color: 'var(--pkx-bg)' }
                : { background: buttonBg }
            }
            aria-pressed={shiny}
            onClick={toggleShiny}
          >
            <ShinyIcon />
            {shiny ? 'Shiny' : 'Normal'}
          </button>
          <button
            type="button"
            className="grid size-11 place-items-center rounded-pkx-btn transition-transform active:scale-[0.88]"
            style={{ background: buttonBg }}
            aria-label={fav ? 'Remove from favorites' : 'Add to favorites'}
            aria-pressed={fav}
            onClick={() => toggleFavorite(speciesId)}
          >
            <HeartIcon size={19} filled={fav} />
          </button>
        </div>
      </div>
    )
  }
)

DetailHero.displayName = 'DetailHero'

export default DetailHero
