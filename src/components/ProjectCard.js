import React from 'react';
import { Link } from "react-router-dom";
import styles from "../styles/ProjectCard.module.css"

const ProjectCard = ({children, url, imageUrl}) => {
	return (
		<div className={styles.card}>
			<h2 className={styles.blue}>White Owl Records website and blog</h2>
			<div className={styles.container}>
				<Link to={url} target="_blank">
					<img src={imageUrl} width="400px" alt="White Owl Records homepage"/>
				</Link>
				<div className={styles.children}>
					{children}
				</div>
			</div>
		</div>
	);
}

export default ProjectCard;