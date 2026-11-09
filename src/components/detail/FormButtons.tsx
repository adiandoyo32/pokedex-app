import type { FormOption } from '@/components/detail/FormPicker'
import { spriteUrl } from '@/utils/pokemon'

type Props = {
  forms: FormOption[]
  current: number
  onPick: (index: number) => void
}

/** Inline row of form buttons used by the flat detail hero (design 5d). */
const FormButtons: React.FC<Props> = ({ forms, current, onPick }) => (
  <div className="flex flex-wrap gap-1.5" role="group" aria-label="Form">
    {forms.map((form, i) => (
      <button
        key={form.id}
        type="button"
        title={form.tag}
        className={`flex h-10 items-center gap-1.5 whitespace-nowrap rounded-[10px] border pl-1.5 pr-3.5 text-[13px] font-extrabold transition-colors duration-200 ${
          i === current
            ? 'border-pkx-ink bg-pkx-ink text-pkx-bg'
            : 'border-transparent bg-pkx-surface2 text-pkx-ink hover:bg-pkx-track'
        }`}
        aria-pressed={i === current}
        onClick={() => onPick(i)}
      >
        <img
          src={spriteUrl(form.id, 'art')}
          alt=""
          loading="lazy"
          className="size-[30px] object-contain"
        />
        {form.label}
      </button>
    ))}
  </div>
)

export default FormButtons
