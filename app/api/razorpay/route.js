import { NextResponse } from "next/server";
import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils";
import Razorpay from "razorpay";
import Payment from "@/models/Payment";
import connectDatabase from "@/app/database/database";
import User from "@/models/User";

export const POST = async (req) => {
    await connectDatabase()
    let body = await req.formData();
    body = Object.fromEntries(body)
    // Check if razorpay order id is present or not
    let present = await Payment.findOne({ orderId: body.razorpay_order_id })
    if (!present) {
        return NextResponse.json({ sucess: false, message: "Order Id not found" })
    }


    // Fetch the secret key of the user who is getting the payment
    let user = await User.findOne({ username: present.to_user })
    const keySecret = user.razorpaySecret
    const keyId = user.razorpayId

    //Verify the payment
    let verify = validatePaymentVerification({
        "order_id": body.razorpay_order_id,
        "payment_id": body.razorpay_payment_id
    },
        body.razorpay_signature,
        keySecret)

    if (verify) {
        //Update the payment status
        const updatedPayment = await Payment.findOneAndUpdate({ orderId: body.razorpay_order_id }, { done: "true" }, { new: true })
        return NextResponse.redirect(`${process.env.NEXT_PUBLIC_URL}/${updatedPayment.to_user}?paymentdone=true`)
    }

    else {
        return NextResponse.json({ sucess: false, message: "Payment Veryfication Failed" })
    }
}