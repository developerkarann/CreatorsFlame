"use client"
import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { useRouter } from 'next/navigation'
import { fetchUser, updateProfile } from '@/app/actions/userAction'
import toast from 'react-hot-toast'
import Link from 'next/link'

const DashboardComponent = () => {
  const { data: session, update } = useSession()
  const router = useRouter()
  const [form, setForm] = useState({})
  if (!session) {
    router.push('/login')
    // alert('Login Error')
  }

  useEffect(() => {
    if (!session) {
      router.push('/login')
      // alert('Login Error')
    }
  }, [router, session])

  const getData = async () => {
    let user = await fetchUser(session.user.name)
    setForm(user)
  }

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (data) => {
    let updateData = await updateProfile(data, session?.user.name)
    toast.success('Profile Updated')
  }

  useEffect(() => {
    getData()
  }, [])


  return (
    <>
      <div className="container mx-auto py-5 px-6">
        <h1 className="text-center my-5 text-3xl font-bold text-white">Welcome to your Account </h1>

        <div className="cover w-full flex justify-center  items-center ">
          {/* <img className='object-cover w-full h-48 md:h-[250px]' src={currentUser.coverPic} alt="" /> */}

          <div className="profile rounded-full size-40">
            <img className='rounded-full object-cover size-40' width={150} height={150} src={form.profilePic} alt="" />
          </div>
        </div>

        <form className=' max-w-2xl mx-auto' action={handleSubmit}>

          <div className="my-2">
            <label htmlFor="name" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Name
            </label>
            <input type="text" value={form.name ? form.name : ""} onChange={handleChange} name='name' id='name' className=' block w-full p-2 text-gray-900
                 border border-gray-300 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
                 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 rounded' />
          </div>

          <div className="my-2">
            <label htmlFor="email" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Email
            </label>
            <input type="email" value={form.email ? form.email : ""} onChange={handleChange} name='email' id='email' className=' block w-full p-2 text-gray-900
                 border border-gray-300 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
                 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 rounded' />
          </div>
          <div className="my-2">
            <label htmlFor="username"  className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Username
            </label>
            <input type="text"  value={form.username ? form.username : ""} onChange={handleChange} name='username' id='username' className=' block w-full p-2 text-gray-900
                 border border-gray-300 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
                 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 rounded' />
          </div>
          {/* <div className="my-2">
            <label htmlFor="profilePic" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Profile Picture
            </label>
            <input type="text" value={form.profilePic ? form.profilePic : ""} onChange={handleChange} name='profilePic' id='profilePic' className=' block w-full p-2 text-gray-900
                 border border-gray-300 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
                 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 rounded' />
          </div> */}
          {/* <div className="my-2">
            <label htmlFor="coverPic" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              cover Picture
            </label>
            <input type="text" value={form.coverPic ? form.coverPic : ""} onChange={handleChange} name='coverPic' id='coverPic' className=' block w-full p-2 text-gray-900
                 border border-gray-300 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
                 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 rounded' />
          </div> */}

          <div className="text-white flex flex-col justify-center items-center">
            <p className=' font-light'>Please add your Razorpay Id and Razorpay Secret to receive payment.</p>
            <p className=' font-light'>visit <Link className=' text-blue-400' href={'https://razorpay.com/?utm_source=google&utm_medium=cpc&utm_campaign=RPSME-RPPerf-GSearchBrand-Prospect-Dweb-Core&utm_adgroup=brandsearch_core_exact&utm_content=RPSME-Brand-010223&utm_term=razorpay&utm_gclid=CjwKCAjw2dG1BhB4EiwA998cqN9AVPoBT87QpidFCUO_9BM0IKD45IcAiRVlSg77_y9eOPsDOYPM3RoCkiUQAvD_BwE&utm_campaignID=400139470&utm_adgroupID=27293859910&utm_adID=689518700854&utm_network=g&utm_device=c&utm_matchtype=e&utm_devicemodel=&utm_adposition=&utm_location=9302752&gad_source=1&gclid=CjwKCAjw2dG1BhB4EiwA998cqN9AVPoBT87QpidFCUO_9BM0IKD45IcAiRVlSg77_y9eOPsDOYPM3RoCkiUQAvD_BwE'} >
              Razorpay.com</Link> to create account on Razorpay and get Razorpay Id and Secret</p>
          </div>

          <div className="my-2">
            <label htmlFor="razorpayId" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Razorpay Id
            </label>
            <input type="text" value={form.razorpayId ? form.razorpayId : ""} onChange={handleChange} name='razorpayId' id='razorpayId' className=' block w-full p-2 text-gray-900
                 border border-gray-300 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
                 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 rounded' />
          </div>
          <div className="my-2">
            <label htmlFor="razorpaySecret" className='block mb-2 text-sm font-medium text-gray-900 dark:text-white'>
              Razor Secret
            </label>
            <input type="text" value={form.razorpaySecret ? form.razorpaySecret : ""} onChange={handleChange} name='razorpaySecret' id='razorpaySecret' className=' block w-full p-2 text-gray-900
                 border border-gray-300 bg-gray-50 text-xs focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 
                 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500 rounded' />
          </div>



          <button className=' tracking-wide font-semibold bg-gradient-to-br  from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800 
                 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 text-gray-100 w-full py-2 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center  focus:outline-none text-xl mt-5 '>
            Save Changes
          </button>

        </form>

      </div>
    </>
  )
}

export default DashboardComponent