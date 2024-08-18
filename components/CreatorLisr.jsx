"use client"
import { fetchAllUser } from '@/app/actions/userAction'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const CreatorLisr = () => {

    const [searchInput, setSearchInput] = useState('')
    const [allUsers, setAllUsers] = useState([])


    const searchedCreator = allUsers.filter(item =>
        item.name.toLowerCase().includes(searchInput.toLowerCase())
    )

    const getAllCreators = async () => {
        let data = await fetchAllUser()
        setAllUsers(data)
    }


    useEffect(() => {
        getAllCreators()
    }, [])


    return (
        <>
            <div className='px-8 md:px-4'>
                <div
                    className="mx-auto mt-8 relative bg-white min-w-sm max-w-2xl flex flex-col md:flex-row items-center justify-center border py-2 px-2 rounded-2xl gap-2 shadow-2xl focus-within:border-gray-300"
                    for="search-bar">
                    <input value={searchInput} onChange={(e) => setSearchInput(e.target.value)} id="search-bar" placeholder="Search your favorite creator"
                        className="px-6 py-2 w-full rounded-md flex-1 outline-none bg-white" />
                </div>


                <div className='text-white mt-8 flex items-center justify-center'>
                    <h2 className={`text-2xl font-bold ${searchInput === '' ? '' : searchedCreator.length > 0 ? ' text-purple-400' : 'text-red-600'}  `} >
                        {searchInput === '' ? 'All Creators' : searchedCreator.length > 0 ? 'Your Creator' : 'OOPS...   No creator found !'}
                    </h2>
                </div>


                <div class="text-sm leading-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-8 gap-7">
                    {
                        searchedCreator.length > 0 ? searchedCreator.map((item, index) => (
                            <Link href={`/${item.username}`} key={index}>
                                <div class="relative flex w-72  h-24 flex-col-reverse bg-purple-900 rounded-lg p-6 dark:bg-slate-900 dark:highlight-white/5">
                                    {/* <div class="mt-4 text-slate-700 dark:text-slate-300">
                                <p>{item.email}</p>
                            </div> */}
                                    <div class="flex items-center space-x-4">
                                        <img src={item.profilePic} alt="" class="flex-none w-14 h-14 rounded-full object-cover" loading="lazy" decoding="async" />
                                        {/* <img src="https://images.unsplash.com/photo-1632910121591-29e2484c0259?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw4fHxjb2RlcnxlbnwwfDB8fHwxNzEwMTY0NjIzfDA&ixlib=rb-4.0.3&q=80&w=1080" alt="" class="flex-none w-14 h-14 rounded-full object-cover" loading="lazy" decoding="async" /> */}
                                        <div class="flex-auto">
                                            <div class="text-base text-slate-900 font-semibold dark:text-slate-200">
                                                {item.name}
                                            </div>
                                            <div class="mt-0.5 dark:text-slate-300">
                                                {item.username}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        )) :
                            <></>
                    }
                </div>

            </div>
        </>
    )
}

export default CreatorLisr