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

// write schema from interface i gtg
const userSchema: Schema = new Schema({})

const User: Model<IUser> = model('User', userSchema)

export default User
