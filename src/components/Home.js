// import React, { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css';
import BlinkingCursor from './BlinkingCursor';
import ProjectCard from './ProjectCard';
import whiteowlImg from "../media/whiteowlpic.jpg"
import { Link } from "react-router-dom";

// const yellow = 'fbad18'
// const blue = '3b74ba'
// const red = 'f04e32'
// const pink = 'f0609e'

const Home = () => {
	document.querySelectorAll('a[href^="#"]').forEach(anchor => {
		anchor.addEventListener('click', function (e) {
			e.preventDefault();
	
			document.querySelector(this.getAttribute('href')).scrollIntoView({
				behavior: 'smooth'
			});
		});
	});
	
	return (
		<div className={styles.wrapper}>
			<div className={styles.firstWrapper}>
				<div className={styles.header}>
					<div className={styles.top}>
						<h1 className={styles.red}>Bradley</h1><h1 className={styles.red}>Goldsmith</h1>
					</div>
					<h2 className={styles.blue}>Software Developer<BlinkingCursor>|</BlinkingCursor></h2>
				</div>
				<div className={styles.body}>
					<span className={styles.hello}>Hello, I'm <u className={`${styles.thicker}`}>Bradley</u> - a software engineer from New York. </span>
					<span>I do <u className={`${styles.red} ${styles.thicker}`}>fullstack development</u>, striving to create web applications that use <u className={`${styles.yellow} ${styles.thicker}`}>intuitive <em>design</em></u> and have <u className={`${styles.blue} ${styles.thicker}`}>robust, intelligent <em>architecture</em></u>.</span>
					<span>I currently work on the API platform at TD Securities investment bank.</span>
				</div>
			</div>
			<div className={styles.secondWrapper}>
				<a href="#projects"><h1 className={`${styles.pink} ${styles.sticky}`}>Projects</h1></a>
				<div id="projects" className={styles.projectsWrapper}>
					<ProjectCard url="http://whiteowlrecords.xyz" imageUrl={whiteowlImg}>
						<Link style={{textDecoration:"none"}}to="http://whiteowlrecords.xyz" target="_blank">
							<h2 className={styles.yellow} style={{margin:0, fontWeight:200}}>whiteowlrecords.xyz</h2>
						</Link>
						<p>Official website for White Owl Records, an independent label based out of Brooklyn, NYC, highlighting experimental live techno.
						</p>
						<p>I built a fast-loading static site powered by <Link className={styles.red} to="https://react.dev/" target="_blank">Reactjs</Link> and <Link className={styles.red} to="https://www.gatsbyjs.com/" target="_blank">Gatsby</Link>, and integrated with <Link className={styles.red} to="https://www.sanity.io/" target="_blank">Sanity CMS</Link> for seamless content management. The goal was to build a continuosly integrated deployment pipeline for site content, as well as design a frontend that reflected White Owl's brand.
						</p>
					</ProjectCard>
				</div>
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

export default Home;