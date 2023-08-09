import styles from '../styles/Home.module.css';
import HeadParams from '../components/atoms/HeadParams';
import Link from 'next/link';
import Layout from '../components/layout';

export default function Home() {
    return (
        <>
            <HeadParams
                title = "Bienvenido"
                description = "Colección de calculadores utiles para la Republica Argentina"
                />

            <Layout home>
                <Link href="impuestos" className={styles.card}>
                    <h3>Impuestos de tarjeta</h3>
                    <p>Calculo de impuestos para pagos con tarjeta hacia el exterior, con convertor de divisas.</p>
                </Link>

                <Link href="sueldo" className={styles.card}>
                    <h3>Sueldo en mano</h3>
                    <p>Calculo de sueldo bruto a sueldo neto, con varias opciones y consideraciones.</p>
                </Link>

                <Link href="plazo-fijo" className={styles.card}>
                    <h3>Plazo fijo</h3>
                    <p>Calculo de rendimiento de plazo fijo, dando capital, interes y dias.</p>
                </Link>

                <Link href="/" className={styles.card}>
                    <h3>Mas por venir...</h3>
                    <p>Voy a ir agregando calculadoras a medida que tenga tiempo.</p>
                </Link>
            </Layout>
        </>
    )
}
