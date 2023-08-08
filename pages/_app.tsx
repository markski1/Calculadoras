import '../styles/global.css';
import { AppProps } from 'next/app';
import Transition from '../components/transition';
import '../styles/transition.css';
import React from 'react';
import Header from '../components/atoms/Header';

function App({ Component, pageProps }: AppProps) {
  return (
    <>
        <Header />
        <Transition>
            <Component {...pageProps} />
        </Transition>
    </>
  );
}

export default App;