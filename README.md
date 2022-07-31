# authdeck API

# what we need for demo day

- a simple dapp using [[authdeck]]'s API

- one API endpoint to get reputation id / data ( what tracks the user has completed )

- one dapp to connect wallet, and finish tracks and see score - cmon pls do this not very hard

# using [[authdeck]]'s API

- connect wallet using rainbow
- verify yourself button ( which calls authdeck ka API )
- show reputation score in the app

# public [[API]]

- accept wallet id and app id
- return all data associated with the user

# [[authdeck]] app

- landing page to go to app
- connect wallet
- captcha
- twitter sig track
- blockchain history
- view reputation score
- ~~view apps connected
- ~~make own app id

# [[authdeck]] app's pvt API

- routes for user
- routes for tracks

# data model

```json
{
	"_id": "123123123",
	"connectedWallets": [
		{
            "chain": "eth",
            "address": soulninja.eth",
        }
	],
	"creditScore": "69",
	"tracksCompleted": [{
		"name": "twitter",
		"completedOn": "12022022",
		"score": "10",
	},{
		"name": "captcha",
		"completedOn": "31072022",
		"score": "15",
	},{
		"name": "mcq",
		"completedOn": "170922022",
		"score": "20",
	},],
	"blockchainScore": "12",
}
```

# api routes

## user

> GET USER
> `POST /api/user`

- restricted
- body: {address, appId }
- returns datamodel

---

> LOGIN USER
> `POST /api/user/login`

- private ( jwt )
- claims, message etc ( ethauth )

---

## tracks

> captcha

---

twitter sig confirmation
-> sign message in frontend with nonce
-> user tweets it
-> user pastes tweet link
-> send tweet link to server, we verify the sig, get id, and verify the identity ✅

> twitter
> `POST /api/tracks/`
