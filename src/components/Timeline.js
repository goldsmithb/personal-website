
// import React, { useState, useEffect } from 'react'
import styles from '../styles/Experience.module.css'
import ProjectCard from './ProjectCard';
import whiteowl from "../media/whiteowlpic.jpg"
import { Link } from "react-router-dom";

const Timeline = () => {
	return (
		<div className={styles.wrapper}>
			<h1 className={`${styles.yellow}`}>Experience</h1>
			<div className={styles.experienceWrapper}>
				{/* <ProjectCard url="http://whiteowlrecords.xyz" imageUrl={whiteowl}>
					<Link style={{textDecoration:"none"}}to="http://whiteowlrecords.xyz" target="_blank">
						<h2 className={styles.yellow} style={{margin:0, fontWeight:200}}>whiteowlrecords.xyz</h2>
					</Link>
					<p>Official website for White Owl Records, an independent label based out of Brooklyn, NYC, highlighting experimental live techno.
					</p>
					<p>I built a fast-loading static site powered by <Link className={styles.red} to="https://react.dev/" target="_blank">Reactjs</Link> and <Link className={styles.red} to="https://www.gatsbyjs.com/" target="_blank">Gatsby</Link>, and integrated with <Link className={styles.red} to="https://www.sanity.io/" target="_blank">Sanity CMS</Link> for seamless content management. The goal was to build a continuosly integrated deployment pipeline for site content, as well as design a frontend that reflected White Owl's brand.
					</p>
				</ProjectCard> */}
			</div>
				{/* <p>
				Sed lobortis velit ac sem molestie consectetur. Sed auctor et ante non lobortis. Donec eu porttitor justo. Aenean id turpis nec risus sagittis ultrices nec eu lorem. Vivamus egestas est sit amet sem porta condimentum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas dui tortor, semper nec nisi feugiat, molestie scelerisque ligula.
				</p>
				<p>
				Curabitur ac felis vel nulla sodales hendrerit vitae quis orci. Nullam tincidunt libero sit amet accumsan dictum. Donec sapien nisl, euismod vel rhoncus sit amet, lacinia ac lectus. Sed lacinia tempor tincidunt. Nulla sagittis dictum orci. Phasellus luctus vehicula dui, sit amet ullamcorper odio consectetur a. Sed nec dolor lectus.
				</p> */}
		</div>
	)

}

export default Timeline;