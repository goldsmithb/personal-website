import React, { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css'

const BlinkingCursor = ({children}) => {
	const [showCursor, setShowCursor] = useState(true);
	// init flicker animation cycle:
	useEffect(() => {
		const interval = setInterval(() => {
			setShowCursor(!showCursor);
		}, 800);
		return () => clearInterval(interval);
	})

	return (
		<span className={`${styles.blinking} ${showCursor ? styles.hide : ''}`}>{children}</span>
	);
}

export default BlinkingCursor;