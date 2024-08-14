const mongoose = require("mongoose");
const Post = require("../models/post.model");
const PostLike = require("../models/postLike.model");
const Community = require("../models/community.model");
const Comment = require("../models/comment.model");
const paginate = require("../util/paginate");
const cooldown = new Set();
USER_LIKES_PAGE_SIZE = 9;

const createPost = async (req, res) => {
	try {
		const { title, content, userId, communityId} = req.body;

		if (!(title && content)) {
			throw new Error("All input required");
		}

		if (cooldown.has(userId)) {
			throw new Error(
				"You are posting too frequently. Please try again shortly."
			);
		}

		cooldown.add(userId);
		setTimeout(() => {
			cooldown.delete(userId);
		}, 60000);
        
		const community = await Community.findById(communityId);

        if (!community) {
          return res.status(404).json({ message: "community not found" });
        }

		const post = await Post.create({
			title,
			content,
			poster: userId,
			community: communityId,
		});
        
		community.posts.push(post);
        await community.save();
		res.json(post);
	} catch (err) {
		return res.status(400).json({ error: err.message });
	}
};

const getPost = async (req, res) => {
	try {
		const postId = req.params.id;
		const { userId } = req.body;

		if (!mongoose.Types.ObjectId.isValid(postId)) {
			throw new Error("Post does not exist");
		}

		const post = await Post.findById(postId)
			.populate("poster", "-password")
			.populate("community")
			.lean();

		if (!post) {
			throw new Error("Post does not exist");
		}

		if (userId) {
			await setLiked([post], userId);
		}

		await enrichWithUserLikePreview([post]);

		return res.json(post);
	} catch (err) {
		return res.status(400).json({ error: err.message });
	}
};

const updatePost = async (req, res) => {
	try {
		const postId = req.params.id;
		const { title, content, userId, isAdmin } = req.body;

		const post = await Post.findById(postId);

		if (!post) {
			throw new Error("Post does not exist");
		}

		if (post.poster != userId && !isAdmin) {
			throw new Error("Not authorized to update post");
		}
        
		post.title = title;
		post.content = content;
		post.edited = true;

		await post.save();

		return res
        .status(200)
        .json({ message: "Post updated successfully", post });
	} catch (err) {
		return res.status(400).json({ error: err.message });
	}
};

const deletePost = async (req, res) => {
	try {
		const postId = req.params.id;
		const { userId, isAdmin } = req.body;

		const post = await Post.findById(postId);

		if (!post) {
			throw new Error("Post does not exist");
		}

		if (post.poster != userId && !isAdmin) {
			throw new Error("Not authorized to delete post");
		}

		const deletedPost = await Post.findByIdAndDelete(postId);
		if (!deletedPost) {
			throw new Error("Error deleting the post");
		}

		await Comment.deleteMany({ post: post._id });

		return res.json(deletedPost);
	} catch (err) {
		console.log(err);
		return res.status(400).json({ error: err.message });
	}
};

const getPosts = async (req, res) => {
	try {
		const { userId } = req.body;

		let { page, sortBy, author, search } = req.query;

		if (!sortBy) sortBy = "-createdAt";
		if (!page) page = 1;

		let posts = await Post.find()
			.populate("poster", "-password")
			.populate("community")
			.sort(sortBy)
			.lean();

		if (author) {
			posts = posts.filter((post) => post.poster.username == author);
		}

		if (search) {
			posts = posts.filter((post) =>
				post.title.toLowerCase().includes(search.toLowerCase())
			);
		}

		const count = posts.length;

		posts = paginate(posts, 10, page);

		if (userId) {
			await setLiked(posts, userId);
		}

		await enrichWithUserLikePreview(posts);

		return res.json({ data: posts, count });
	} catch (err) {
		console.log(err.message);
		return res.status(400).json({ error: err.message });
	}
};


const setLiked = async (posts, userId) => {
		let searchCondition = {};
		if (userId) searchCondition = { userId };
	  
		const userPostLikes = await PostLike.find(searchCondition) || []; //userId needed
		
		if (posts && userPostLikes) {
		  posts.forEach((post) => {
			  userPostLikes.forEach((userPostLike) => {
				  if (userPostLike && userPostLike.postId && post && post._id && userPostLike.postId.equals(post._id)) {
					  post.liked = true;
				  }
			  });
		  });
	  }
	  };
	  
const enrichWithUserLikePreview = async (posts) => {
		const postMap = posts.reduce((result, post) => {
		  result[post._id] = post;
		  return result;
		}, {});
	  
		const postLikes = await PostLike.find({
		  postId: { $in: Object.keys(postMap) },
		})
		  .limit(200)
		  .populate("userId", "username");
	  
		postLikes.forEach((postLike) => {
		  const post = postMap[postLike.postId];
		  if (!post.userLikePreview) {
			post.userLikePreview = [];
		  }
		  post.userLikePreview.push(postLike.userId);
		});
	  };
	  
const getUserLikedPosts = async (req, res) => {
		try {
		  const likerId = req.params.id;
		  const { userId } = req.body;
		  let { page, sortBy } = req.query;
	  
		  if (!sortBy) sortBy = "-createdAt";
		  if (!page) page = 1;
	  
		  let posts = await PostLike.find({ userId: likerId })
			.sort(sortBy)
			.populate({ path: "postId", populate: { path: "poster" } })
			.populate({ path: "postId", populate: { path: "community" } })
			.lean();
		  
		  if (!posts) posts = [];  
		  posts = paginate(posts, 10, page);
	  
		  const count = posts.length;
	  
		  let responsePosts = [];
		  posts.forEach((post) => {
			if (post && post.postId) {
			  responsePosts.push(post.postId);
			}
		  });
	  
		  if (userId && responsePosts.length > 0) {
			await setLiked(responsePosts, userId);
		  }
	  
		  await enrichWithUserLikePreview(responsePosts);
	  
		  return res.json({ data: responsePosts, count });
		} catch (err) {
		  console.log(err);
		  return res.status(400).json({ error: err.message });
		}
	};

const likePost = async (req, res) => {
		try {
		  const postId = req.params.id;
		  const { userId } = req.body;
	  
		  const post = await Post.findById(postId);
	  
		  if (!post) {
			throw new Error("Post does not exist");
		  }
	  
		  const existingPostLike = await PostLike.findOne({ postId, userId });
	  
		  if (existingPostLike) {
			throw new Error("Post is already liked");
		  }
	  
		  await PostLike.create({
			postId,
			userId,
		  });
	  
		  post.likeCount = (await PostLike.find({ postId })).length;
	  
		  await post.save();
	  
		  return res.json({ success: true });
		} catch (err) {
		  return res.status(400).json({ error: err.message });
		}
	  };
	  
const unlikePost = async (req, res) => {
		try {
		  const postId = req.params.id;
		  const { userId } = req.body;
	  
		  const post = await Post.findById(postId);
	  
		  if (!post) {
			throw new Error("Post does not exist");
		  }
	  
		  const deletedLike = await PostLike.findOneAndDelete({ postId: postId, userId: userId });
		  
		  if (!deletedLike) {
			  throw new Error("Post was not previously liked by this user");
		  }
		  const likesCount = (await PostLike.find({ postId })).length;
		  post.likeCount = likesCount;
	  
		  await post.save();
	  
		  return res.json({ success: true, likeCount: likesCount });
		} catch (err) {
		  console.log(err);
		  return res.status(400).json({ error: err.message });
		}
	  };
	  
const getUserLikes = async (req, res) => {
		try {
		  const { postId } = req.params;
		  const { anchor } = req.query;
	  
		  const postLikesQuery = PostLike.find({ postId: postId })
			.sort("_id")
			.limit(USER_LIKES_PAGE_SIZE + 1)
			.populate("userId", "username")
			//.populate("community");
	  
		  if (anchor) {
			postLikesQuery.where("_id").gt(anchor);
		  }
	  
		  const postLikes = await postLikesQuery.exec();
	  
		  const hasMorePages = postLikes.length > USER_LIKES_PAGE_SIZE;
	  
		  if (hasMorePages) postLikes.pop();
	  
		  const userLikes = postLikes.map((like) => {
			return {
			  id: like._id,
			  username: like.userId.username,
			};
		  });
	  
		  return res
			.status(400)
			.json({ userLikes: userLikes, hasMorePages, success: true });
		} catch (err) {
		  console.log(err);
		  return res.status(400).json({ error: err.message });
		}
	  };

module.exports = {
	getPost,
	getPosts,
	createPost,
	updatePost,
	deletePost,
	likePost,
    unlikePost,
    getUserLikedPosts,
    getUserLikes,
};
