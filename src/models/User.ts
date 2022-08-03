import { Document, Model, model, Schema } from 'mongoose'

/**
 * Interface to model the User Schema for TypeScript.
 * @param connectedWallet:IConnectedWallet
 * @param creditScore:number
 * @param tracksCompleted:array
 * @param blockchainScore:number

 */

export interface IConnectedWallet {
  chain: string
  address: string
}
export interface ITracksCompleted {
  name: string
  // todo: date type
  completedOn: string
  score: number
}

export interface IUser extends Document {
  connectedWallet: IConnectedWallet[]
  creditScore: number
  tracksCompleted: ITracksCompleted[]
  blockchainScore: number
}

const userSchema: Schema = new Schema({
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
const User: Model<IUser> = model('User', userSchema)

export default User
