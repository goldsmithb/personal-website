import React from 'react';
import { Link } from "react-router-dom";
import styles from "../styles/ProjectCard.module.css"

const ProjectCard = ({children, title, url, imageUrl, altTxt}) => {
	return (
		<div className={styles.card}>
			<h2 className={styles.blue}>{title}</h2>
			<div className={styles.container}>
				<Link to={url} target="_blank">
					<img src={imageUrl} width="400px" height="220px" alt={altTxt}/>
				</Link>
				<div className={styles.children}>
					{children}
				</div>
			</div>
		</div>
	);
}

export default ProjectCard;