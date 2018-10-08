const toycashContractAddress = "";
const toycashContractABI = [
	{
		"constant": true,
		"inputs": [
			{
				"name": "_tokenAddress",
				"type": "address"
			}
		],
		"name": "getTokenBalance",
		"outputs": [
			{
				"name": "balance",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_tweetId",
				"type": "uint256"
			},
			{
				"name": "_userAddress",
				"type": "address"
			},
			{
				"name": "_amount",
				"type": "uint256"
			},
			{
				"name": "_tokenAddress",
				"type": "address"
			}
		],
		"name": "packTweetObject",
		"outputs": [
			{
				"name": "packedTweetObject",
				"type": "bytes"
			}
		],
		"payable": false,
		"stateMutability": "pure",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_tweetId",
				"type": "uint256"
			},
			{
				"name": "_userAddress",
				"type": "address"
			},
			{
				"name": "_amount",
				"type": "uint256"
			},
			{
				"name": "_tokenAddress",
				"type": "address"
			},
			{
				"name": "_judgeAddress",
				"type": "address"
			},
			{
				"name": "_messageHash",
				"type": "bytes32"
			},
			{
				"name": "_judgeSig",
				"type": "bytes"
			}
		],
		"name": "sendReward",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tweet_registered",
		"outputs": [
			{
				"name": "",
				"type": "bool"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "expected_address",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "obtained_address",
				"type": "address"
			}
		],
		"name": "LogJudgement",
		"type": "event"
	}
]
