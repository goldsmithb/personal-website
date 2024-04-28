// import React, { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css';
import BlinkingCursor from './BlinkingCursor';
import ProjectCard from './ProjectCard';
import whiteowlImg from "../media/whiteowlpic.jpg";
import alchemyImg from '../media/teniers.webp'
import { Link } from "react-router-dom";
import csiPDF from '../media/csi.pdf';
import thesisPDF from '../media/thesis.pdf';
import crotonImg from '../media/croton.jpg';
import ContactForm from "./ContactForm";

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
					
					<ProjectCard title="White Owl Records website and blog" url="http://whiteowlrecords.xyz" imageUrl={whiteowlImg} altTxt="Screenshot of the white owl record's homepage.">
						<Link style={{textDecoration:"none"}}to="http://whiteowlrecords.xyz" target="_blank">
							<h2 className={styles.yellow} style={{margin:0, fontWeight:200}}>whiteowlrecords.xyz</h2>
						</Link>
						<p>Official website for White Owl Records, an independent label based out of Brooklyn, NYC, highlighting experimental live techno.
						</p>
						<p>I built a fast-loading static site powered by <Link className={styles.red} to="https://react.dev/" target="_blank">Reactjs</Link> and <Link className={styles.red} to="https://www.gatsbyjs.com/" target="_blank">Gatsby</Link>, and integrated with <Link className={styles.red} to="https://www.sanity.io/" target="_blank">Sanity CMS</Link> for seamless content management. The goal was to build a continuosly integrated deployment pipeline for site content, as well as design a frontend that reflected White Owl's brand.
						</p>
					</ProjectCard>

					<ProjectCard title="Bachelor's Thesis" url={thesisPDF} imageUrl={alchemyImg} altTxt="a painting by Daniel Tenier's entitled 'The Alchemist'">
						<Link style={{textDecoration:"none"}}to={thesisPDF} target="_blank">
							<h2 className={styles.yellow} style={{margin:0, fontWeight:200}}>Read the paper here!</h2>
						</Link>
						<p>The thesis paper I wrote while completing my Bachelor's in the History of Science, enetitled <em>Obscurity, Secrecy, and Authority: Transformations in English Alchemy in the late Seventeenth Century</em>.
						</p>
						<p>The culmination of over a year of research into alchemy in the early modern period, this project reflects my passion for the Scientific Revolution and just what can be considered revolutionary about it. A special thank you to my thesis advisor, Hunter!
						</p>
					</ProjectCard>

					<ProjectCard title="CSI Research Grant: Creative Essay" url={csiPDF} imageUrl={crotonImg} altTxt="a painting by Daniel Tenier's entitled 'The Alchemist'">
						<Link style={{textDecoration:"none"}}to={csiPDF} target="_blank">
							<h2 className={styles.yellow} style={{margin:0, fontWeight:200}}>Read the paper here!</h2>
						</Link>
						<p>
							This creative non-fiction essay is the product of a summer spent researching the history of the Croton Aqueduct, which once delivered potable water from Westchester County to New York City over 100 years ago. Titled <em>History Fades to Fable: The Many Lives of the Croton Aqueduct</em>, the piece explores the exciting history of quenching a thirsty and desperate New York City, and the American tradition of constructing our own mythology.
						</p>
					</ProjectCard>

				</div>
			</div>

			<div className={styles.thirdWrapper}>
				<ContactForm />
			</div>

		</div>
	)
}

export default Home;