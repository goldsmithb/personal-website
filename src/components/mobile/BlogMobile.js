import React, { useState } from "react";
import * as matter from "gray-matter";
import Post from "../Post.js";
import BlogMenu from "./BlogMenu.js";
import styles from "./styles/BlogMobile.module.css";

const PostSpacer = () => (
  <div className={styles.spacer}>
    <div />
    <div />
    <div />
    <div />
    <div />
  </div>
);

const BlogMobile = ({ posts }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(undefined);
  let i = 0;

  const handleClick = (e) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const handleReturnToBlogHome = () => {
    setSelectedPost(undefined);
    setIsOpen(false);
  };

  return (
    <div className={styles.blog}>
      <div className={styles.banner}>
        <h1 onClick={() => handleReturnToBlogHome()}>
          BLOG{selectedPost && "<-"}
        </h1>
        <div className={styles.button} onClick={(e) => handleClick(e)}>
          {isOpen ? <span>&#9863;</span> : <span>&#9862;</span>}
        </div>
      </div>
      {isOpen && (
        <BlogMenu
          posts={posts}
          setIsOpen={setIsOpen}
          selectedPost={selectedPost}
          setSelectedPost={setSelectedPost}
        />
      )}
      {selectedPost !== undefined && (
        <div className={styles.post}>
          <Post post={selectedPost} />
        </div>
      )}
      {selectedPost === undefined &&
        posts.map((file) => {
          const postObj = matter(file);
          i += 1;
          return (
            <>
              <div className={styles.post}>
                <Post post={postObj} />
              </div>
              {i !== posts.length && <PostSpacer />}
            </>
          );
        })}
    </div>
  );
};

export default BlogMobile;
