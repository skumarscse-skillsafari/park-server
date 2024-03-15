import Post from "../models/postModel.js";

export const createPost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await Post.create({
      author: id,
      ...req.body,
      tags: req.body.tags.split(",").map((tag) => tag.trim()),
    });
    res.status(201).json({
      success: true,
      data: post,
      message: "Post created successfully",
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find().populate("author");
    res.status(200).json({ success: true, data: posts });
  } catch (error) {
    res.status(404).json({ success: false, message: error });
  }
};

export const getPostById = async (req, res) => {
  try {
    // id => req.params
    const { id } = req.params;
    const post = await Post.findById(id);
    if (!post)
      return res
        .status(404)
        .json({ success: false, message: `No post with the id: ${id}` });
    res.status(200).json({ success: true, data: post });
  } catch (error) {
    res.status(404).json({ success: false, message: error });
  }
};

export const updatePostById = async (req, res) => {
  // id + data
  // req.params => id
  // req.body => data

  try {
    const { id } = req.params;
    const { title, description, image, tags } = req.body;
    const updatedPost = await Post.findByIdAndUpdate(
      id,
      {
        $set: {
          title: title,
          description: description,
          image: image,
          tags: tags,
        },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      message: "Post updated successfully",
      data: updatedPost,
    });
  } catch (error) {
    res.status(404).json({ success: false, message: error });
  }
};

export const deletePostById = async (req, res) => {
  try {
    // id => req.params
    const { id } = req.params;
    const result = await Post.findByIdAndDelete(id);
    if (!result)
      return res
        .status(404)
        .json({ success: false, message: `No post with the id: ${id}` });
    res
      .status(200)
      .json({ success: true, message: "Post deleted successfully" });
  } catch (error) {
    res.status(404).json({ success: false, message: error });
  }
};
