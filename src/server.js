import express from 'express'
import { config } from 'dotenv'
import mongoose from 'mongoose'
import user from './routes/api/user'
import tracks from './routes/api/tracks'
import morgan from 'morgan'

config({ path: './config/.env' })

const app = express()
console.log('wtf')

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

// @route   GET /
// @desc    Test Base API
// @access  Public
app.get('/', (_req, res) => {
  res.send('api up and running')
})

app.use('/api/user', user)
app.use('/api/tracks', tracks)

const port = process.env.PORT || 1717
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
)

export default server
