import PokemonListItem from '@/components/PokemonListItem'
import { memo } from 'react'

type Props = {
  data: Pokemon.Pokemon[]
}

const PokemonList: React.FC<Props> = ({ data }) => {
  return (
    <div className="mx-auto mt-16 max-w-2xl xl:mr-[15.5rem] xl:max-w-none">
      <div className="grid grid-cols-3 gap-x-7 gap-y-20">
        {data.map(pokemon => {
          return <PokemonListItem {...pokemon} key={pokemon.id} />
        })}
      </div>
    </div>
  )
}

export default memo(PokemonList)
