import { useLocation } from 'react-router-dom'
import styles from '../styles/NavBar.module.css'
import NavItem from "./NavItem"

const bgColorMap = {
	"/": "",
	"/experience": styles.backgroundGray,
};

const NavBar = () => {
	const location = useLocation();
   
	return (
		<div>
			<ul className={`${styles.navBar} ${bgColorMap[location.pathname]}`}>
				<NavItem dst="/" linkText="Home"/>
				{/* <NavItem dst="/about" linkText="About"/> */}
				<NavItem dst="/experience" linkText="Experience"/>
				<NavItem dst="../../public/Resume_pdf.pdf" linkText="Resume" pdf={true}/>
				<NavItem dst="/experience" linkText="Contact me"/>
			</ul>
		</div>
	)
}

export default NavBar;