import React, { useState, useEffect, useContext } from "react";
import * as matter from "gray-matter";
import Post from "./Post.js";
import BlogMobile from "./mobile/BlogMobile.js";
import BlogMenu from "./BlogMenu.js";
import { postNames, mysteriousSymbols } from "../constants.js";
import styles from "../styles/Blog.module.css";
import VariableContext from "../context/VariableProvider";
// Configure buffer, via stackOverflow: https://stackoverflow.com/questions/48432524/cant-find-variable-buffer
global.Buffer = global.Buffer || require("buffer").Buffer;

const getSymbols = () => {
  let symbols = [];
  for (let i = 0; i < 8; i++) {
    let j = Math.floor(Math.random() * mysteriousSymbols.length);

    symbols[i] = mysteriousSymbols[j];
  }
  return symbols.map((s) => <span>{`  ${s}  `}</span>);
};

const Blog = () => {
  const [postObjs, setPostObjs] = useState([]);
  const { isMobile } = useContext(VariableContext);
  const [selectedPost, setSelectedPost] = useState(undefined);

  useEffect(() => {
    const markdownFileNames = postNames.map((p) => p.concat(".md"));
    const fetchMdFiles = async () => {
      const filesContents = await Promise.all(
        markdownFileNames.map((filename) =>
          fetch(`/blogPosts/${filename}`).then((res) => res.text())
        )
      );
      let postObjs = filesContents.map((file) => matter(file));
      postObjs.sort(
        (a, b) => Date.parse(b.data.date) - Date.parse(a.data.date)
      );
      setPostObjs(postObjs);
    };

    fetchMdFiles();
  }, []);

  if (isMobile) return <BlogMobile posts={postObjs} />;

  let i = 0;

  return (
    <div className={styles.blogWrapper}>
      <div className={styles.titleBar}>
        <h1>Blog</h1>
      </div>
      <div className={styles.bodyWrapper}>
        <div className={styles.menu}>
          <BlogMenu
            posts={postObjs}
            selectedPost={selectedPost}
            setSelectedPost={setSelectedPost}
          />
        </div>
        <div className={styles.blog}>
          {selectedPost !== undefined && (
            <div className={styles.post}>
              <Post post={selectedPost} />
            </div>
          )}
          {selectedPost === undefined &&
            postObjs.map((postObj) => {
              i++;
              return (
                <>
                  <div className={styles.post}>
                    <Post post={postObj} />
                  </div>
                  <div
                    className={`${styles.spacer} ${
                      i === postNames.length ? styles.finalSpacer : ""
                    }`}
                  >
                    {getSymbols()}
                    {i === postNames.length && getSymbols()}
                  </div>
                </>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default Blog;
