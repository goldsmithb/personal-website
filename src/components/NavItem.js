import { useState } from "react"
import { Link } from 'react-router-dom'
import styles from '../styles/NavBar.module.css'
import resumePdf from '../media/Resume.pdf'

const colors = ["#f04e32", "#3b74ba", "#f0609e", "#fbad18"];

const getRandomIndex = () => Math.floor(Math.random() * colors.length)


const NavItem = ({ children, dst, pdf, scrollDst}) => {
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
				{children}
			</a>
		</li>
	)
   }

   if (scrollDst === true) {
	return (
		<li onMouseEnter={changeColor}>
			<a href="#contact" className={styles.navLink} style={{color:colors[index]}}>
				{children}
			</a>
		</li>
	)
   }

	return (
		<li onMouseEnter={changeColor}>
			<Link to={dst} className={styles.navLink} style={{color:colors[index]}}>
				{children}</Link>
		</li>
	)
}

export default NavItem;