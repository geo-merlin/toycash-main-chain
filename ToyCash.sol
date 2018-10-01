pragma solidity ^0.4.25;

import "./ECRecovery.sol";

contract ToyCash{
    
    //function to get token balance
    function getTokenBalance (address _token_address) public view returns(uint) {
        ERC20Interface token = ERC20Interface(_token_address);
        return token.balanceOf(msg.sender);
    }

    //list for keeping whether tweets are already registered
    mapping (uint256 => bool) public tweet_registered;
    
    //function to take in tweet into block
    function setTweet(
        uint256 _tweet_id,
        address _user_address,
        address _judge_address,
        uint256 _amount,
        address _token_address,
        bytes32 _tweet_hash,
        bytes _judge_sig
    ) public {
        ERC20Interface token = ERC20Interface(_token_address);
        
        //validate signature
        require(_judge_address == ECRecovery.recover(_tweet_hash, _judge_sig));
        
        require(!tweet_registered[_tweet_id]);
        
        require(token.balanceOf(_judge_address) >= _amount);
        
        token.changeBalance(_judge_address, _user_address, _amount);
        //keeping this tweet are already registered
        tweet_registered[_tweet_id] = true;
    }
}

contract ERC20Interface {
    function balanceOf(address tokenOwner) public constant returns (uint balance);
    function changeBalance(address tokenOwner, address tokenReceiver, uint amount) public;
}