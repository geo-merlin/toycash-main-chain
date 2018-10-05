# toycash-main-chain

This repository is the source codes for the ToyCash main chain.

## Preparation

Deploy the BlockDoubtToken contract and note the contract address.
Make this token involved in each Hashtags.

Here use 0x38034f435664dec5db77556811891337bf170346 as the token address.

## Hash Tweet Object

A judgeman makes a signature when he finds a great tweet and wants to send a token to the tweet writer.

First, the imformation of the favorite tweet is consisted four components as follows:

* tweet_id : Which tweets does he likes?
* user_address : Who does he wants to send the token to?
* amount : How much does he wants to send?
* token_address : Which tokens does he wants to send?

He makes a hash these data with sha3 [keccak256].

### JavaScript code

```
uint256 tweetId = 1047825270722387968;
address userAddress = "0xb71f2b9f5657401fd9b42b91eb51d3cf71f78a32";
uint256 amount = 100;
address tokenAddress = "0x3727effe1311561b441aeb31edeefbf52d210041";
bytes hashedTweetObject = hashTweetObject(
    tweet_id,
    user_address,
    amount,
    token_address
);
// hashed_tweet_object -> "0xa9c7994e33ea7d8e24bea5caab39a9a837692946cc8b736cc093818f100e52f1"
```

## Sign Tweet Object

Then, he signs to the hash made above.
He tweets with the sign as quoted retweet to the favorite tweet picked above.

### Javascript code

```
const hashed_tweet_object = "0xa9c7994e33ea7d8e24bea5caab39a9a837692946cc8b736cc093818f100e52f1";
const private_key = "A0DFDC07ACC8F7BE5B685562BCB88D6ED0E3DD00387BFCAA3FD74235F01A4171";
const signed_tweet_object = web3js.eth.accounts.sign(
    "0xa757826e274e629757cb39cae4f77c48232345efb62fc33a1bcbe8eb5adb842b",
    "A0DFDC07ACC8F7BE5B685562BCB88D6ED0E3DD00387BFCAA3FD74235F01A4171"
).signature;
// signed_tweet_object -> "0xe7374a76797c4ac879425a97487d1b6199ca6909fd88834c349704f0dda006656e7bc1b2bbfe7dbc6b05607aa7e0dea2fae74ed2a57065671e92395493c535bd1b"
```

## Send Reward

Finally, One inputs the sign in contract and as a result the designated reward is sent from judgeAddress to userAddress.

### Solidity code

```
uint256 tweetId = 1047825270722387968;
address userAddress = "0xb71f2b9f5657401fd9b42b91eb51d3cf71f78a32";
uint256 amount = 100;
address tokenAddress = "0x3727effe1311561b441aeb31edeefbf52d210041";
address judgeAddress = "0xc194e8c6fd6d7a99b054ab81824a52b9e7fcb766";
bytes judgeSig = "0xa4893e310871b7f544f76a8dbe87b8ad65bea0f3766b3847dd66bf5788faa7653f094ad3965a88b36128b0ec0862b65c06a3bfae6d59ef02f5c4e93e67742fed1c";
sendReward(
    tweetId,
    userAddress,
    amount,
    tokenAddress,
    judgeAddress,
    judgeSig
));
```
