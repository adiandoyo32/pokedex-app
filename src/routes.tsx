import { Route, Routes as AppRoutes } from 'react-router-dom'
import Pokemon from '@/pages/Pokemon'
import PokemonDetail from '@/pages/PokemonDetail'

const Routes = () => {
  return (
    <AppRoutes>
      <Route path="/" element={<Pokemon />} />
      <Route path="/pokemon/:id--:name" element={<PokemonDetail />} />
    </AppRoutes>
  )
}

export default Routes
