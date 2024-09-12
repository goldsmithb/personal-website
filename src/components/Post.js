import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const Post = ({ post }) => {
  return <Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown>;
};

export default Post;
