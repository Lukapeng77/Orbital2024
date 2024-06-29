const mongoose = require("mongoose");
const Post = require("../models/post.model");
const PostLike = require("../models/postLike.model");
const Comment = require("../models/comment.model");
const paginate = require("../util/paginate");
const cooldown = new Set();
const cloudinary = require('cloudinary').v2;
USER_LIKES_PAGE_SIZE = 9;

const createPost = async (req, res) => {
	try {
		const { title, content, userId } = req.body;
		let { img } = req.body;

		if (!(title && content)) {
			throw new Error("All input required");
		}

		if (cooldown.has(userId)) {
			throw new Error(
				"You are posting too frequently. Please try again shortly."
			);
		}

		if (img) {
			const uploadedResponse = await cloudinary.uploader.upload(img);
			img = uploadedResponse.secure_url;
		}

		cooldown.add(userId);
		setTimeout(() => {
			cooldown.delete(userId);
		}, 60000);

		const post = await Post.create({
			title,
			content,
			poster: userId,
			img,
		});

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
		const { content, userId, isAdmin } = req.body;

		const post = await Post.findById(postId);

		if (!post) {
			throw new Error("Post does not exist");
		}

		if (post.poster != userId && !isAdmin) {
			throw new Error("Not authorized to update post");
		}

		post.content = content;
		post.edited = true;

		await post.save();

		return res.json(post);
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

		if (post.img) {
			const imgId = post.img.split("/").pop().split(".")[0];
			await cloudinary.uploader.destroy(imgId);
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
  
	const userPostLikes = await PostLike.find(searchCondition); //userId needed
  
	posts.forEach((post) => {
	  userPostLikes.forEach((userPostLike) => {
		if (userPostLike.postId.equals(post._id)) {
		  post.liked = true;
		  return;
		}
	  });
	});
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

module.exports = {
	getPost,
	getPosts,
	createPost,
	updatePost,
	deletePost,
};
