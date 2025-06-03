import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import connectDB from "./config/database.js"
import userRoutes from "./routes/users.js"
import questRoutes from "./routes/quests.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/api/users', userRoutes)
app.use('/api/quests', questRoutes)

// Health check route
app.get('/api/health', (req, res) => {
    res.status(200).json({
        message: 'Nest API is running!',
        timestamp: new Date().toISOString()
    })
})

// Error handling middleware
app.use((err, req, res, next) => {
    console.error(err.stack)
    res.status(500).json({
        error: 'Something went wrong!',
        message: err.message
    })
})

app.use('*', (req, res) => {
    res.status(404).json({ error: 'Route not found' })
})

const startServer = async () => {
    try {
        await connectDB()

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`)
            console.log(`Health check: http://localhost:${PORT}/api/health`)
            console.log(`Environment: ${process.env.NODE_ENV || 'development'}`)
        })

    } catch (error) {
        console.error('Failed to start server:', error.message)
        console.error('Make sure MongoDB is running')
        process.exit(1)
    }
}

startServer()