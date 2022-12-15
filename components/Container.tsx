import React from 'react'

const Container = ({ children }: { children:React.ReactNode } ) => {
  return (
    <div className='xl:max-w-[900px] lg:max-w-[640px] min-[1366px]:max-w-[950px]'>
        {children}
    </div>
  )
}

export default Container