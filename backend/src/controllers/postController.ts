import type { RequestHandler } from 'express';
import { isValidObjectId } from 'mongoose';
import { Post } from '#models';


// GET ALL POST ###################################################
export const getAllPosts: RequestHandler = async (_req, res) => {
	const posts = await Post.find().lean();
	res.json(posts);
};


// CREATE POST ####################################################
export const createPost: RequestHandler = async (req, res) => {
	const newPost = await Post.create(req.body);
	res.status(201).json(newPost);
};


// GET POST BY ID #################################################
export const getPostById: RequestHandler = async (req, res) => {
	const {
		params: { id }
	} = req;
	if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: 400 });
	const post = await Post.findById(id).lean();
	if (!post)
		throw new Error(`Post with id of ${id} doesn't exist`, { cause: 404 });
	res.send(post);
};

// UPDATE POST ####################################################

export const updatePost: RequestHandler = async (req, res) => {
	const {
		params: { id }
	} = req;
	if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: 400 });
	const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
		new: true
	});
	if (!updatedPost)
		throw new Error(`Post with id of ${id} doesn't exist`, { cause: 404 });
	res.json(updatedPost);
};

// DELETE POST ####################################################

export const deletePost: RequestHandler = async (req, res) => {
	const {
		params: { id }
	} = req;
	if (!isValidObjectId(id)) throw new Error('Invalid id', { cause: 400 });
	const deletedPost = await Post.findByIdAndDelete(id);
	if (!deletedPost)
		throw new Error(`Post with id of ${id} doesn't exist`, { cause: 404 });
	res.json({ success: `Post with id of ${id} was deleted` });
};
