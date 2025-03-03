import { GET_POKEMONS } from '@/graphql/queries/getPokemons'
import { useQuery } from '@apollo/client'
import PokemonList from '@/components/PokemonList'
import { useCallback, useMemo, useState } from 'react'
import useDebounce from '@/hooks/useDebounce'
import Sidebar from '@/components/Sidebar'
import Navbar from '@/components/Navbar'
import Input from '@/components/common/Input'

const Pokemon = () => {
  const gqlVariables = { generation: 'generation-i', name: '' }
  const {
    loading: isLoading,
    error: isError,
    data,
    fetchMore
  } = useQuery<Pokemon.PokemonList>(GET_POKEMONS, {
    variables: gqlVariables
  })

  const [search, setSearch] = useState<string>('')
  const [counter, setCounter] = useState<number>(0)

  const fetchPokemon = useCallback(
    (query: string) => fetchMore({ variables: { name: query } }),
    [fetchMore]
  )

  const debouncedSearch = useDebounce(fetchPokemon, 700)

  const searchPokemonByName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearch(e.target.value)
    // debouncedSearch(e.target.value)
  }

  const pokemons = useMemo(() => {
    return data?.pokemons ?? []
  }, [data])

  return (
    <div className="mx-auto max-w-8xl">
      <Sidebar />
      {/* <Navbar /> */}
      <div className="lg:pl-[22.5rem]">
        <div className="mx-auto flex max-w-2xl pt-10 xl:mr-[15.5rem] xl:max-w-none">
          <Input
            id="name"
            label="Name"
            value={search}
            onChange={searchPokemonByName}
          />
          {counter}
          <button
            onClick={() => {
              setCounter(counter + 1)
            }}
          >
            Increment
          </button>
        </div>
        {isLoading && <p>Loading...</p>}
        {isError && <p>Error</p>}
        {data && <PokemonList data={pokemons} />}
      </div>
    </div>
  )
}

export default Pokemon
