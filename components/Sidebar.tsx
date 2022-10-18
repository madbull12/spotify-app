import Image from 'next/image'
import React from 'react'
import logo from '../public/img/logo.png'
import { IoMdHome,IoMdCompass,IoMdMicrophone,IoMdClock, IoMdLogOut, IoMdSearch } from 'react-icons/io'
import { HiChartBar,HiDotsHorizontal } from 'react-icons/hi'
import Dropdown from './Dropdown'
import { signOut, useSession } from 'next-auth/react'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { BsPlusSquare } from 'react-icons/bs'

const Sidebar = () => {
  const { data: session } = useSession();
  const router = useRouter();

  return (
    <section className="fixed min-h-screen top-0 z-40 flex flex-col p-4 items-center bg-black w-[60px] lg:w-[90px]  space-y-8 h-screen">
        {session ? (
          <>
            <Image src={logo} width={60} height={60} alt="logo" objectFit='contain' />
        <div className="space-y-6 flex flex-col">
          <Link href="/">
            <IoMdHome className={`icon ${router.pathname === "/" ? "text-white" : ""}`} />
          
          </Link>
          <Link href="/search">
            <IoMdSearch className={`icon ${router.pathname === "/search" ? "text-white" : ""}`} />
          
          </Link>
          <div data-tip="Create playlist">
            <BsPlusSquare className='icon' />

          </div>
            <IoMdCompass className='icon' />

            <IoMdMicrophone className='icon' />
            <HiChartBar className='icon' />
            <IoMdClock className='icon' />
            <HiDotsHorizontal className='icon' />

        </div>
        <IoMdLogOut className="text-2xl cursor-pointer text-white sm:hidden" onClick={()=>signOut({ redirect:false })}  />
        
          </>

        ):(
          null
        )}
        
  
    </section>
  )
}

export default Sidebar