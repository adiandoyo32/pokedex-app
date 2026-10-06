import { useEffect, useState } from 'react'
import { ChevronDownIcon } from '@/components/icons'
import { spriteUrl } from '@/utils/pokemon'

export type FormOption = {
  id: number
  label: string
  tag: string
}

type Props = {
  forms: FormOption[]
  current: number
  onPick: (index: number) => void
  /** Button fill on the hero (translucent white). */
  buttonBg: string
}

const FormPicker: React.FC<Props> = ({ forms, current, onPick, buttonBg }) => {
  const [open, setOpen] = useState(false)
  const active = forms[current]

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  return (
    <div className="relative">
      {open && (
        <div className="fixed inset-0 z-10" onClick={() => setOpen(false)} />
      )}
      <button
        type="button"
        className="flex h-11 items-center gap-2 whitespace-nowrap rounded-pkx-btn pl-1.5 pr-3 text-[13px] font-extrabold"
        style={{ background: buttonBg }}
        aria-haspopup="true"
        aria-expanded={open}
        onClick={() => setOpen(o => !o)}
      >
        <img
          src={spriteUrl(active.id, 'art')}
          alt=""
          className="size-8 object-contain"
        />
        <span className="opacity-65">Form</span>
        {active.label}
        <ChevronDownIcon />
      </button>
      {open && (
        <div className="absolute right-0 top-[52px] z-20 flex max-h-[320px] w-[260px] animate-pkx-fade flex-col gap-0.5 overflow-y-auto rounded-2xl border border-pkx-line bg-pkx-surface p-1.5 text-pkx-ink shadow-[0_18px_40px_rgba(16,22,49,0.16)] motion-reduce:animate-none">
          {forms.map((form, i) => (
            <button
              key={form.id}
              type="button"
              className={`flex h-[52px] flex-none items-center gap-2.5 rounded-[10px] pl-1.5 pr-2.5 text-left transition-colors ${
                i === current ? 'bg-pkx-surface2' : 'hover:bg-pkx-track'
              }`}
              aria-pressed={i === current}
              onClick={() => {
                onPick(i)
                setOpen(false)
              }}
            >
              <img
                src={spriteUrl(form.id, 'art')}
                alt=""
                className="size-10 object-contain"
                loading="lazy"
              />
              <span className="flex flex-col gap-px">
                <span
                  className={`text-sm ${i === current ? 'font-black' : 'font-extrabold'}`}
                >
                  {form.label}
                </span>
                <span className="text-xs font-bold text-pkx-ink2">
                  {form.tag}
                </span>
              </span>
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default FormPicker
