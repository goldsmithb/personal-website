import styles from '../styles/NavBar.module.css'
import NavItem from "./NavItem"

const NavBar = () => {
	
   
	return (
		<div>
			<ul className={styles.navBar}>
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