import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Layout({ children, home=false }) {
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.png" />
				<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
			</Head>
            
			<main>
				{ children }
				{!home && (
					<Link href="/" className={styles.card}>
						<h3 style={{margin: '0'}}>Volver</h3>
					</Link>
				)}
			</main>
			
			<footer>
				<p>
					desarrollado por <a href="https://markski.ar" target="_blank" rel="noopener noreferrer" className={styles.text_accent_subtle}>juan geido / markski</a><br />
					aplicación de código abierto. <a href="https://github.com/markski1/Calculadoras" target="_blank" rel="noopener noreferrer" className={styles.text_accent_subtle}>ver en github</a><br />
				</p>
				<p>
					<Link href="colaborar" className={styles.text_accent_subtle}>colaborar con calculando argentina</Link>
				</p>
			</footer>
		</>
	);
}