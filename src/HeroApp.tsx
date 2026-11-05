import type { PropsWithChildren } from 'react'
import { RouterProvider } from 'react-router'
import { appRouter } from './router/app.router'
import { QueryClient, QueryClientProvider, useQuery} from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { FavoriteHeroProvider } from './heroes/context/FavoriteHeroContext'
import { Toaster } from 'sonner'
import { useAuthStore } from './auth/store/auth.store'

const queryClient = new QueryClient();


const CheckAuthProvider = ({ children }: PropsWithChildren ) => {

  const { checkAuthStatus } = useAuthStore();

  const { data, isLoading } = useQuery({
    queryKey: ['auth'],
    queryFn: checkAuthStatus,
    retry: false,
    refetchInterval: 1000 * 60 * 1.5,   //se refresca cada hora  y media
    refetchOnWindowFocus: true, //para cuando se deja de utilizar el navegador un buen rato
  });

  if ( isLoading ) return <h1>Loading ...</h1>;

  console.log (`Checking el loguin ${data}`);

  return children;
}

export const HeroApp = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Toaster />

      { /*Custom Provider */ }
      <CheckAuthProvider>
        <FavoriteHeroProvider>
          <RouterProvider router={appRouter} />
          <ReactQueryDevtools initialIsOpen={false} />
        </FavoriteHeroProvider>
      </CheckAuthProvider>
    </QueryClientProvider>
  )
}

