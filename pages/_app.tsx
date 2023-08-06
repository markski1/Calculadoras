import '../styles/global.css';
import { AppProps } from 'next/app';
import Transition from '../components/transition';
import '../styles/transition.css';
import styles from '../styles/Home.module.css';
import React from 'react';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
        <h1 className={styles.title}>
            <span className={styles.text_accent}>Calculadoras Argentinas</span>
        </h1>
        <Transition>
            <Component {...pageProps} />
        </Transition>
    </>
  );
}

export default App;