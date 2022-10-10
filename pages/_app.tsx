import '../styles/globals.css'
import { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { RecoilRoot } from 'recoil'
import Dashboard from '../components/Dashboard'
import { NextPage } from 'next'
import { ReactElement, ReactNode } from 'react'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {

  const getLayout = Component.getLayout || ((page) => page);

  return getLayout(

      <SessionProvider session={session}>
            <Dashboard>
              <Component {...pageProps} />


            </Dashboard>



        </SessionProvider>

 
  )
}

export default MyApp
