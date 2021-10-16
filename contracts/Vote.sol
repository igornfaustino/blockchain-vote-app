//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Vote {
    struct Candidate {
        uint256 id;
        string name;
    }

    uint256 votesPerUser = 4;
    Candidate[3] public candidates;
    uint256 public expireDate;
    mapping(address => uint256) userVotesCount;
    mapping(uint256 => uint256) candidatesVotes;

    constructor(uint256 _expireDate) {
        expireDate = _expireDate;
        candidates[0] = Candidate(1, "Pedro");
        candidates[1] = Candidate(2, "Paulo");
        candidates[2] = Candidate(3, "Peter");
    }

    function getCandidates() external view returns (Candidate[3] memory) {
        return candidates;
    }

    function vote(uint256 id) external {
        require(block.timestamp < expireDate, "votation has ended");
        require(userVotesCount[msg.sender] < votesPerUser, "No more votes");
        userVotesCount[msg.sender]++;
        candidatesVotes[id]++;
    }

    function getCandidateVotes(uint256 id) external view returns (uint256) {
        return candidatesVotes[id];
    }
}
