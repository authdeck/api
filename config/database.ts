import { connect } from 'mongoose'

const connectDB = async () => {
  try {
    const mongoURI: string = process.env.MONGO_URI
    const options: any = {
      useNewUrlParser: true,
      useCreateIndex: true,
      useFindAndModify: false,
      useUnifiedTopology: true,
    }
    connect(mongoURI, options, () => {
      console.log('MongoDB Connected...')
    })
  } catch (err) {
    console.error(err.message)
    // Exit process with failure
    process.exit(1)
  }
}

export default connectDB
