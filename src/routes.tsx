import { createBrowserRouter } from 'react-router-dom'
import App from '@/App'
import Pokemon from '@/pages/Pokemon'

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <Pokemon />
      }
    ]
  }
])
