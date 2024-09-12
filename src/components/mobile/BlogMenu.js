import React from "react";
import styles from "./styles/BlogMenu.module.css";

const BlogMenu = ({ posts, setIsOpen, selectedPost, setSelectedPost }) => {
  posts = posts.sort((a, b) => b.data.id - a.data.id);
  if (posts.length > 5) posts = posts.slice(0, 4);
  const handleClick = (e) => {
    const {
      target: { textContent },
    } = e;
    const match = posts.find(
      (p) => p.data.title === textContent.substring(0, textContent.length - 1)
    );
    setSelectedPost(match);
    setIsOpen(false);
  };
  if (selectedPost !== undefined) {
    let lookup = posts.find((p) => p.data.title === selectedPost.data.title);
    if (lookup === undefined) {
      posts = posts.concat(selectedPost);
    }
  }

  const pointToSelectedPost = (post) => {
    if (selectedPost !== undefined) {
      if (post.data.id === selectedPost.data.id) {
        return "->";
      }
    }
    return "";
  };

  return (
    <div className={styles.menu}>
      <ul>
        {posts.map((post) => {
          return (
            <li
              className={styles.selected}
              key={post.data.id}
              onClick={(e) => handleClick(e)}
            >{`${pointToSelectedPost(post)}${post.data.title}-`}</li>
          );
        })}
      </ul>
    </div>
  );
};
export default BlogMenu;
