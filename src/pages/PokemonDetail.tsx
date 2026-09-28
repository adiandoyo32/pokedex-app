import { GET_POKEMON_BY_ID } from '@/graphql/queries/getPokemonById'
import { useQuery } from '@apollo/client'
import { useParams, Link } from 'react-router-dom'
import { app } from '@/config'
import PokemonType from '@/components/PokemonType'
import Stat from '@/components/pokemon-detail/Stat'
import MoveList from '@/components/pokemon-detail/MoveList'
import Sidebar from '@/components/Sidebar'

type DetailData = {
  pokemon: {
    id: number
    name: string
    height: number
    weight: number
    types: Pokemon.Types[]
    moves: Pokemon.Move[]
    sprites: { sprites: any }[]
    stats: Pokemon.Stat[]
    abilities: { ability: { name: string } }[]
    pokemon_v2_pokemonspecy?: {
      pokemon_v2_evolutionchain?: {
        pokemon_v2_pokemonspecies: { id: number; name: string }[]
      }
    }
  }
}

const PokemonDetail = () => {
  const params = useParams<{ id: string; name: string }>()
  const pokemonId = Number(params.id)

  const { loading, error, data } = useQuery<DetailData>(GET_POKEMON_BY_ID, {
    variables: { id: pokemonId }
  })

  if (loading) {
    return (
      <div className="pokedex-layout">
        <Sidebar />
        <main className="pokedex-main">
          <div className="state-container">
            <div className="pokeball-spinner" />
            <p className="state-text">Loading Pokémon…</p>
          </div>
        </main>
      </div>
    )
  }

  if (error || !data?.pokemon) {
    return (
      <div className="pokedex-layout">
        <Sidebar />
        <main className="pokedex-main">
          <div className="state-container">
            <p className="state-text error">Failed to load Pokémon.</p>
            <Link to="/" className="detail-back-btn">
              ← Back to Pokédex
            </Link>
          </div>
        </main>
      </div>
    )
  }

  const pokemon = data.pokemon
  const sprites = pokemon.sprites[0]?.sprites
  const types = pokemon.types ?? []
  const stats = pokemon.stats ?? []
  const abilities = pokemon.abilities ?? []
  const moves = pokemon.moves ?? []
  const evolutionSpecies =
    pokemon.pokemon_v2_pokemonspecy?.pokemon_v2_evolutionchain
      ?.pokemon_v2_pokemonspecies ?? []

  const primaryType = types[0]?.type?.name ?? 'normal'
  const typeColor = app.pokemonTypeColor[primaryType as keyof typeof app.pokemonTypeColor] ?? '#A8A77A'

  const pokedexNumber = `#${pokemonId.toString().padStart(3, '0')}`
  const heightM = (pokemon.height / 10).toFixed(1)
  const weightKg = (pokemon.weight / 10).toFixed(1)

  return (
    <div className="pokedex-layout">
      <Sidebar />
      <main className="pokedex-main detail-main">
        {/* Back */}
        <Link to="/" className="detail-back-btn">
          <svg viewBox="0 0 20 20" width="16" height="16" fill="none">
            <path d="M12 5l-5 5 5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          Back to Pokédex
        </Link>

        {/* Hero */}
        <div className="detail-hero" style={{ '--type-color': typeColor } as React.CSSProperties}>
          <div className="detail-hero-bg" />
          <div className="detail-hero-content">
            <div className="detail-hero-info">
              <span className="detail-number">{pokedexNumber}</span>
              <h1 className="detail-name">{pokemon.name}</h1>
              <PokemonType types={types} />
              <div className="detail-physical">
                <div className="detail-physical-item">
                  <span className="detail-physical-label">Height</span>
                  <span className="detail-physical-value">{heightM} m</span>
                </div>
                <div className="detail-physical-divider" />
                <div className="detail-physical-item">
                  <span className="detail-physical-label">Weight</span>
                  <span className="detail-physical-value">{weightKg} kg</span>
                </div>
              </div>
              {abilities.length > 0 && (
                <div className="detail-abilities">
                  <span className="detail-section-label">Abilities</span>
                  <div className="detail-abilities-list">
                    {abilities.map((a, i) => (
                      <span key={i} className="detail-ability-badge">
                        {a.ability.name.replace(/-/g, ' ')}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
            <div className="detail-hero-image-wrapper">
              <div className="detail-hero-image-circle" />
              <img
                className="detail-hero-image"
                src={app.sprite.official(pokemonId)}
                alt={pokemon.name}
                onError={(e) => {
                  const t = e.target as HTMLImageElement
                  t.src = sprites?.front_default ?? ''
                }}
              />
            </div>
          </div>
        </div>

        {/* Stats */}
        <section className="detail-section">
          <h2 className="detail-section-title">Base Stats</h2>
          <Stat stats={stats} typeColor={typeColor} />
        </section>

        {/* Evolution Chain */}
        {evolutionSpecies.length > 1 && (
          <section className="detail-section">
            <h2 className="detail-section-title">Evolution Chain</h2>
            <div className="detail-evolution-chain">
              {evolutionSpecies.map((species, i) => {
                return (
                  <div key={species.name} className="detail-evo-item">
                    {i > 0 && (
                      <div className="detail-evo-arrow">
                        <svg viewBox="0 0 20 20" width="16" height="16" fill="none">
                          <path d="M5 10h10M11 6l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                      </div>
                    )}
                    <Link to={`/pokemon/${species.id}--${species.name}`} className="detail-evo-card">
                      <img
                        className="detail-evo-image"
                        src={app.sprite.official(species.id)}
                        alt={species.name}
                        onError={(e) => {
                          const t = e.target as HTMLImageElement
                          t.style.opacity = '0.3'
                        }}
                      />
                      <span className="detail-evo-name">{species.name}</span>
                    </Link>
                  </div>
                )
              })}
            </div>
          </section>
        )}

        {/* Moves */}
        {moves.length > 0 && (
          <section className="detail-section">
            <h2 className="detail-section-title">Moves <span className="detail-section-count">{moves.length}</span></h2>
            <MoveList moves={moves} />
          </section>
        )}
      </main>
    </div>
  )
}

export default PokemonDetail
