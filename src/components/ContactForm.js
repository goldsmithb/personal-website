import {useRef} from 'react';
import emailjs from '@emailjs/browser';

const ContactForm = () => {
	const form = useRef();

	const sendEmail = (e) => {
		e.preventDefault();
		
		emailjs
			.sendForm('service_d3y6ykl', 'contact_form', form.current, {
				publicKey: "SqABQ_gz15sx20mf6",
			})
			.then(() => {
				console.log("Success");
			},
			(error) => {
				console.log('failed...', error.text)
			},
		);
	};
	
	return (
		<form ref={form} onSubmit={sendEmail}>
			<label>Name</label>
			<input type="text" name="user_name" />
			<label>Email</label>
			<input type="text" name="user_email" />
			<label>Message</label>
			<textarea name="message" />
			<input type="submit" value="Send" />
		</form>
	);
};

export default ContactForm;