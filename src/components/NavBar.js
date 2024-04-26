import { useLocation } from 'react-router-dom';
import styles from '../styles/NavBar.module.css';
import NavItem from "./NavItem";

const bgColorMap = {
	"/": "",
	"/experience": styles.backgroundGray,
};

const stickyMap = {
	"/": "",
	"/experience": styles.sticky,
}

const NavBar = () => {
	const path = useLocation().pathname;
   
	return (
		<div className={`${stickyMap[path]}`}>
			<ul className={`${styles.navBar} ${bgColorMap[path]}`}>
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