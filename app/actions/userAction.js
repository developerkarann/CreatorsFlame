"use server"

import Razorpay from "razorpay"
import Payment from "@/models/Payment"
import connectDatabase from "../database/database"
import User from "@/models/User"

export const initiate = async (amount, toUser, paymentForm) => {
    await connectDatabase()
    // Fetch the secret key of the user who is getting the payment
    let user = await User.findOne({ username: toUser })
    const keySecret = user.razorpaySecret
    const keyId = user.razorpayId

    var instance = new Razorpay({ key_id: keyId, key_secret: keySecret })


    let options = {
        amount: Number.parseInt(amount),
        currency: 'INR',
    }

    let x = await instance.orders.create(options)

    await Payment.create({ orderId: x.id, amount: amount / 100, to_user: toUser, name: paymentForm.name, message: paymentForm.message })

    return x


}

export const fetchUser = async (username) => {
    await connectDatabase()
    let findUser = await User.findOne({ username: username })
    let user = findUser.toObject({ flattenObjectIds: true })
    return user
}

export const fetchPayments = async (username) => {
    await connectDatabase();
    let payments = await Payment.find({ to_user: username, done: true }).sort({ amount: -1 }).limit(10).lean()
    const fix = JSON.parse(JSON.stringify(payments))
    // console.log('Here are your payments ', fix)
    return fix
}

export const fetchAllUser = async () => {
    await connectDatabase()
    let findUsers = await User.find({})
    const response = JSON.parse(JSON.stringify(findUsers))
    return response
}

export const updateProfile = async (data, oldUsername) => {
    await connectDatabase();
    let ndata = Object.fromEntries(data);

    if (oldUsername !== ndata.username) {
        let user = await User.findOne({ username: ndata.username })
        if (user) {
            return { error: 'Username already exists' }
            console.log("Username already exists")
        }
        await User.updateOne({ email: ndata.email }, ndata)
        //Now update all the username in the [Payments table]
        await Payment.updateMany({ to_user: oldUsername }, { to_user: ndata.username })

    } else {
        await User.updateOne({ email: ndata.email }, ndata)
    }

}


