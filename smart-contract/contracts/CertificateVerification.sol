// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/**
 * @title CertificateVerification
 * @dev This contract allows the storage and retrieval of image hashes, and provides admin functionality
 */
contract CertificateVerification {
    bytes32[] private hashList; // An array to store the image hashes
    address private deployer; // The address of the contract deployer
    address private admin; // The address of the admin

    /**
     * @dev Modifier to restrict access to admin only
     */
    modifier onlyAdmin() {
        require(
            (msg.sender == deployer || msg.sender == admin),
            "Only admin can perform this action"
        );
        _;
    }

    /**
     * @dev Constructor function to set the contract deployer
     */
    constructor() {
        deployer = msg.sender;
    }

    /**
     * @dev Function to set the admin address
     * @param _admin The address of the new admin
     */
    function setAdmin(address _admin) public onlyAdmin {
        admin = _admin;
    }

    /**
     * @dev Function to remove the admin address
     */
    function removeAdmin() public onlyAdmin {
        admin = address(0);
    }

    /**
     * @dev Function to add a new image hash
     * @param _imageHash The image hash to add
     */
    function addImageHash(bytes32 _imageHash) public onlyAdmin {
        hashList.push(_imageHash);
    }

    /**
     * @dev Function to get an image hash by its value
     * @param _hashValue The value of the image hash to retrieve
     * @return The image hash that matches the given value
     */
    function getHashByValue(bytes32 _hashValue) public view returns (bytes32) {
        for (uint i = 0; i < hashList.length; i++) {
            if (hashList[i] == _hashValue) {
                return hashList[i];
            }
        }
        revert("Hash not found");
    }

    /**
     * @dev Function to get all image hashes stored in the contract
     * @return An array containing all image hashes stored in the contract
     */
    function getAllHashes() public view returns (bytes32[] memory) {
        return hashList;
    }
}

// QmPhvYiVYtkuGzxwZW3FRxhFhZVhLhYwtBxZdyGDi1WQU8
