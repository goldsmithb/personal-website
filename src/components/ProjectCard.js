import React, { useContext } from "react";
import { Link } from "react-router-dom";
import styles from "../styles/ProjectCard.module.css";
import VariableContext from "../context/VariableProvider";

const ProjectCard = ({ children, title, url, imageUrl, altTxt, border }) => {
  const { isMobile } = useContext(VariableContext);

  if (isMobile)
    return (
      <div className={styles.cardMobile}>
        <h2 className={styles.blue}>{title}</h2>
        <div className={styles.containerMobile}>
          <Link to={url} target="_blank">
            <img
              src={imageUrl}
              width="100%"
              alt={altTxt}
              className={border ? styles.borderImg : ""}
            />
          </Link>
          <div className={styles.childrenMobile}>{children}</div>
        </div>
      </div>
    );

  return (
    <div className={styles.card}>
      <h2 className={styles.blue}>{title}</h2>
      <div className={styles.container}>
        <Link to={url} target="_blank">
          <img
            src={imageUrl}
            width="400px"
            height="220px"
            alt={altTxt}
            className={border ? styles.borderImg : ""}
          />
        </Link>
        <div className={styles.children}>{children}</div>
      </div>
    </div>
  );
};

export default ProjectCard;
