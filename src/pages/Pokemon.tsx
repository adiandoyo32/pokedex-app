import { GET_POKEMONS } from '@/graphql/queries/getPokemons'
import { useQuery } from '@apollo/client'
import PokemonList from '@/components/PokemonList'
import { useMemo, useState } from 'react'
import Sidebar from '@/components/Sidebar'

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

  const searchPokemonByName = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault()
    setSearch(e.target.value)
  }

  const pokemons = useMemo(() => {
    const all = data?.pokemons ?? []
    if (!search.trim()) return all
    return all.filter(p =>
      p.name.toLowerCase().includes(search.toLowerCase())
    )
  }, [data, search])

  return (
    <div className="pokedex-layout">
      <Sidebar />
      <main className="pokedex-main">
        {/* Header */}
        <header className="pokedex-header">
          <div>
            <h1 className="pokedex-title">Pokédex</h1>
            <p className="pokedex-subtitle">
              {isLoading ? 'Loading…' : `${pokemons.length} Pokémon found`}
            </p>
          </div>
          {/* Search */}
          <div className="search-wrapper">
            <svg className="search-icon" viewBox="0 0 20 20" fill="none">
              <circle cx="9" cy="9" r="6" stroke="currentColor" strokeWidth="1.5" />
              <path d="M15 15l3 3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </svg>
            <input
              id="pokemon-search"
              type="text"
              className="search-input"
              placeholder="Search Pokémon…"
              value={search}
              onChange={searchPokemonByName}
              autoComplete="off"
            />
            {search && (
              <button
                className="search-clear"
                onClick={() => setSearch('')}
                aria-label="Clear search"
              >
                ×
              </button>
            )}
          </div>
        </header>

        {/* States */}
        {isLoading && (
          <div className="state-container">
            <div className="pokeball-spinner" />
            <p className="state-text">Loading Pokémon…</p>
          </div>
        )}
        {isError && (
          <div className="state-container">
            <p className="state-text error">Failed to load Pokémon. Please try again.</p>
          </div>
        )}
        {!isLoading && !isError && pokemons.length === 0 && (
          <div className="state-container">
            <p className="state-text">No Pokémon match "<strong>{search}</strong>"</p>
          </div>
        )}

        {data && <PokemonList data={pokemons} />}
      </main>
    </div>
  )
}

export default Pokemon
