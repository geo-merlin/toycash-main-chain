# toycash-main-chain

This repository is the source codes for the ToyCash main chain.

## Preparation

Deploy the BlockDoubtToken contract and note the contract address.
Make this token involved in each Hashtags.

Here use 0x692a70d2e424a56d2c6c27aa97d1a86395877b3a as the token address.

## Hash Tweet Object

A judgeman makes a signature when he finds a great tweet and wants to send a token to the tweet writer.

First, the imformation of the favorite tweet is consisted four components as follows:

* tweet_id : Which tweets does he likes?
* user_address : Who does he wants to send the token to?
* amount : How much does he wants to send?
* token_address : Which tokens does he wants to send?

He makes a hash these data with sha3 [keccak256].

### Solidity code

```
uint256 tweetId = 1047832434291568645;
address userAddress = "0x14723a09acff6d2a60dcdf7aa4aff308fddc160c";
uint256 amount = 100;
address tokenAddress = "0x692a70d2e424a56d2c6c27aa97d1a86395877b3a";
bytes packedTweetObject = packTweetObject(
    tweet_id,
    user_address,
    amount,
    token_address
);
// packedTweetObject -> "0x0000000000000000000000000000000000000000000000000e8aa60c1e14f00514723a09acff6d2a60dcdf7aa4aff308fddc160c0000000000000000000000000000000000000000000000000000000000000064692a70d2e424a56d2c6c27aa97d1a86395877b3a"
```

## Sign Tweet Object

Then, he signs to the hash made above.
He tweets with the sign as quoted retweet to the favorite tweet picked above.

### Javascript code

```
const paced_tweet_object = "0x0000000000000000000000000000000000000000000000000e8aa60c1e14f00514723a09acff6d2a60dcdf7aa4aff308fddc160c0000000000000000000000000000000000000000000000000000000000000064692a70d2e424a56d2c6c27aa97d1a86395877b3a";
const private_key = "0x****************************************************************";
const signed_tweet_object = web3js.eth.accounts.sign(
    packed_tweet_object,
    private_key
);
const signature = signed_tweet_object.signature;
const message_hash = signed_tweet_object.messageHash;
// signature -> "0x746106b4f0cb7e6d881c7788483c380d7b8d5961082bd4cc3f495a48ca8b9a3a6bd8e6b7435ffbbfa2a787423f9023ec4bdf9f44ed4d9df58ff67749effdf64f00"
// message_hash -> "0x28064d7ae65040e51ae02dfa2e62c1dc5c1bdfb3f8097993c8b5f50aaef7a7fe"
```

## Send Reward

Finally, One inputs the sign in contract and as a result the designated reward is sent from judgeAddress to userAddress.

### Solidity code

```
uint256 tweetId = 1047832434291568645;
address userAddress = "0x14723a09acff6d2a60dcdf7aa4aff308fddc160c";
uint256 amount = 100;
address tokenAddress = "0x692a70d2e424a56d2c6c27aa97d1a86395877b3a";
address judgeAddress = "0xca35b7d915458ef540ade6068dfe2f44e8fa733c";
bytes messageHash = "0x28064d7ae65040e51ae02dfa2e62c1dc5c1bdfb3f8097993c8b5f50aaef7a7fe";
bytes judgeSig = "0x746106b4f0cb7e6d881c7788483c380d7b8d5961082bd4cc3f495a48ca8b9a3a6bd8e6b7435ffbbfa2a787423f9023ec4bdf9f44ed4d9df58ff67749effdf64f00";
sendReward(
    tweetId,
    userAddress,
    amount,
    tokenAddress,
    judgeAddress,
    messageHash,
    judgeSig
));
```
