// import React, { useState, useEffect } from 'react'
import styles from '../styles/Home.module.css';
import BlinkingCursor from './BlinkingCursor';

const yellow = 'fbad18'
const blue = '3b74ba'
const red = 'f04e32'
const pink = 'f0609e'

const Home = () => {
	return (
		<div className={styles.wrapper}>
			<div className={styles.header}>
				<div className={styles.top}>
					<h1 className={styles.red}>Bradley</h1><h1 className={styles.red}>Goldsmith</h1>
				</div>
				<h2 className={styles.blue}>Software Developer<BlinkingCursor /></h2>
			</div>
			<div className={styles.body}>
				<p>
				<span className={styles.hello}>Hello, I'm <u className={`${styles.thicker}`}>Bradley</u> - a software engineer from New York. </span>
				<span>I do <u className={`${styles.red} ${styles.thicker}`}>fullstack development</u>, striving to create web applications that use <u className={`${styles.yellow} ${styles.thicker}`}>intuitive <em>design</em></u> and have <u className={`${styles.blue} ${styles.thicker}`}>robust, intelligent <em>architecture</em></u>.</span>
				<span>I currently work on the API platform at TD Securities investment bank.</span>
				</p>

				{/* <p>
				Fusce maximus erat sit amet leo ultricies consectetur. Ut quis hendrerit orci. Praesent at nisl ac arcu eleifend auctor. Phasellus vitae sagittis tortor. Duis finibus lorem non nunc feugiat, ac euismod purus rutrum. Suspendisse urna velit, semper sodales lacinia in, interdum et turpis. Duis vel cursus mi. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Aenean a nisl sit amet est lacinia rutrum. Fusce varius neque sed ullamcorper eleifend. Cras sed consectetur leo. Etiam eleifend arcu elementum, sagittis nulla et, gravida sapien. Phasellus vel risus sit amet tellus ultricies molestie.
				</p>
				<p>
				Vestibulum semper ante felis, a sollicitudin nibh tincidunt nec. Nam in sagittis orci. Praesent eros augue, finibus elementum risus id, ullamcorper lacinia lacus. Integer vel sapien vitae velit iaculis pharetra. Curabitur sollicitudin porta dapibus. Pellentesque et arcu consequat nisi aliquam porttitor eu et nisl. Curabitur ultricies nibh ac venenatis eleifend.
				</p>
				<p>
				Sed lobortis velit ac sem molestie consectetur. Sed auctor et ante non lobortis. Donec eu porttitor justo. Aenean id turpis nec risus sagittis ultrices nec eu lorem. Vivamus egestas est sit amet sem porta condimentum. Orci varius natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Maecenas dui tortor, semper nec nisi feugiat, molestie scelerisque ligula.
				</p>
				<p>
				Curabitur ac felis vel nulla sodales hendrerit vitae quis orci. Nullam tincidunt libero sit amet accumsan dictum. Donec sapien nisl, euismod vel rhoncus sit amet, lacinia ac lectus. Sed lacinia tempor tincidunt. Nulla sagittis dictum orci. Phasellus luctus vehicula dui, sit amet ullamcorper odio consectetur a. Sed nec dolor lectus.
				</p> */}
			</div>
			
		</div>
	)
}

export default Home;