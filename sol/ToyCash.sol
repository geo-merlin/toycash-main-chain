pragma solidity ^0.4.25;

import "./ECRecovery.sol";

contract ToyCash {

    // function to get token balance
    function getTokenBalance(address _tokenAddress) public view returns(uint) {
        ERC20Interface token = ERC20Interface(_tokenAddress);
        return token.balanceOf(msg.sender);
    }

    // list for keeping whether tweets are already registered
    mapping (uint256 => bool) public tweet_registered;

    // function to take in tweet into block
    function setTweet(
        uint256 _tweetId,
        address _userAddress,
        address _judgeAddress,
        uint256 _amount,
        address _tokenAddress,
        bytes32 _tweetHash,
        bytes _judgeSig
    ) public {
        ERC20Interface token = ERC20Interface(_tokenAddress);

        // validate signature
        require(_judgeAddress == ECRecovery.recover(_tweetHash, _judgeSig));

        require(!tweet_registered[_tweetId]);

        require(token.balanceOf(_judgeAddress) >= _amount);

        token.changeBalance(_judgeAddress, _userAddress, _amount);

        // keeping this tweet are already registered
        tweet_registered[_tweetId] = true;
    }
}

contract ERC20Interface {
    function balanceOf(address tokenOwner) public constant returns (uint balance);
    function changeBalance(address tokenOwner, address tokenReceiver, uint amount) public;
}
