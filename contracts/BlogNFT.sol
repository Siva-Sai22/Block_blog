// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract BlogNFT is ERC721 {
    constructor() ERC721("BlogNFT", "BNFT") {}

    struct BlogPost {
        uint256 id;
        address owner;
        string title;
        string ipfsHash;
        uint256 price;
    }

    mapping(uint256 => BlogPost) public blogPosts;
    uint256 private nextBlogPostId;

    event BlogPostCreated(
        uint256 indexed id,
        address indexed owner,
        string title,
        string ipfsHash,
        uint256 price
    );
    event BlogPostPurchased(
        uint256 indexed id,
        address indexed buyer,
        uint256 price
    );
    event TipSent(uint256 indexed id, address indexed sender, uint256 amount);

    function createBlogPost(
        string memory _title,
        string memory _ipfsHash,
        uint256 _price
    ) external {
        uint256 id = nextBlogPostId++;
        blogPosts[id] = BlogPost(id, msg.sender, _title, _ipfsHash, _price);
        _mint(msg.sender, id);
        emit BlogPostCreated(id, msg.sender, _title, _ipfsHash, _price);
    }

    function purchaseBlogPost(uint256 _id) external payable {
        BlogPost storage blogPost = blogPosts[_id];
        require(blogPost.owner != address(0), "Blog post does not exist");
        require(msg.value >= blogPost.price, "Insufficient payment");

        address payable owner = payable(blogPost.owner);
        owner.transfer(msg.value);

        safeTransferFrom(owner, msg.sender, _id);
        blogPost.owner = msg.sender;
        emit BlogPostPurchased(_id, msg.sender, msg.value);
    }

    function sendTip(uint256 _id) external payable {
        BlogPost storage blogPost = blogPosts[_id];
        require(blogPost.owner != address(0), "Blog post does not exist");
        require(msg.value > 0, "Invalid tip amount");

        address payable owner = payable(blogPost.owner);
        owner.transfer(msg.value);

        emit TipSent(_id, msg.sender, msg.value);
    }

    function ownerBlogPosts(
        address _owner
    ) external view returns (BlogPost[] memory) {
        uint256 tokenCount = balanceOf(_owner);
        BlogPost[] memory tokenIds = new BlogPost[](tokenCount);
        uint index = 0;
        for (uint i = 0; i < nextBlogPostId; i++) {
            if (ownerOf(i) == _owner) {
                tokenIds[index++] = blogPosts[i];
            }
        }
        return tokenIds;
    }
}