import Link from 'next/link';
import styles from '../styles/Custom.module.css';

export default function Layout({ children, home=false }) {
	return (
		<>            
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
					desarrollado por <a href="https://markski.ar" target="_blank" rel="noopener noreferrer" className={styles.text_accent_subtle}>markski</a><br />
					aplicación de código abierto. <a href="https://github.com/markski1/Calculadoras" target="_blank" rel="noopener noreferrer" className={styles.text_accent_subtle}>ver en github</a><br />
				</p>
			</footer>
		</>
	);
}