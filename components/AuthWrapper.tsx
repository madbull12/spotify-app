import { useSession } from 'next-auth/react'
import { useRouter } from 'next/router'
import React from 'react'
import ProtectedRoute from './ProtectedRoute'

const authRoutes = ['/search',"/","/search/[slug]","/album/[albumId]","/artist/[artistId]","/playlist/[playlistId]"]

const AuthWrapper = ({ children }: { children: React.ReactNode }) => {
  const session = useSession()
  const router = useRouter()
  console.log(session)

  if (session.status === 'loading') return null

  return (
    <>
      {authRoutes.includes(router.pathname) ? (
        <ProtectedRoute>{children}</ProtectedRoute>
      ) : (
        children
      )}
    </>
  )
}

export default AuthWrapper