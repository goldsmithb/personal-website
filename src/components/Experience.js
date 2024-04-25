// import React, { useState, useEffect } from 'react'
import styles from '../styles/Experience.module.css'
import ProjectCard from './ProjectCard';
import whiteowl from "../media/whiteowlpic.jpg"
import { Link } from "react-router-dom";
import Timeline from "./Timeline";
import marsImg from '../media/planet_mars.jpg';
import tdImg from '../media/tds.png';
import stratImg from '../media/strategio.png';
import owlImg from '../media/BIGOWL.jpg';
import fulbrightImg from '../media/fulbright.png';
import ucImg from '../media/uc.png';

const TimeLineCard = ({ listId, title, subTitle, start, end, only, image, imageAlt, children }) => {
	const left = listId % 2 === 0;

	return (
		<div className={`${styles.item} ${left ? styles.leftItem : styles.rightItem}`}>
			<img src={image} alt={imageAlt}/>
			<div className={styles.textBox}>
				<h2>{title} <span className={styles.lightBold}>{subTitle}</span></h2>
				{only ? only : (<small>{start}&#8212;{end === undefined ? 'present' : end}</small>) }
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
						image={tdImg}
						imageAlt="mars planet">
						Work as a fullstack developer at <Link to="https://www.tdsecurities.com/ca/en" className={styles.red}>TD Securities</Link> investment bank as a member of the API gateway team.
					</TimeLineCard>

					<TimeLineCard
						listId={i++}
						title="Strategio"
						subTitle="| Technologist"
						start="2022"
						image={stratImg}
						imageAlt="mars planet">
						Hired as a Technologist at <Link to="https://strategio.tech/" className={styles.red} >Strategio</Link>, a company that trains and contracts out software developers to enterprise companies.
					</TimeLineCard>

					<TimeLineCard
						listId={i++}
						title="White Owl Records"
						subTitle="| Lead Website Developer"
						start="2023"
						image={owlImg}
						imageAlt="mars planet">
						Design, build, and manage the official website for <Link to="https://whiteowlrecords.xyz/" className={styles.red}>White Owl Records</Link>, an independent label based out of Brooklyn, New York highlighting experimental live techno.
					</TimeLineCard>

					<TimeLineCard
						listId={i++}
						title="Fulbright Austria"
						subTitle="| US Teaching Assistant"
						start="2021"
						end="2022"
						image={fulbrightImg}
						imageAlt="mars planet">
						Taught English as a foreign language to high school students outside of Vienna, Austria as a part of Fulbright Austria's US Teaching Assistant program. Lived in Vienna for one wonderful year.
					</TimeLineCard>

					<TimeLineCard
					listId={i++}
					title="University of Chicago"
					subTitle="| BA in History of Science"
					start="2017"
					end="2021"
					image={ucImg}
					imageAlt="mars planet">
						Hired as a Technologist at <Link to="https://strategio.tech/" className={styles.red} >Strategio</Link>, a company that trains and contracts out software developers to enterprise companies.
					</TimeLineCard>

					<TimeLineCard
					listId={i++}
					title="UChicago Writing Program"
					subTitle="| Peer Writing Tutor"
					start="2019"
					end="2021"
					image={ucImg}
					imageAlt="mars planet">
						Hired as a Technologist at <Link to="https://strategio.tech/" className={styles.red} >Strategio</Link>, a company that trains and contracts out software developers to enterprise companies.
					</TimeLineCard>

					<TimeLineCard
					listId={i++}
					title="College Summer Institute"
					subTitle="| Grant Awardee"
					only="2020"
					image={ucImg}
					imageAlt="mars planet">
						Hired as a Technologist at <Link to="https://strategio.tech/" className={styles.red} >Strategio</Link>, a company that trains and contracts out software developers to enterprise companies.
					</TimeLineCard>

					<TimeLineCard
					listId={i++}
					title="Foreign Language Aquisition Grant"
					subTitle="| Grant Awardee"
					only="2020"
					image={ucImg}
					imageAlt="mars planet">
						Hired as a Technologist at <Link to="https://strategio.tech/" className={styles.red} >Strategio</Link>, a company that trains and contracts out software developers to enterprise companies.
					</TimeLineCard>

				</div>
				</div>
		</div>
	)

}

export default Experience;