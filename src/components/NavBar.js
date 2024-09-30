import { useLocation } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import NavItem from "./NavItem";

const bgColorMap = {
  "/": "",
  "/experience": styles.backgroundGray,
};

const NavBar = () => {
  const path = useLocation().pathname;
  const scrollDst = path === "/";

  return (
    <div className={styles.sticky}>
      <ul className={`${styles.navBar} ${bgColorMap[path]}`}>
        <NavItem dst="/">Home</NavItem>
        <NavItem dst="/experience">Experience</NavItem>
        <NavItem dst="/blog">Blog</NavItem>
        <NavItem dst="../../public/Resume_pdf.pdf" pdf={true}>
          Resume
        </NavItem>
        <NavItem dst="/contact" scrollDst={scrollDst}>
          Contact Me
        </NavItem>
      </ul>
    </div>
  );
};

export default NavBar;
