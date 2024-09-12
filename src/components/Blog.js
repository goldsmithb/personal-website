import React, { useState, useEffect, useContext } from "react";
import * as matter from "gray-matter";
import Post from "./Post.js";
import BlogMobile from "./mobile/BlogMobile.js";
import { posts } from "../constants.js";
import VariableContext from "../context/VariableProvider";
// Configure buffer, via stackOverflow: https://stackoverflow.com/questions/48432524/cant-find-variable-buffer
global.Buffer = global.Buffer || require("buffer").Buffer;

const Blog = () => {
  const [postObjs, setPostObjs] = useState([]);
  const { isMobile } = useContext(VariableContext);

  useEffect(() => {
    const markdownFileNames = posts.map((p) => p.concat(".md"));
    const fetchMdFiles = async () => {
      const filesContents = await Promise.all(
        markdownFileNames.map((filename) =>
          fetch(`/blogPosts/${filename}`).then((res) => res.text())
        )
      );
      let postObjs = filesContents.map((file) => matter(file));
      setPostObjs(postObjs);
    };

    fetchMdFiles();
  }, []);

  if (isMobile) return <BlogMobile posts={postObjs} />;

  return postObjs.map((postObj) => {
    return (
      <div>
        <Post post={postObj} />
      </div>
    );
  });
};

export default Blog;
