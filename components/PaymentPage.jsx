"use client"
import React, { useEffect, useState } from 'react'
import Script from 'next/script'
import { fetchPayments, fetchUser, initiate } from '@/app/actions/userAction'
import { useSession, signIn, signOut } from "next-auth/react"
import toast from 'react-hot-toast'
import { Toaster } from 'react-hot-toast'
import { useSearchParams } from 'next/navigation'
import { useRouter } from 'next/navigation'
import { notFound } from "next/navigation"



const PaymentPage = ({ username }) => {
    const { data: session } = useSession()
    const [paymentForm, setPaymentForm] = useState({})
    const [currentUser, setCurrentUser] = useState({})
    const [payments, setPayments] = useState([])

    const searchParams = useSearchParams()
    const router = useRouter()
    const handleChange = (e) => {
        setPaymentForm({ ...paymentForm, [e.target.name]: e.target.value })
        // console.log(paymentForm)
    }

    const getData = async () => {
        let user = await fetchUser(username)
        setCurrentUser(user)
        let dbPayments = await fetchPayments(username);
        setPayments(dbPayments)

    }

    const pay = async (amount) => {
        //get the order id
        let a = await initiate(amount, username, paymentForm)
        let orderId = a.id
        var options = {
            // "key": process.env.NEXT_KEY_ID, // Enter the Key ID generated from the Dashboard
            "key": currentUser.razorpayId, // Enter the Key ID generated from the Dashboard
            "amount": amount, // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
            "currency": "INR",
            "name": "Creators Flame", //your business name
            "description": "Test Transaction",
            "image": "https://example.com/your_logo",
            "order_id": orderId, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
            "callback_url": `${process.env.NEXT_PUBLIC_URL}/api/razorpay`,
            "prefill": { //We recommend using the prefill parameter to auto-fill customer's contact information especially their phone number
                "name": "Gaurav Kumar", //your customer's name
                "email": "gaurav.kumar@example.com",
                "contact": "9000090000" //Provide the customer's phone number for better conversion rates 
            },
            "notes": {
                "address": "Razorpay Corporate Office"
            },
            "theme": {
                "color": "#3399cc"
            }
        };
        var rzp1 = new Razorpay(options);
        rzp1.open();
    }

    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        if (searchParams.get('paymentdone') == 'true') {
            toast.success('Thanks for your support!')
            router.push(`/${username}`)
        }
    }, [])




    return (
        <>

            <Script src="https://checkout.razorpay.com/v1/checkout.js"></Script>

            <>
                <div className="cover w-full flex justify-center items-center mt-4 ">
                    <div className="profile rounded-full size-40 ">
                        <img className='rounded-full object-cover size-40' width={150} height={150} src={currentUser.profilePic} alt="" />
                    </div>
                </div>
                <div className="info flex justify-center items-center my-4 flex-col text-white gap-1">
                    <div className="font-bold text-lg">
                        {currentUser.name}
                    </div>
                    <div className="text-sm text-slate-400">
                        Let's help {username} to get a Chai!
                    </div>
                    <div className="text-sm text-slate-400">
                        {payments.length} Payments - {payments.reduce((a, b) => a + b.amount, 0)} raised
                    </div>

                    <div className="payment flex gap-3 w-[80%] mb-11 mt-11  flex-col md:flex-row ">
                        <div className="supporters w-full md:w-1/2 bg-slate-900 rounded-lg p-5" >
                            <h2 className=" text-2xl  font-bold">Top 10 Supporters</h2>
                            <ul className='mx-6 text-sm'>
                                {payments.length == 0 && <li>No payments yet</li>}
                                {
                                    payments && payments.map((data, index) => {
                                        return (
                                            <li className='my-4 flex gap-2 items-center' key={index}>
                                                <img width={30} src="./assest/user.gif" alt="" />
                                                <span>{data.name} donated <span className="font-bold">{data.amount} </span>  with a message <span className="text-slate-400">"{data.message}"</span> </span>
                                            </li>
                                        )
                                    })
                                }
                            </ul>
                        </div>
                        <div className="makePayment w-full md:w-1/2 bg-slate-900 rounded-lg p-5">
                            <h2 className="text-2xl font-bold my-5 ">Make a payment</h2>
                            <div className="flex gap-2 flex-col">
                                <input onChange={handleChange} value={paymentForm.name} name='name' className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Name' type="text" />
                                <input onChange={handleChange} value={paymentForm.message} name='message' className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Message' type="text" />
                                <input onChange={handleChange} value={paymentForm.amount} name='amount' className='w-full p-3 rounded-lg bg-slate-800' placeholder='Enter Amount' type="text" />
                                <button onClick={() => pay(Number.parseInt(paymentForm.amount) * 100)} type='button' className=' tracking-wide 
                                     font-semibold bg-gradient-to-br  from-purple-500 via-purple-600 to-purple-700 
                                     hover:bg-gradient-to-br focus:ring-4 focus:ring-purple-300 dark:focus:ring-purple-800 
                                     shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 text-gray-100 w-full
                                      py-2 rounded-lg transition-all duration-300 ease-in-out flex items-center justify-center  
                                      focus:outline-none text-2xl disabled:from-purple-400 '
                                    disabled={
                                        paymentForm.amount?.length == 0 ||
                                        paymentForm.amount?.length < 1 ||
                                        paymentForm.name?.length < 3 ||
                                        paymentForm.message?.length < 4}>Pay</button>
                            </div>
                            <div className="flex flex-col md:flex-row gap-2 mt-5">
                                <button onClick={() => pay(1000)} disabled={
                                    paymentForm.amount?.length == 0 ||

                                    paymentForm.amount?.length < 1 ||
                                    paymentForm.name?.length < 3 ||
                                    paymentForm.message?.length < 4
                                }
                                    className='bg-slate-800 p-3 rounded-lg'>Pay $10</button>
                                <button onClick={() => pay(2000)} disabled={
                                    paymentForm.amount?.length == 0 ||

                                    paymentForm.amount?.length < 1 ||
                                    paymentForm.name?.length < 3 ||
                                    paymentForm.message?.length < 4}
                                    className='bg-slate-800 p-3 rounded-lg'>Pay $20</button>
                                <button onClick={() => pay(3000)} disabled={
                                    paymentForm.amount?.length == 0 ||
                                    paymentForm.amount?.length < 1 ||
                                    paymentForm.name?.length < 3 ||
                                    paymentForm.message?.length < 4}
                                    className='bg-slate-800 p-3 rounded-lg'>Pay $30</button>
                            </div>
                        </div>
                    </div>
                </div>
                <Toaster position='bottom-center' />

            </>
        </>
    )
}

export default PaymentPage