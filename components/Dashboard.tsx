import React from 'react'
import Body from './Body'
import Right from './Right'
import Sidebar from './Sidebar'

const Dashboard = ({ children }:{children:React.ReactNode}) => {
  return (
    <div>
        <Sidebar />
        <Body>
            {children}
        </Body>
        <Right />
    </div>
  )
}

export default Dashboard