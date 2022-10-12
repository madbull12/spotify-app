import '../styles/globals.css'
import { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import Dashboard from '../components/Dashboard'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'
import AuthWrapper from '../components/AuthWrapper'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {

  const getLayout = Component.getLayout || ((page) => page);
  const queryClient = new QueryClient()
  return getLayout(

      <SessionProvider session={session}>

        <AuthWrapper>
          <QueryClientProvider client={queryClient}>
            <Dashboard>
              <Component {...pageProps} />


            </Dashboard>


          </QueryClientProvider>
     
        </AuthWrapper>
           



        </SessionProvider>

 
  )
}

export default MyApp
