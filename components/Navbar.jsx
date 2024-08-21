"use client"
import React, { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Link from 'next/link'

const Navbar = () => {
    const { data: session } = useSession()
    const [showDropDown, setshowDropDown] = useState(false)
    // console.log(session && session.user)
    return (
        <nav className="bg-black text-white flex justify-between px-4  items-center  md:h-14 flex-col md:flex-row"  >
            <Link href={'./'} className="logo font-bold md:text-lg my-2 md:my-0 flex gap-1 justify-center items-center text-2xl ">
                <span className='text-purple-400' >CREATORS FLAME</span>
                <span><img className='mb-2' src="./assest/flame.gif" width={30} alt="" /></span>
            </Link>
            <ul className="flex justify-between gap-4 ">
                <li> <Link href={'/'}> Home </Link> </li>
                <li><Link href={'/about'}> About Us </Link></li>
                <li><Link href={'/creators'}>Find Creators </Link></li>
                {session && <li><Link href={`/${session?.user?.name}`}> Profile </Link></li>}
            </ul>
            <div>
                <div className="relative">
                    {session &&
                        <>
                            <button onBlur={() => { setTimeout(() => { setshowDropDown(false) }, 500) }} onClick={() => { setshowDropDown(!showDropDown) }} id="dropdownHoverButton" data-dropdown-toggle="dropdownHover" data-dropdown-trigger="hover" 
                            className=" mx-4 text-white focus:ring-2 focus:outline-none
                              font-medium rounded-lg  px-5 py-2.5 text-center inline-flex 
                             items-center text-base " type="button">
                                Welcome  <span className='text-purple-500 ml-2'>  {session.user.name}  </span><svg className="w-2.5 h-2.5 ms-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 10 6">
                                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 4 4 4-4" />
                                </svg>
                            </button>

                            <div id="dropdownHover " className={`z-10 ${showDropDown ? '' : 'hidden'} absolute left-[25px] top-[50px] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700`}>
                                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200" aria-labelledby="dropdownHoverButton">
                                    <li>
                                        <Link href="/account" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Account</Link>
                                    </li>
                                    <li>
                                        <a href={`/${session.user.name}`} className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Profile</a>
                                    </li>
                                    <li onClick={() => [signOut()]}>
                                        <a href="#" className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white">Logout</a>
                                    </li>
                                </ul>
                            </div>

                        </>

                    }

                    {!session && <Link href={"/login"}>
                        <button type="button" className="text-white bg-gradient-to-r 
                         from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br 
                         focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800 
                         shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium 
                        rounded-lg  text-lg  md:px-5 md:py-2 text-center md:me-2 md:mb-2 md:mt-2 py-1 my-3 px-28 ">
                            Login
                        </button>
                    </Link>}

                </div>
            </div>
        </nav>
    )
}

export default Navbar