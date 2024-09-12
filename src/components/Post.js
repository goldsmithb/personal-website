import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "../styles/ReactMarkdown.module.css";

const Post = ({ post }) => {
  return (
    <Markdown remarkPlugins={[remarkGfm]} className={styles.reactMarkdown}>
      {post.content}
    </Markdown>
  );
};

export default Post;
