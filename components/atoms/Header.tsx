import Link from "next/link";
import styles from '../../styles/Home.module.css';

export default function Header() {
	return (
          <div style={{textAlign: 'left', display: 'flex', margin: '1.5rem auto', width: '20rem', userSelect: 'none'}}>
              <img src="logo_small.png" style={{height: '130px', marginRight: '2rem'}} />
              <Link href="/" style={{textDecoration: 'none'}}>
                <span className={styles.text_accent} style={{fontSize: '2.5rem', fontWeight: 700}}>Calculando Argentina</span>
              </Link>
          </div>
	);
} 