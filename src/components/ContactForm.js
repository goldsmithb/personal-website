import React, { useContext } from 'react';
import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';
import styles from "../styles/ContactForm.module.css";
import VariableContext from "../context/VariableProvider";


const ContactForm = () => {
	const form = useRef();
	const [needName, setNeedName] = useState(false);
	const [needEmail, setNeedEmail] = useState(false);
	const [needMsg, setNeedMsg] = useState(false);
	const [showSentEmail, setShowSentEmail] = useState(false);
	const { isMobile } = useContext(VariableContext);
	const SentEmailConfirmation = () => {
		return (
			<div className={`${styles.confirmation} ${showSentEmail ? styles.show : styles.hide}`}>
				Message Sent!
			</div>
		);
	};

	const validateInput = () => {
		let validEmail = false, validName = false, validMsg = false;

		const email = document.getElementById('email').value;
		if (email !== "") {
			const matchEmail = email.toLowerCase()
				.match(
					/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
				);
			if (matchEmail) {
				validEmail = true;	
				setNeedEmail(false);
			}
		} else {
			setNeedEmail(true);
		}
		
		const name = document.getElementById('name').value;
		if (name === "") {
			setNeedName(true);
		} else {
			validName = true;
			setNeedName(false);
		}

		const msg = document.getElementById('message').value;
		if (msg === "") {
			setNeedMsg(true);
		} else {
			validMsg = true;
			setNeedMsg(false);
		}

		return validEmail && validName && validMsg;
  };

	const sendEmail = (e) => {
		e.preventDefault();

		if (!validateInput()) return

		emailjs
			.sendForm('service_d3y6ykl', 'contact_form', form.current, {
				publicKey: "SqABQ_gz15sx20mf6",
			})
			.then(() => {
				setShowSentEmail(() => true);
				setTimeout(() => {
					setShowSentEmail(() => false);
				}, 1000);

			},
			(error) => {
				console.log('failed...', error.text)
			},
			)

		document.getElementById("contact-form").reset();
	};


	if (isMobile) return (
		<>
			<SentEmailConfirmation />
			<form id="contact-form" className={styles.formMobile} ref={form} onSubmit={sendEmail}>
				<div className={styles.contact}>
						<label>Name:
							<input className={`${styles.input} ${needName ? styles.need : ""}`}  id="name" type="text" name="user_name" maxLength="30" />
						</label>
						<label>Email:
							<input  className={`${styles.input} ${needEmail ? styles.need : ""}`} id="email" type="text" name="user_email"  minLength="2" maxLength="300" />
						</label>
				</div>
				<label>Message</label>
				<textarea className={`${styles.message} ${styles.input} ${needMsg ? styles.need : ""}`}  id="message" name="message" maxLength="6000" />
				<input className={styles.submit} type="submit" value="Send" />
			</form>
		</>
	);

	return (
		<>
			<SentEmailConfirmation />
			<form id="contact-form" className={styles.form} ref={form} onSubmit={sendEmail}>
				<div className={styles.contact}>
						<label>Name:
							<input className={`${styles.input} ${needName ? styles.need : ""}`}  id="name" type="text" name="user_name" maxLength="30" />
						</label>
						<label>Email:
							<input  className={`${styles.input} ${needEmail ? styles.need : ""}`} id="email" type="text" name="user_email"  minLength="2" size={50} maxLength="300" />
						</label>
				</div>
				<label>Message</label>

				<textarea className={`${styles.message} ${styles.input} ${needMsg ? styles.need : ""}`}  id="message" name="message" maxLength="6000" />
				
				<input className={styles.submit} type="submit" value="Send" />
			</form>
		</>
	);
};

export default ContactForm;