import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import styles from "../styles/ReactMarkdown.module.css";

const Post = ({ post }) => {
  return (
    <>
      <span
        style={{
          textAlign: "right",
          display: "block",
          textDecoration: "overline #3b74ba",
          fontStyle: "italic",
        }}
      >
        {post.data.date}
      </span>
      <Markdown remarkPlugins={[remarkGfm]} className={styles.reactMarkdown}>
        {post.content}
      </Markdown>
    </>
  );
};

export default Post;
