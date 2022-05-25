import Image from 'next/image'
import React from 'react'
import logo from '../public/img/logo.png'
import { IoMdHome,IoMdCompass,IoMdMicrophone,IoMdClock, IoMdLogOut } from 'react-icons/io'
import { HiChartBar,HiDotsHorizontal } from 'react-icons/hi'
import Dropdown from './Dropdown'
import { signOut, useSession } from 'next-auth/react'

const Sidebar = () => {
  const { data: session } = useSession();

  return (
    <section className="fixed top-0 z-40 flex flex-col p-4 items-center bg-black w-[60px] lg:w-[90px]  space-y-8 h-screen">
        <Image src={logo} width={60} height={60} alt="logo" objectFit='contain' />
        <div className="space-y-6 flex flex-col">
            <IoMdHome className='icon text-white' />
            <IoMdCompass className='icon' />

            <IoMdMicrophone className='icon' />
            <HiChartBar className='icon' />
            <IoMdClock className='icon' />
            <HiDotsHorizontal className='icon' />

        </div>
        <IoMdLogOut className="text-2xl cursor-pointer text-white sm:hidden" onClick={()=>signOut({ redirect:false })}  />
        
  
    </section>
  )
}

export default Sidebar