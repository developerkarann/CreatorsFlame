import CreatorLisr from '@/components/CreatorLisr'
import SearchBar from '@/components/SearchBar'
import React from 'react'

const Creators = () => {
    return (
        <>
            <div className='text-white mt-14 flex items-center justify-center flex-col'>
                <h2 className=' text-xl md:text-2xl  font-bold mb-4' >Find your<span className=' text-purple-500'> favorite creator</span></h2>
                <div className='px-8 flex '>
                    <p className='text-xs md:text-base ' >Show your   love and  support to your  favorite creators</p>
                        {/* <img src="./assest/flame.gif" width={30} alt="" /> */}
                </div>
            </div>
            {/* <SearchBar /> */}

            <CreatorLisr />
        </>
    )
}

export default Creators