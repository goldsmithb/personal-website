import { useState } from 'react';
import ContactForm from "./ContactForm";
import styles from '../styles/ContactPage.module.css';

const ContactPage = () => {

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