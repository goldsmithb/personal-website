import React from "react";
import styles from "../styles/BlogMenu.module.css";

const BlogMenu = ({ posts, selectedPost, setSelectedPost }) => {
  posts = posts.sort((a, b) => b.data.id - a.data.id);

  const handleClick = (e) => {
    const {
      target: { textContent },
    } = e;
    console.log(textContent);
    const match = posts.find((p) => p.data.title === textContent);
    setSelectedPost(match);
  };

  if (selectedPost !== undefined) {
    let lookup = posts.find((p) => p.data.title === selectedPost.data.title);
    if (lookup === undefined) {
      posts = posts.concat(selectedPost);
    }
  }

  const isSelectedPost = (post) => {
    return selectedPost && post.data.id === selectedPost.data.id;
  };

  return (
    <>
      <h2 className={styles.menuTitle}>PAST POSTS</h2>
      {selectedPost && (
        <span
          className={styles.allButton}
          onClick={() => setSelectedPost(undefined)}
        >
          {"\u27AE View All"}
        </span>
      )}
      <ul className={styles.menu}>
        {posts.map((post) => {
          return (
            <li
              className={isSelectedPost(post) ? styles.selected : ""}
              key={post.data.id}
              onClick={(e) => handleClick(e)}
            >
              {post.data.title}
            </li>
          );
        })}
      </ul>
    </>
  );
};
export default BlogMenu;
