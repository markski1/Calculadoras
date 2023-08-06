import Head from 'next/head';
import Link from 'next/link';
import styles from '../styles/Home.module.css';

export default function Layout({ children, home=false }) {
	return (
		<>
			<Head>
				<link rel="icon" href="/favicon.png" />
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
					desarrollado por <a href="https://markski.ar" target="_blank" rel="noopener noreferrer" className={styles.text_accent_subtle}>markski / juan geido</a>
				</p>
				<p>
					este servicio es 100% gratuito. si queres, <Link href="donar" className={styles.text_accent_subtle}>podes colaborar a su mantenimiento</Link>.
				</p>
			</footer>
		</>
	);
}