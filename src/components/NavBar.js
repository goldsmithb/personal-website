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
	const scrollDst = path === "/";
	console.log(scrollDst)
   
	return (
		<div className={`${stickyMap[path]}`}>
			<ul className={`${styles.navBar} ${bgColorMap[path]}`}>
				<NavItem dst="/" >Home</NavItem>
				<NavItem dst="/experience" >Experience</NavItem>
				<NavItem dst="../../public/Resume_pdf.pdf" pdf={true}>Resume</NavItem>
				<NavItem dst="/contact" scrollDst={scrollDst}>Contact Me</NavItem>
			</ul>
		</div>
	)
}

export default NavBar;