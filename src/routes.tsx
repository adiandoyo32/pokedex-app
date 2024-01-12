import { createBrowserRouter } from 'react-router-dom'
import App from '@/App'
import HomePage from '@/pages/Home'
import List from './pages/List'

export const router = createBrowserRouter([
  {
    element: <App />,
    children: [
      {
        path: '/',
        element: <HomePage />
      },
      {
        path: '/list',
        element: <List />
      }
    ]
  }
])
