//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";

contract Vote {
    struct Candidate {
        uint256 id;
        string name;
    }

    uint256 votesPerUser = 4;
    uint256 numberOfvotes = 0;
    // Candidate[3] public candidates;
    uint256 public expireDate;
    uint256 public totalOfCandidates = 3;
    mapping(address => uint256) userVotesCount;
    mapping(uint256 => uint256) candidatesVotes;
    mapping(uint256 => Candidate) candidates;

    event newVote(uint256 totalOfVotes);
    event newCandidate(uint256 totalOfCandidates);

    constructor(uint256 _expireDate) {
        expireDate = _expireDate;
        candidates[0] = Candidate(0, "Pedro");
        candidates[1] = Candidate(1, "Paulo");
        candidates[2] = Candidate(2, "Peter");
    }

    function getNumOfCandidates() public view returns (uint256) {
        return totalOfCandidates;
    }

    function getCandidate(uint256 id) external view returns (Candidate memory) {
        return candidates[id];
    }

    function vote(uint256 id) external {
        require(block.timestamp < expireDate, "votation has ended");
        require(userVotesCount[msg.sender] < votesPerUser, "No more votes");
        userVotesCount[msg.sender]++;
        candidatesVotes[id]++;
        numberOfvotes++;
        emit newVote(numberOfvotes);
    }

    function addCandidate(string memory name) external {
        uint256 id = totalOfCandidates;
        candidates[id] = Candidate(id, name);
        totalOfCandidates++;
        emit newCandidate(totalOfCandidates);
        (totalOfCandidates);
    }

    function getCandidateVotes(uint256 id) external view returns (uint256) {
        return candidatesVotes[id];
    }

    function getRemainingVotes(address user) external view returns (uint256) {
        return votesPerUser - userVotesCount[user];
    }

    function getTotalVotes() external view returns (uint256) {
        return numberOfvotes;
    }

    function getExpireDate() external view returns (uint256) {
        return expireDate;
    }
}
