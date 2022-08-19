// SPDX-License-Identifier: UNLICENSED

pragma solidity ^0.8.4;

import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "hardhat/console.sol";

import {Base64} from "./libraries/Base64.sol";

contract ProductNFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    mapping(address => string) products;

    // uint auction_timer;
    // uint auction_end_time;

    event NewEpicNFTMinted(address sender, uint256 tokenId);

    constructor() ERC721("ProductNFT", "PROD") {
        // auction_timer = block.timestamp;
        // auction_end_time = auction_timer + 1 hours;
    }

    function buy(
        string memory id,
        string memory img,
        uint256 day,
        uint256 price
    ) public payable {
        uint256 newItemId = _tokenIds.current();

        products[msg.sender] = id;

        require(msg.value == price);

        string memory name = "Warranty";
        uint256 second = day * 86400;
        uint256 start = block.timestamp;
        uint256 end = start + second;

        string memory json = Base64.encode(
            abi.encodePacked(
                '{"name": "',
                name,
                " -- NFT #: ",
                Strings.toString(newItemId),
                '", "description": "Product NFT", "image": "',
                img,
                '", "attributes": [{ "trait_type": "id", "value": ',
                id,
                '},{ "display_type": "date", "value": ',
                Strings.toString(start),
                '},{ "display_type": "date", "value": ',
                Strings.toString(end),
                "} ]}"
            )
        );

        string memory finalTokenUri = string(
            abi.encodePacked("data:application/json;base64,", json)
        );

        console.log(
            string(
                abi.encodePacked(
                    "https://nftpreview.0xdev.codes/?code=",
                    finalTokenUri
                )
            )
        );

        _safeMint(msg.sender, newItemId);

        _setTokenURI(newItemId, finalTokenUri);

        _tokenIds.increment();
        console.log(
            "An NFT w/ ID %s has been minted to %s",
            newItemId,
            msg.sender
        );

        emit NewEpicNFTMinted(msg.sender, newItemId);
    }
}
