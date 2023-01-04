import mongoose from "mongoose";

/**
 * Interface to model the User Schema for TypeScript.
 * @param connectedWallet:IConnectedWallet
 * @param creditScore:number
 * @param tracksCompleted:array
 * @param blockchainScore:number

 */

const userSchema = new mongoose.Schema({
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
  address: {
    type: String,
    unique: true,
    index: true,
  },
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
        type: String,
      },
    },
  ],
  availableTracks: {
    type: [
      {
        name: {
          type: String,
        },
        score: {
          type: String,
        },
        time: String,
      },
    ],
    default: [
      {
        name: "blockchain",
        score: "100+",
        time: "10s",
      },
      // {
      //   name: "captcha",
      //   score: "10",
      //   time: "1min",
      // },
      // {
      //   name: "twitter",
      //   score: "20",
      //   time: "1min",
      // },
    ],
  },
});

// @ts-ignore
const User = mongoose.model("User", userSchema);

export default User;
