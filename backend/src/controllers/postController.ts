import type { RequestHandler } from "express";
import { isValidObjectId } from "mongoose";
import { Post } from "#models";

// GET ALL POST ###################################################
export const getAllPosts: RequestHandler = async (_req, res) => {
  const posts = await Post.find().lean();
  res.json(posts);
};
type PostInputDTO = {
  title: string;
  content: string;
  image_url?: string[] | undefined;
};

// CREATE POST ####################################################
// export const createPost: RequestHandler = async (req, res) => {
// 	const newPost = await Post.create(req.body);
// 	res.status(201).json(newPost);
// };
// MULTIPLE UPLOAD
export const createPost: RequestHandler<unknown, any, PostInputDTO> = async (
  req,
  res
) => {
  const { title, content } = req.body;
  const files = (req.files as Express.Multer.File[]) || [];
  let imageUrl: string[];
  if (files.length === 0) {
    imageUrl = [];
  } else {
    imageUrl = files.map((file) => file.path);
  }

  const newPost = await Post.create({
    title,
    content,
    // author,
    author: req.user?.id,
    image_url: imageUrl,
  });

  console.log("cloudinary upload results", files);
  res.status(201).json(newPost);
};

// GET POST BY ID #################################################
export const getPostById: RequestHandler = async (req, res) => {
  const {
    params: { id },
  } = req;
  if (!isValidObjectId(id)) throw new Error("Invalid id", { cause: 400 });
  const post = await Post.findById(id).lean();
  if (!post)
    throw new Error(`Post with id of ${id} doesn't exist`, { cause: 404 });
  res.send(post);
};

// UPDATE POST ####################################################

export const updatePost: RequestHandler = async (req, res) => {
  const {
    params: { id },
  } = req;
  if (!isValidObjectId(id)) throw new Error("Invalid id", { cause: 400 });
  const updatedPost = await Post.findByIdAndUpdate(id, req.body, {
    new: true,
  });
  if (!updatedPost)
    throw new Error(`Post with id of ${id} doesn't exist`, { cause: 404 });
  res.json(updatedPost);
};

// DELETE POST ####################################################

export const deletePost: RequestHandler = async (req, res) => {
  const {
    params: { id },
  } = req;
  if (!isValidObjectId(id)) throw new Error("Invalid id", { cause: 400 });
  const deletedPost = await Post.findByIdAndDelete(id);
  if (!deletedPost)
    throw new Error(`Post with id of ${id} doesn't exist`, { cause: 404 });
  res.json({ success: `Post with id of ${id} was deleted` });
};
