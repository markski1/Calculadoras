import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Layout({ children }) {
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.png" />
			</Head>
            
			<main>
				{ children }
			</main>
			<footer>
				<p>
					Creado por Markski - <a href="https://markski.ar" target="_blank" rel="noopener noreferrer" className={styles.text_accent_subtle}>https://markski.ar</a>
				</p>
				<p>
					¿Te sirve la herramienta? Si queres, <Link href="donar" className={styles.text_accent_subtle}>podes colaborar</Link>.
				</p>
			</footer>
		</>
	);
}