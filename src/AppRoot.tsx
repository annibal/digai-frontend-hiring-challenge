import { RouterProvider, RouterProviderProps } from 'react-router-dom'
import { rootRouter } from './routes'


export interface IAppRoot {
  // router: RouterProviderProps['router']
}

function AppRoot() {
  console.log(1)
  return (
    <RouterProvider router={rootRouter} />
  )
}

export default AppRoot
