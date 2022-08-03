import mongoose from 'mongoose'

/**
 * Interface to model the User Schema for TypeScript.
 * @param connectedWallet:IConnectedWallet
 * @param creditScore:number
 * @param tracksCompleted:array
 * @param blockchainScore:number

 */

const userSchema= new mongoose.Schema({
  /*
  connectedWallet: [
    {
      chain: {
        type: String,
      },
      address: {
        type: String,
      },
    },
  ],
  */
  // only eth for now
  address: String,
  creditScore: {
    type: Number,
    default: 0,
  },
  tracksCompleted: [
    {
      name: {
        type: String,
      },
      completedOn: {
        type: String,
      },
      score: {
        type: Number,
        required: true,
      },
    },
  ],
  blockchainScore: {
    type: Number,
    default: 0,
  },
})

// @ts-ignore
const User = mongoose.model('User', userSchema)

export default User
