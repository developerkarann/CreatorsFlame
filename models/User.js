import mongoose, { Schema, model } from "mongoose"

const userSchema = new Schema({
    email: { type: String, required: true },
    name: { type: String,},
    username: { type: String, required: true},
    profilePic: { type: String, },
    coverPic: { type: String, },
    razorpayId: { type: String, },
    razorpaySecret: { type: String, },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
})

export default mongoose.models.User || model('User', userSchema);