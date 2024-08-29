import { RouterProvider } from 'react-router-dom'
import { rootRouter } from '@/routes'

function AppRoot() {

  return (
    <RouterProvider router={rootRouter} />
  )
}

export default AppRoot
