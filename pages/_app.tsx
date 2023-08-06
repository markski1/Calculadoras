import '../styles/global.css';
import { AppProps } from 'next/app';
import Transition from '../components/transition';
import '../styles/transition.css';
import styles from '../styles/Home.module.css';
import React from 'react';
import Link from 'next/link';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
        <Link href="/" style={{textDecoration: 'none'}}>
          <h1 className={styles.title}>
              <span className={styles.text_accent}>Calculadoras Argentinas</span>
          </h1>
        </Link>
        <Transition>
            <Component {...pageProps} />
        </Transition>
    </>
  );
}

export default App;