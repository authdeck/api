import express from 'express'
import { config } from 'dotenv'
import mongoose from 'mongoose'
import morgan from 'morgan'
import user from './routes/api/user.js'
import tracks from './routes/api/tracks.js'
import cors from "cors"
config({ path: './config/.env' })

const app = express()

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, (err) => {
  if (err) {
    console.log(err)
  } else {
    console.log('Connected to MongoDB')
  }
})

// Express configuration
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan('dev'))
app.use(cors());

// @route   GET /
// @desc    Test Base API
// @access  Public
app.get('/', (_req, res) => {
  res.send('api up and running')
})

app.use('/api/user', user)
app.use('/api/tracks', tracks)

const port = process.env.PORT || 1717
app.listen(port, () => console.log(`Server started on port ${port}`))
