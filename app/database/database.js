import mongoose from "mongoose";



const connectDatabase = async()=>{
    try {
        const connect = await mongoose.connect(process.env.DATABASE_URL)
        console.log('Database connected')

    } catch (error) {
        console.log('Getting Error while connecting database')
        console.error(error.message)
    }
}

export default connectDatabase