import '../styles/globals.css'
import { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { RecoilRoot } from 'recoil'
import Dashboard from '../components/Dashboard'



function MyApp({ Component, pageProps: { session, ...pageProps } }: AppProps) {

  return (
    <SessionProvider session={session}>
      <RecoilRoot>
        <Dashboard>
          <Component {...pageProps} />


        </Dashboard>


      </RecoilRoot>

    </SessionProvider>
  )
}

export default MyApp
