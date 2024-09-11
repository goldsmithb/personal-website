import React from "react";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";

const markdown = `# Hi, *Venus!*`;

const Blog = () => {
  return <Markdown remarkPlugins={[remarkGfm]}>{markdown}</Markdown>;
};

export default Blog;
