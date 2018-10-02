pragma solidity ^0.4.24;

import "./ERC20.sol";

// トークンのシンボルはBlockDoubtTokenでBDT
contract BlockDoubtToken is ERC20 {

    /*
     * Storage
     */

    string public name = "BlockDoubtToken";
    string public symbol = "BDT";
    uint public decimals = 0;
    address[] public judgemen;

    /**
     * @return Returns index and ok of the first occurrence starting from index 0
     */

    function index (address[] addresses, address a) internal pure returns (uint, bool) {
        for (uint i = 0; i < addresses.length; i++) {
            if (addresses[i] == a) {
                return (i, true);
            }
        }
        return (0, false);
    }

    /*
     * constructor
     */

    constructor (uint initialSupply) public {
        _totalSupply = initialSupply;
        _balances[msg.sender] = initialSupply;
    }

    /*
     * Public Functions
     */

    function registerJudgement () public {
        uint _;
        bool success;
        (_, success) = index(judgemen, msg.sender);
        require(success == false);
        judgemen.push(msg.sender);
    }

    function changeBalance (address _from, address _to, uint256 _amount) public {
        _subBalance(_from, _amount);
        _addBalance(_to, _amount);
    }

    /*
     * Private Functions
     */

    function _subBalance (address _owner, uint256 _amount) private {
        _balances[_owner] = _balances[_owner].sub(_amount);
    }

    function _addBalance (address _target, uint256 _amount) private {
        _balances[_target] = _balances[_target].add(_amount);
    }
}
