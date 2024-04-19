import styles from '../styles/NavBar.module.css'
import NavItem from "./NavItem"

const NavBar = () => {
	
   
	return (
		<div>
			<ul className={styles.navBar}>
				<NavItem to="/" linkText="Home"/>
				<NavItem to="/about" linkText="About"/>
				<NavItem to="/experience" linkText="Experience"/>
			</ul>
		</div>
	)
}

export default NavBar;