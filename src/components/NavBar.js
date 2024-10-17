import React, { useState, useContext } from "react";
import { useLocation, Link } from "react-router-dom";
import styles from "../styles/NavBar.module.css";
import NavItem from "./NavItem";
import VariableContext from "../context/VariableProvider";

const bgColorMap = {
  "/": "",
  "/experience": styles.backgroundGray,
};

const NavBar = () => {
  const path = useLocation().pathname;
  const { isMobile } = useContext(VariableContext);
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
        {!isMobile && <DropDown />}
      </ul>
    </div>
  );
};

// eslint-disable-next-line
const DropDown = () => {
  const [open, setOpen] = useState(false);
  const handleClick = () => setOpen(!open);
  return (
    <div
      className={`${styles.dropDown} ${open ? styles.down : styles.up}`}
      onClick={() => handleClick()}
    >
      More <span className={open ? styles.down : styles.up}>{`\u2191`}</span>
      {open && (
        <ul className={`${styles.dropDownList}`}>
          <li>
            <Link
              className={styles.navLink}
              style={{ color: "#fbad18" }}
              to="/solifaire"
            >
              Play Solifaire
            </Link>
          </li>
        </ul>
      )}
    </div>
  );
};

export default NavBar;
