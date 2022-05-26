import { GetServerSideProps, NextPage } from 'next'
import { getProviders, signIn, useSession } from 'next-auth/react'
import Head from 'next/head'
import Image from 'next/image'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import Loader from '../../components/Loader'
import logo from "../../public/img/logo.png"


const SignInPage:NextPage = ({ providers }:any) => {
    const { data: session } = useSession();
    const router = useRouter();
    

    useEffect(()=>{
        if(session) {
            router.push("/")
        }
    },[session]);

    if(session) return( 
        <div className='flex items-center justify-center'>
         <Loader />

        </div>
    )
  return (
    <div className="flex flex-col items-center bg-black min-h-screen pt-20">
        <Head>
            <title>Login</title>
        </Head>
        <Image src={logo} width={600} height={250} alt="logo" objectFit='contain' className='animate-pulse' />
        {Object.values(providers).map((provider:any) => (
            <div key={provider.name}>
                <button onClick={() => signIn(provider.id)} className="text-white font-bold text-xl bg-green-500 px-6 py-4 rounded-md hover:bg-green-600 transition-all ease-in-out duration-200 " >
                    Sign in with {provider.name}
                </button>
            </div>
        ))}
    </div>
  )
}

export const getServerSideProps: GetServerSideProps = async() => {
    const providers = await getProviders();
    return {
        props:{
            providers
        }
    }
}

export default SignInPage