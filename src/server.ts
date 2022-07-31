import express from 'express'
import { config } from 'dotenv'
import connectDB from '../config/database'
import user from './routes/api/user'
import tracks from "./routes/api/tracks";
import morgan from "morgan";

config({ path: './config/.env' })

const app = express()

// Connect to MongoDB
connectDB()

// Express configuration
app.set('port', process.env.PORT || 5000)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(morgan("dev"));

// @route   GET /
// @desc    Test Base API
// @access  Public
app.get('/', (_req, res) => {
  res.send('api up and running')
})

app.use('/api/user', user)
app.use("/api/tracks", tracks)

const port = app.get('port')
const server = app.listen(port, () =>
  console.log(`Server started on port ${port}`)
)

export default server
