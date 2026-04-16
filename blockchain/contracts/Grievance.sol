// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;

contract Grievance {

    struct Complaint {
        uint id;
        bytes32 studentHash;
        string ipfsHash;
        uint voteCount;
        bool resolved;
    }

    uint public complaintCount = 0;

    mapping(uint => Complaint) public complaints;

    // File complaint
    function fileComplaint(bytes32 _studentHash, string memory _ipfsHash) public {
        complaintCount++;

        complaints[complaintCount] = Complaint(
            complaintCount,
            _studentHash,
            _ipfsHash,
            0,
            false
        );
    }

    // Vote on complaint
    function voteOnComplaint(uint _id, bool _approve) public {
        require(!complaints[_id].resolved, "Already resolved");

        if (_approve) {
            complaints[_id].voteCount++;
        }

        // Resolve after 3 votes
        if (complaints[_id].voteCount >= 3) {
            complaints[_id].resolved = true;
        }
    }

    // Get complaint
    function getComplaint(uint _id) public view returns (
        uint, bytes32, string memory, uint, bool
    ) {
        Complaint memory c = complaints[_id];
        return (c.id, c.studentHash, c.ipfsHash, c.voteCount, c.resolved);
    }
}