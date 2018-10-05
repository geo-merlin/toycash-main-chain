pragma solidity ^0.4.24;

import "./ECRecovery.sol";

contract ToyCash {

    /*
     * Storage
     */

    // list for keeping whether tweets are already registered
    mapping(uint256 => bool) public tweet_registered;

    /*
     * Event
     */


    event LogJudgement(address expected_address, address obtained_address);

    /*
     * Public functon
     */

    /**
     * @param _tokenAddress is a token address
     * @return balance is the sender's balance of the token that address is the same with _tokenAddress
     */

    function getTokenBalance(address _tokenAddress) public view returns(uint balance) {
        ERC20Interface token = ERC20Interface(_tokenAddress);
        balance = token.balanceOf(msg.sender);
    }

    /**
     * @dev _judgeAddress send reward to _userAddress
     * @param _amount is the reward amount
     */

    function sendReward (
        uint256 _tweetId,
        address _userAddress,
        uint256 _amount,
        address _tokenAddress,
        address _judgeAddress,
        bytes32 _hashedTweetObject,
        bytes _judgeSig
    ) public {
        ERC20Interface token = ERC20Interface(_tokenAddress);

        // bytes32 hashedTweetObject = hashTweetObject(
        //     _tweetId,
        //     _userAddress,
        //     _amount,
        //     _tokenAddress
        // );

        // validate signature
        address judgeAddress = ECRecovery.recover(_hashedTweetObject, _judgeSig);
        emit LogJudgement(_judgeAddress, judgeAddress);
        require(_judgeAddress == judgeAddress);

        require(!tweet_registered[_tweetId]);

        require(token.balanceOf(_judgeAddress) >= _amount);

        token.changeBalance(_judgeAddress, _userAddress, _amount);

        // keeping this tweet are already registered
        tweet_registered[_tweetId] = true;
    }

    // function hashTweetObject (
    //     uint256 _tweetId,
    //     address _userAddress,
    //     uint256 _amount,
    //     address _tokenAddress
    // ) public pure returns (bytes packedTweetObject) {
    //     packedTweetObject = abi.encodePacked(
    //         _tweetId,
    //         _userAddress,
    //         _amount,
    //         _tokenAddress
    //     );
    // }
}

contract ERC20Interface {
    function balanceOf(address tokenOwner) public constant returns (uint balance);
    function changeBalance(address tokenOwner, address tokenReceiver, uint amount) public;
}
