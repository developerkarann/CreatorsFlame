import PaymentPage from '@/components/PaymentPage'
import React from 'react'
import { notFound } from 'next/navigation'
import connectDatabase from '../database/database'
import User from '@/models/User'


const Username = async ({ params }) => {

  const checkUser = async () => {
    await connectDatabase()
    let user = await User.findOne({ username: params.username })

    if (!user) {
      return notFound()
    }

  }
 
  await checkUser()

  return (
    <>
      <PaymentPage username={params.username} />
    </>
  )
}

export default Username

export async function generateMetadata({ params }) {
  return {
    title: `Support ${params.username} - Get Me A Chai`,
  }
}