import { useState, useEffect } from 'react';
import styles from '../styles/Custom.module.css';
import HeadParams from '../components/atoms/HeadParams';
import Link from 'next/link';
import Layout from '../components/layout';
import PageHeader from '../components/atoms/PageHeader';

export default function Cuenta() {
    let peopleArray = [ {name: String, spent: Number} ];

    // display states
    const [displayPeople, setDisplayPeople] = useState( <p>Nadie agregado aún.</p> );
    const [peopleUpdated, setPeopleUpdated] = useState(0);

    useEffect(() => {
        
    }, [peopleUpdated]);

    function parseToPesos(pesosAmount: number, cents: boolean = true) {
		return (
			<span className={styles.money}>
				$
				{cents && pesosAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })
                       || pesosAmount.toLocaleString(undefined, { minimumFractionDigits: 0, maximumFractionDigits: 0 })}
			</span>
		);
	}

    function truncateNum(perc: number) {
        return perc.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 });
    }

    return (
        <>
            <HeadParams
                title = "Calculadora división de cuenta"
                description = "Agrega cuanto gasto cada uno y quien paga la cuenta, y mira cuanto le tiene que dar cada uno al que pago. Restaurants, Cafes, Pedidos, etc..."
                />

            <Layout>
                <div className={styles.siteContainer}>
                    <PageHeader>
                        <h3 className={styles.text_accent_pink}>Calculadora división de cuenta</h3>
                        <label>
                            Gasto total:
                            <input 
                                id="amount" placeholder="Sin comas ni puntos" type="number" pattern="[0-9]+([\.,][0-9]+)?" step="0.1" 
                                required
                                min={0} 
                                className={styles.input} 
                                title="Numero con no mas de 2 decimales."
                                />
                        </label>
                    </PageHeader>
                    <div className={styles.flexContainer}>
                        <div className={styles.flexBox} style={{userSelect: 'none'}}>
                            <form style={{textAlign: 'center'}}>
                                <h3>Agregar persona</h3>
                                <label>
                                    Nombre persona
                                    <input 
                                        id="interest" type="text" placeholder="Anastasio"
                                        required
                                        min={0}
                                        className={styles.input} 
                                        title="Numero con no mas de 2 decimales."
                                        />
                                </label>
                                <label>
                                    Gasto de persona
                                    <input 
                                        id="days" type="number" placeholder="Sin coma ni puntos" step="1" 
                                        required
                                        min={0} 
                                        className={styles.input} 
                                        title="Numero con no mas de 2 decimales."
                                        />
                                </label>
                                <label><p>
                                    <input 
                                        id="pagacuenta" type="checkbox" 
                                        className={styles.checkbox} 
                                        title="Indica si esta persona paga o no la cuenta."
                                        />
                                    Paga la cuenta
                                </p></label>
                                <input type="submit" value="Agregar persona" className={styles.input} />
                            </form>
                        </div>
                        <div className={styles.flexBox}>
                            <h2 style={{textAlign: 'center'}}>Resultados</h2>
                            <div>
                                {displayPeople}
                            </div>
                        </div>
                        <div className={styles.flexBox} style={{userSelect: 'none'}}>
                            <p className={styles.smallHeader}>Instrucciones</p>
                            <small>
                                <p>
                                    Esta calculadora es util para dividir gastos a la hora de pedir comida o pagar una cuenta.
                                </p>
                                <p>
                                    Sensillamente indica el gasto total arriba del todo. Despues, anda agregando persona por persona, cuanto gasto cada uno.
                                </p>
                                <p>
                                    Para las personas que pagan la cuenta directamente, marca el campo "Paga la cuenta".<br />La cuenta total se divide entre ellas, y a las demas se les dira cuanto le tienen que dar a los que pagaron.
                                </p>
                            </small>
                        </div>
                        <div className={styles.flexBox} style={{flexBasis: '49%', flex: '2', minWidth: '15rem', userSelect: 'none'}}>
                            <p className={styles.smallHeader}>Acerca</p>
                            <small>
                                <p>
                                    Las calculadoras en esta pagina son 100% gratuitas.
                                </p>
                                <p>
                                    Si queres, podes <Link href="colaborar" className={styles.text_accent_subtle}>colaborar con su mantenimiento</Link>.
                                </p>
                                <p>
                                    Si encontras algun error o tenes sugerencias, podes contactarme por los metodos listados en mi <a href="https://markski.ar" className={styles.text_accent_subtle}>web personal</a>.
                                </p>
                            </small>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
