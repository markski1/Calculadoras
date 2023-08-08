import styles from '../styles/Home.module.css';
import HeadParams from '../components/atoms/HeadParams';
import Layout from '../components/layout';

export default function Impuestos() {
    return (
        <>
            <HeadParams
                title = "Colaborar"
                description = "Colaborar con Calculando Argentina"
                />

            <Layout>
                <div className={styles.siteContainer}>
                    <div style={{margin: '.5rem 1rem'}}>
                        <h3 className={styles.text_accent_pink}>Colaborar</h3>
                        <p>
                            <span className={styles.text_accent}>Calculando Argentina</span> es una aplicación web 100% gratuita, mantenida por una sola persona.
                        </p>
                        <p>
                            Si bien el costo monetario del sitio no es alto, tiene tambien otro costo, en la forma de tiempo personal, para desarrollar y mantener el sitio en correcto funcionamiento y con datos actualizados.<br />
                        </p>
                        <p>
                            Si queres, y podes, las donaciones siempre son bienvenidas. No importa la cantidad, por mas chica que sea, todo suma para cubrir los costos de la pagina y ayudar a que el trabajo valga la pena.
                        </p>
                        <p>
                            Metodos:
                        </p>
                        <ul>
                            <li><b>Transferencia</b>: Desde cualquier banco o billetera, podes transferir al alias "<span className={styles.text_accent_subtle}>markski</span>".</li>
                            <li><b>MercadoPago o Tarjeta</b>: A traves de <a href="https://cafecito.app/Markski" className={styles.text_accent_subtle}>Cafecito</a>.</li>
                            <li><b>PayPal</b>: A traves de <a href="https://ko-fi.com/Markski" className={styles.text_accent_subtle}>Ko-Fi</a>.</li>
                        </ul>
                    </div>
                    
                </div>
            </Layout>
        </>
    )
}
