const Community = require("../models/community.model");
const Post = require("../models/post.model");

const createCommunity = async (req, res) => {
  try {
    const { name, bio } = req.body;
    const userId = req.body.userId;

    if (!name || !bio) {
      return res.status(400).json({ error: "Both name and bio are required" });
    }

    const existingCommunity = await Community.findOne({
      // $or: [{ name }],
        name: name 
    });

    //console.log("existingCommunity: ", existingCommunity);

    if (existingCommunity) {
      return res.status(400).json({ error: "Community name already exists!" });
    }

    const community = await Community.create({
      name,
      bio,
      admin: userId,
      subscribedBy: [userId],
    });

    res.json(community);
  } catch (err) {
    return res.status(400).json({ error: err.message });
  }
};

const getCommunityPosts = async (req, res) => {
  const communityId = req.params.id;

  try {
    const community = await Community.findById(communityId)
      .populate({
        path: "posts",
        populate: {
          path: "poster",
          model: "User",
        },
      })
      .populate({
        path: "posts",
        populate: {
          path: "community",
          model: "community",
        },
      });

    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    return res.json({ community });
  } catch (error) {
    console.error(`Error getting community posts: ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const getAllCommunities = async (req, res) => {
  try {
    const communities = await Community.find();

    return res.json({ communities });
  } catch (error) {
    console.error(`Error getting communities: ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const subscribedToCommunity = async (req, res) => {
  const userId = req.body.userId;
  const communityId = req.params.id;

  try {
    const community = await Community.findById(communityId);

    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    const isSubscribed = community.subscribedBy.includes(userId);

    if (isSubscribed) {
      community.subscribedBy = community.subscribedBy.filter(
        (id) => id.toString() !== userId
      );
      community.subscriberCount -= 1;
      await community.save();
      return res
        .status(200)
        .json({ message: "Successfully unsubscribed from the community" });
    }

    community.subscribedBy.push(userId);
    community.subscriberCount += 1;

    await community.save();

    return res
      .status(200)
      .json({ message: "Successfully subscribed to the community" });
  } catch (error) {
    console.error(`Error subscribing to community: ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};
const getTop10 = async (req, res) => {
  try {
    const topCommunities = await Community.find()
      .sort({ subscriberCount: -1 })
      .limit(10);

    return res.status(200).json({ communities: topCommunities });
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
};

const deleteCommunity = async (req, res) => {
  const communityId = req.params.id;

  try {
    const community = await Community.findById(communityId);
    const posts =await Post.find({ community:communityId})
console.log(posts)
    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    const userId = req.body.userId;
    const isAdmin = req.body.isAdmin;

    await Community.deleteOne({ _id: communityId });
    await Post.deleteMany({ community: communityId });
    return res.status(200).json({ message: "Community deleted successfully" });
  } catch (error) {
    console.error(`Error deleting community: ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

const updatedCommunity = async (req, res) => {
  const communityId = req.params.id;
  const { name, bio } = req.body;

  try {
    const community = await Community.findById(communityId);

    if (!community) {
      return res.status(404).json({ error: "Community not found" });
    }

    const userId = req.body.userId;

    community.name = name || community.name;
    community.bio = bio || community.bio;

    await community.save();

    return res
      .status(200)
      .json({ message: "Community updated successfully", community });
  } catch (error) {
    console.error(`Error updating community: ${error.message}`);
    return res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = {
  createCommunity,
  getCommunityPosts,
  getAllCommunities,
  subscribedToCommunity,
  getTop10,
  deleteCommunity,
  updatedCommunity,
};
