import { useState } from "react"
import { Link } from 'react-router-dom'
import styles from '../styles/NavBar.module.css'
import resumePdf from '../media/Resume.pdf'

const colors = ["#f04e32", "#3b74ba", "#f0609e", "#fbad18"];

// in range 0 to 3
const getRandomIndex = () => Math.floor(Math.random() * 4)


const NavItem = ({ dst, linkText, pdf}) => {
	const [index, setIndex] = useState(getRandomIndex)
	const changeColor = (e) => {
		let newI = getRandomIndex();
		while (index === newI) newI = getRandomIndex();
		setIndex(newI)
   }

   if (pdf === true) {
	return (
		<li onMouseEnter={changeColor}>
			<a href={resumePdf} target="_blank" className={styles.navLink} style={{color:colors[index]}} rel="noreferrer">
				Resume
			</a>
		</li>
	)
   }

	return (
		<li onMouseEnter={changeColor}>
			<Link to={dst} className={styles.navLink} style={{color:colors[index]}}>
				{linkText}</Link>
		</li>
	)
}

export default NavItem;