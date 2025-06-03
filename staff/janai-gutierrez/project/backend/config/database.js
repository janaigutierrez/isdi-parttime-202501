import mongoose from "mongoose";

const connectDB = async () => {
    try {
        const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/nest-app'
        const conn = await mongoose.connect(connectionString)

        console.log(`MongoDB Connected: ${conn.connection.host}`)
        console.log(`Database: ${conn.connection.name}`)

        // Listen for connection events
        mongoose.connection.on('error', (err) => {
            console.error('MongoDB connection error:', err)
        })
        mongoose.connection.on('disconnected', () => {
            console.log('MongoDB disconnected')
        })

        // Shutdown
        process.on('SIGINT', async () => {
            try {
                await mongoose.connection.close()
                console.log('MongoDB connection closed through app termination')
                process.exit(0)
            } catch (err) {
                console.error('Error during MongoDB disconnection:', err)
                process.exit(1)
            }
        })

    } catch (error) {
        console.error('MongoDB connection failed:', error.message)
        process.exit(1)
    }
}

export default connectDB