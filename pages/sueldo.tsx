import styles from '../styles/Home.module.css';
import HeadParams from '../components/atoms/HeadParams';
import Link from 'next/link';
import Layout from '../components/layout';

export default function Home() {
    return (
        <>
            <HeadParams
                title = "Calculadora de sueldo bruto a neto"
                description = "Calcula tu sueldo bruto a neto con varias opciones y consideraciones."
                />

            <Layout>
                <div className={styles.siteContainer}>
                    <h3 className={styles.text_accent_pink}>Calculadora de sueldo bruto a neto</h3>
                    <p className={styles.noMargin}>Aún no finalizado, disculpas.</p>
                </div>
            </Layout>
        </>
    )
}
