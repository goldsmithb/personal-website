import React from "react";
import Markdown from "react-markdown";

const markdown = `# Hi, *Venus!*`

const Blog = () => {
	return (
		<Markdown>{markdown}</Markdown>
	);
}

export default Blog;