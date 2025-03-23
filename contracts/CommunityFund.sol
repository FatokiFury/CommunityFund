// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract CommunityFund {
    address public owner;
    uint256 public totalContributions;
    mapping(address => uint256) public contributions;

    event ContributionReceived(address indexed contributor, uint256 amount);

    constructor() {
        owner = msg.sender;
    }

    // Accept direct ETH transfers
    receive() external payable {
        contributions[msg.sender] += msg.value;
        totalContributions += msg.value;
        emit ContributionReceived(msg.sender, msg.value);
    }
    function contribute() public payable {
    require(msg.value > 0, "Must send ETH");
}


    function contribute() public payable {
        require(msg.value > 0, "Contribution must be greater than 0");
        contributions[msg.sender] += msg.value;
        totalContributions += msg.value;
        emit ContributionReceived(msg.sender, msg.value);
        
    }

    function getBalance() public view returns (uint256) {
        return address(this).balance;
    }
}
