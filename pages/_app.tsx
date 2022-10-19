import '../styles/globals.css'
import { AppProps } from 'next/app'
import { SessionProvider } from "next-auth/react"
import { RecoilRoot } from 'recoil'
import { QueryClient, QueryClientProvider, useQuery } from '@tanstack/react-query'
import Dashboard from '../components/Dashboard'
import { NextPage } from 'next'
import { ReactElement, ReactNode, useEffect } from 'react'
import AuthWrapper from '../components/AuthWrapper'
import ReactTooltip from 'react-tooltip'
import Backdrop from '../components/Backdrop'
import PlaylistModal from '../components/PlaylistModal'
import { usePlaylistModal } from '../lib/zustand'
import shallow from 'zustand/shallow'
import { Toaster } from 'react-hot-toast'

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: ReactElement) => ReactNode
}

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout
}

function MyApp({ Component, pageProps: { session, ...pageProps } }: AppPropsWithLayout) {
  const isOpen = usePlaylistModal((state)=>state.isOpen);
  // const [isOpen,setOpen] = usePlaylistModal((state:any)=>[state.isOpen,state.setOpen],shallow);
  const getLayout = Component.getLayout || ((page) => page);
  const queryClient = new QueryClient();
  

  useEffect(()=>{
    document.body.style.overflow = isOpen ? "hidden" : "visible"
  },[isOpen])

  return getLayout(

      <SessionProvider session={session}>

        <AuthWrapper>
          <QueryClientProvider client={queryClient}>
            <Toaster 
                position="top-right"
                reverseOrder={false}
            />
            <ReactTooltip />
            <Dashboard>
              <Component {...pageProps} />
           


            </Dashboard>
            {isOpen && (
            <Backdrop>
                <PlaylistModal isEditing={false} />

            </Backdrop> 
            )}
      


          </QueryClientProvider>
     
        </AuthWrapper>
           



        </SessionProvider>

 
  )
}

export default MyApp
