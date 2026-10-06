import { NetworkStatus, useQuery } from '@apollo/client'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { GET_POKEMONS } from '@/graphql/queries/getPokemons'
import PokemonList from '@/components/PokemonList'
import PokexLayout from '@/components/layout/PokexLayout'
import { ListView } from '@/components/pokedex/Toolbar'
import FilterBar, { Filters } from '@/components/pokedex/FilterBar'
import PokemonTable from '@/components/pokedex/PokemonTable'
import {
  EmptyState,
  EndOfList,
  ErrorState
} from '@/components/pokedex/ListStates'
import useFavorites from '@/hooks/useFavorites'
import useDebouncedValue from '@/hooks/useDebouncedValue'
import { SORTS } from '@/utils/pokex-theme'

const PAGE_SIZE = 15

const DEFAULT_FILTERS: Filters = { q: '', gen: 0, type: null, sort: 0 }

/* eslint-disable camelcase -- Hasura filter keys mirror the PokeAPI schema */
const buildWhere = (
  filters: Filters,
  q: string,
  favOnly: boolean,
  favIds: number[]
) => {
  const and: Record<string, unknown>[] = []
  if (filters.gen) and.push({ generation_id: { _eq: filters.gen } })
  if (filters.type) {
    and.push({
      pokemon_v2_pokemons: {
        is_default: { _eq: true },
        pokemon_v2_pokemontypes: {
          pokemon_v2_type: { name: { _eq: filters.type } }
        }
      }
    })
  }
  if (favOnly) and.push({ id: { _in: favIds } })

  const term = q
    .trim()
    .toLowerCase()
    .replace(/^(#|n°)\s*/, '')
    .replace(/\s+/g, '-')
  if (term) {
    const byName = { name: { _ilike: `%${term}%` } }
    const num = Number(term)
    and.push(
      Number.isInteger(num) && num > 0
        ? { _or: [{ id: { _eq: num } }, byName] }
        : byName
    )
  }
  return { _and: and }
}
/* eslint-enable camelcase */

const Pokedex = () => {
  const { ids: favIds } = useFavorites()
  const [searchParams, setSearchParams] = useSearchParams()
  const favOnly = searchParams.get('view') === 'favorites'

  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [view, setView] = useState<ListView>('grid')
  const q = useDebouncedValue(filters.q, 250)

  const scrollRef = useRef<HTMLDivElement>(null)
  const sentinelRef = useRef<HTMLDivElement>(null)

  const variables = useMemo(
    () => ({
      where: buildWhere(filters, q, favOnly, favIds),
      orderBy: [SORTS[filters.sort].orderBy],
      limit: PAGE_SIZE,
      offset: 0
    }),
    // `filters.q` is intentionally excluded — the debounced `q` drives it.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [filters.gen, filters.type, filters.sort, q, favOnly, favIds]
  )

  const { data, error, loading, networkStatus, fetchMore, refetch } =
    useQuery<Pokemon.PokemonList>(GET_POKEMONS, {
      variables,
      notifyOnNetworkStatusChange: true
    })

  const pokemons = data?.pokemons ?? []
  const total = data?.filtered.aggregate.count ?? 0
  const initialLoading = !data && loading
  const loadingMore = networkStatus === NetworkStatus.fetchMore
  const hasMore = pokemons.length < total

  // Back to the top whenever the result set changes.
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: 0 })
  }, [variables])

  // Infinite scroll: load the next page when the sentinel comes into view.
  useEffect(() => {
    const root = scrollRef.current
    const target = sentinelRef.current
    if (!root || !target || !hasMore || loadingMore) return
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          fetchMore({ variables: { offset: pokemons.length } })
        }
      },
      { root, rootMargin: '240px' }
    )
    observer.observe(target)
    return () => observer.disconnect()
  }, [hasMore, loadingMore, pokemons.length, fetchMore])

  const updateFilters = (patch: Partial<Filters>) =>
    setFilters(prev => ({ ...prev, ...patch }))

  const resetAll = () => {
    setFilters(DEFAULT_FILTERS)
    if (favOnly) setSearchParams({})
  }

  const filterCount =
    (filters.type ? 1 : 0) + (filters.gen ? 1 : 0) + (favOnly ? 1 : 0)

  const resultLabel = initialLoading
    ? 'Loading…'
    : total
      ? `${pokemons.length} of ${total}`
      : '0 results'

  const renderResults = () => {
    if (error && !data) return <ErrorState onRetry={() => refetch()} />
    if (!initialLoading && total === 0) return <EmptyState onReset={resetAll} />
    if (view === 'table') {
      return (
        <PokemonTable data={pokemons} loading={initialLoading || loadingMore} />
      )
    }
    return (
      <PokemonList
        data={pokemons}
        skeletons={initialLoading ? 6 : loadingMore ? 3 : 0}
      />
    )
  }

  return (
    <PokexLayout view={view} onViewChange={setView} scrollRef={scrollRef}>
      <div className="flex items-baseline gap-3">
        <h1 className="m-0 text-[30px] font-black leading-[1.3] tracking-[-0.02em]">
          {favOnly ? 'Favorites' : 'Pokédex'}
        </h1>
        <span className="text-sm font-bold text-pkx-ink3">{resultLabel}</span>
      </div>
      <FilterBar
        filters={filters}
        onChange={updateFilters}
        onReset={filterCount > 0 ? resetAll : undefined}
      />
      {renderResults()}
      {total > 0 && !hasMore && <EndOfList count={total} />}
      <div ref={sentinelRef} aria-hidden="true" />
    </PokexLayout>
  )
}

export default Pokedex
