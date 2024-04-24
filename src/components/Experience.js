// import React, { useState, useEffect } from 'react'
import styles from '../styles/Experience.module.css'
import ProjectCard from './ProjectCard';
import whiteowl from "../media/whiteowlpic.jpg"
import { Link } from "react-router-dom";
import Timeline from "./Timeline";
import marsImg from '../media/planet_mars.jpg';

const LeftTimeLineCard = ({ children, title, subTitle, start, end, image, imageAlt }) => {
	return (
		<div className={`${styles.item} ${styles.leftItem}`}>
			<img src={image} alt={imageAlt}/>
			<div className={styles.textBox}>
				<h2>{title} <span className={styles.lightBold}>{subTitle}</span></h2>
				<small>{start}&#8212;{end === "" ? 'present' : end}</small>
				<p>{children}</p>
			</div>
			<span className={styles.leftArrow} />
		</div>
	)
}

const RightTimeLineCard = ({ children, title, subTitle, start, end, image, imageAlt }) => {
	return (
		<div className={`${styles.item} ${styles.rightItem}`}>
			<img src={image} alt={imageAlt}/>
			<div className={styles.textBox}>
				<h2>{title} <span className={styles.lightBold}>{subTitle}</span></h2>
				<small>{start}&#8212;{end === "" ? 'present' : end}</small>
				<p>{children}</p>
			</div>
			<span className={styles.rightArrow} />
		</div>
	)
}


const Experience = () => {
	return (
		<div className={styles.wrapper}>
			<h1 className={`${styles.yellow}`}>Experience</h1>
			<div className={styles.experienceWrapper}>
				<div className={styles.timeline}>
					
					<LeftTimeLineCard
					title="TD Securities"
					subTitle="| Fullstack Developer"
					start="2022"
					image={marsImg}
					imageAlt="mars planet">
						The success of every company is the story of it;s founding oho ho big mama io ho bisogno di trovare una giacca nera.
					</LeftTimeLineCard>

					<div className={`${styles.item} ${styles.rightItem}`}>
						<img src={marsImg} alt="mars"/>
						<div className={styles.textBox}>
							<h2>Strategio <span className={styles.lightBold}>| Technologist</span></h2>
							<small>2022&#8212;present</small>
							<p></p>
						</div>
						<span className={styles.rightArrow} />
					</div>

					<div className={`${styles.item} ${styles.leftItem}`}>
						<img src={marsImg} alt="mars"/>
						<div className={styles.textBox}>
							<h2>Strategio <span className={styles.lightBold}>| Technologist</span></h2>
							<small>2019&#8212;2020</small>
							<p>The success of every company is the story of it;s founding oho ho big mama io ho bisogno di trovare una giacca nera.</p>
						</div>
						<span className={styles.leftArrow} />
					</div>

					<div className={`${styles.item} ${styles.rightItem}`}>
						<img src={marsImg} alt="mars"/>
						<div className={styles.textBox}>
							<h2>Strategio <span className={styles.lightBold}>| Technologist</span></h2>
							<small>2019&#8212;2020</small>
							<p>The success of every company is the story of it;s founding oho ho big mama io ho bisogno di trovare una giacca nera.</p>
						</div>
						<span className={styles.rightArrow} />
					</div>

					<div className={`${styles.item} ${styles.leftItem}`}>
						<img src={marsImg} alt="mars"/>
						<div className={styles.textBox}>
							<h2>Strategio <span className={styles.lightBold}>| Technologist</span></h2>
							<small>2019&#8212;2020</small>
							<p>The success of every company is the story of it;s founding oho ho big mama io ho bisogno di trovare una giacca nera.</p>
						</div>
						<span className={styles.leftArrow} />
					</div>

					<div className={`${styles.item} ${styles.rightItem}`}>
						<img src={marsImg} alt="mars"/>
						<div className={styles.textBox}>
							<h2>Strategio <span className={styles.lightBold}>| Technologist</span></h2>
							<small>2019&#8212;2020</small>
							<p>The success of every company is the story of it;s founding oho ho big mama io ho bisogno di trovare una giacca nera.</p>
						</div>
						<span className={styles.rightArrow} />
					</div>
				</div>
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

export default Experience;