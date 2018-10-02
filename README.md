# toycash-main-chain

This repository is the source codes for the ToyCash main chain.

## preparation

One deploys the BlockDoubtToken contract and note the contract address.

Here use 0x38034f435664dec5db77556811891337bf170346 as the token address.

## Hash Tweet Object

A judgeman makes a signature when he finds a great tweet and wants to send a token involved in hashtags to the tweet writer.

First, the imformation of the favorite tweet is consisted four components as follows:

* tweet_id : Which tweets does he likes?
* user_address : Who does he wants to send the token to?
* amount : How much does he wants to send?
* token_address : Which tokens does he wants to send?

He makes a hash these data with sha3 [keccak256].

### JavaScript code

```
const tweet_id = "1046670602977722368";
const user_address = "0xb71f2b9f5657401fd9b42b91eb51d3cf71f78a32";
const amount = "100";
const token_address = "0x38034f435664dec5db77556811891337bf170346";
const hashed_tweet_object = web3.utils.keccak256(web3.utils.utf8ToHex(
    tweet_id +
    user_address +
    amount +
    token_address
));
// hashed_tweet_object -> "0xa757826e274e629757cb39cae4f77c48232345efb62fc33a1bcbe8eb5adb842b"
```

## Sign Tweet Object

Then, he signs to the hash made above.

He tweets with the sign as quoted retweet to the favorite tweet picked above.

### Javascript code

```
const hashed_tweet_object = "0xa757826e274e629757cb39cae4f77c48232345efb62fc33a1bcbe8eb5adb842b";
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
uint256 tweetId = 1046670602977722368;
address userAddress = "0xb71f2b9f5657401fd9b42b91eb51d3cf71f78a32";
uint256 amount = 100;
address tokenAddress = "0x38034f435664dec5db77556811891337bf170346";
address judgeAddress = "0xb71f2b9f5657401fd9b42b91eb51d3cf71f78a32";
bytes judgeSig = "0xe7374a76797c4ac879425a97487d1b6199ca6909fd88834c349704f0dda006656e7bc1b2bbfe7dbc6b05607aa7e0dea2fae74ed2a57065671e92395493c535bd1b";
sendReward(
    tweetId,
    userAddress,
    amount,
    tokenAddress,
    judgeAddress,
    judgeSig
));
```
