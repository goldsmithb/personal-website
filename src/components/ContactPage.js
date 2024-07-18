import React, { useContext } from 'react';
import ContactForm from "./ContactForm";
import styles from '../styles/ContactPage.module.css';
import VariableContext from "../context/VariableProvider";

const ContactPage = () => {
	const { isMobile } = useContext(VariableContext);

	if (isMobile) return (
		<div className={styles.wrapperMobiles}>
			<h1 className={`${styles.pink}`}>Contact Me</h1>
			<div className={styles.formWrapper}>
				<ContactForm />
			</div>
		</div>

	);
	
	return (
		<div className={styles.wrapper}>
			<h1 className={`${styles.pink}`}>Contact Me</h1>
			<div className={styles.formWrapper}>
				<ContactForm />
			</div>
		</div>
	);
};

export default ContactPage;