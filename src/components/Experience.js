// import React, { useState, useEffect } from 'react'
import styles from '../styles/Experience.module.css'
import ProjectCard from './ProjectCard';
import whiteowl from "../media/whiteowlpic.jpg"
import { Link } from "react-router-dom";
import Timeline from "./Timeline";
import marsImg from '../media/planet_mars.jpg';

const TimeLineCard = ({ listId, title, subTitle, start, end, image, imageAlt, children }) => {
	const left = listId % 2 === 0;

	return (
		<div className={`${styles.item} ${left ? styles.leftItem : styles.rightItem}`}>
			<img src={image} alt={imageAlt}/>
			<div className={styles.textBox}>
				<h2>{title} <span className={styles.lightBold}>{subTitle}</span></h2>
				<small>{start}&#8212;{end === undefined ? 'present' : end}</small>
				<p>{children}</p>
			</div>
			<span className={left ? styles.leftArrow : styles.rightArrow} />
		</div>
	)
}

const Experience = () => {
	let i = 0;
	return (
		<div className={styles.wrapper}>
			<h1 className={`${styles.yellow}`}>Experience</h1>
			<div className={styles.experienceWrapper}>
				<div className={styles.timeline}>
					
					<TimeLineCard
					listId={i++}
					title="TD Securities"
					subTitle="| Fullstack Developer"
					start="2022"
					image={marsImg}
					imageAlt="mars planet">
						Work as a contracrted fullstack developer at <Link to="https://www.tdsecurities.com/ca/en" className={styles.red}>TD Securities</Link> investment bank, working on the API gateway team.
					</TimeLineCard>

					<TimeLineCard
					listId={i++}
					title="Strategio"
					subTitle="| Technologist"
					start="2022"
					image={marsImg}
					imageAlt="mars planet">
						Hired as a Technologist at <Link to="https://strategio.tech/" className={styles.red} >Strategio</Link>, a company that trains and contracts out software developers to enterprise companies.
					</TimeLineCard>


					<TimeLineCard
					listId={i++}
					title="Strategio"
					subTitle="| Technologist"
					start="2022"
					image={marsImg}
					imageAlt="mars planet">
						Hired as a Technologist at <Link to="https://strategio.tech/" className={styles.red} >Strategio</Link>, a company that trains and contracts out software developers to enterprise companies.
					</TimeLineCard>

					<TimeLineCard
					listId={i++}
					title="Strategio"
					subTitle="| Technologist"
					start="2022"
					image={marsImg}
					imageAlt="mars planet">
						Hired as a Technologist at <Link to="https://strategio.tech/" className={styles.red} >Strategio</Link>, a company that trains and contracts out software developers to enterprise companies.
					</TimeLineCard>

					<TimeLineCard
					listId={i++}
					title="Strategio"
					subTitle="| Technologist"
					start="2022"
					image={marsImg}
					imageAlt="mars planet">
						Hired as a Technologist at <Link to="https://strategio.tech/" className={styles.red} >Strategio</Link>, a company that trains and contracts out software developers to enterprise companies.
					</TimeLineCard>

					<TimeLineCard
					listId={i++}
					title="Strategio"
					subTitle="| Technologist"
					start="2022"
					image={marsImg}
					imageAlt="mars planet">
						Hired as a Technologist at <Link to="https://strategio.tech/" className={styles.red} >Strategio</Link>, a company that trains and contracts out software developers to enterprise companies.
					</TimeLineCard>
				</div>
				</div>
		</div>
	)

}

export default Experience;