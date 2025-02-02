import { useState, useEffect } from 'react';
import styles from '../styles/Custom.module.css';
import HeadParams from '../components/atoms/HeadParams';
import Layout from '../components/layout';
import PageHeader from '../components/atoms/PageHeader';

export default function PlazoFijo() {
    const currentInterestRate = 85;
    const SMMV = 156000;

    // input states
    const [amount, setAmount] = useState(0);
    const [interestRate, setInterestRate] = useState(currentInterestRate);
    const [days, setDays] = useState(30);

    // display states
    const [displayAmount, setDisplayAmount] = useState(0);
    const [displayEarnings, setDisplayEarnings] = useState(0);
    const [displayDaily, setDisplayDaily] = useState(0);
    const [smmvPercentage, setSMMVPercentage] = useState(0);

    useEffect(() => {
        let yearlyEarning = amount * (interestRate * 0.01);
        let dailyEarning = yearlyEarning / 365;

        console.log("Yearly: " + yearlyEarning);
        console.log("Daily: " + yearlyEarning);
        console.log("Days: " + days);

        let periodEarning = dailyEarning * days;
       
        setDisplayDaily(dailyEarning);
        setDisplayEarnings(periodEarning);
        setDisplayAmount(amount + periodEarning);
        setSMMVPercentage(((periodEarning * 100) / SMMV));
    }, [amount, days, interestRate]);

    function updateAmount() {
        let number = parseFloat((document.getElementById('amount') as HTMLInputElement).value);
        if (isNaN(number) || !isFinite(number))
            number = 0;

        setAmount(number);
    }

    function updateRate() {
        let number = parseFloat((document.getElementById('interest') as HTMLInputElement).value);
        if (isNaN(number) || !isFinite(number))
            number = 1;
        
        setInterestRate(number);
    }

    function updateDays() {
        let number = parseFloat((document.getElementById('days') as HTMLInputElement).value);
        if (isNaN(number) || !isFinite(number) || number < 0)
            number = 0;

        setDays(number);
    }

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
                title = "Calculadora de plazo fijo"
                description = "Calcula ganancias de plazos fijos en una cantidad dada de dias, capital e interes."
                />

            <Layout>
                <div className={styles.siteContainer}>
                    <PageHeader>
                        <h3 className={styles.text_accent_pink}>Calculadora de plazo fijo</h3>
                        <p className={styles.noMargin}>Actualizado Agosto 2023</p>
                    </PageHeader>
                    <div className={styles.flexContainer}>
                        <div className={styles.flexBox} style={{userSelect: 'none'}}>
                            <div style={{textAlign: 'center'}}>
                                <label>
                                    Cantidad de dinero
                                    <input 
                                        id="amount" placeholder="Sin comas ni puntos" type="number" step="0.1" 
                                        onChange={() => { updateAmount() }} 
                                        min={0} 
                                        className={styles.input} 
                                        title="Numero con no mas de 2 decimales."
                                        />
                                </label>
                                <label>
                                    % Interes anual
                                    <input 
                                        id="interest" type="number" placeholder={"Actualmente " + currentInterestRate + "%"} step="0.01" 
                                        onChange={() => { updateRate() }} 
                                        min={0}
                                        className={styles.input} 
                                        title="Numero con no mas de 2 decimales."
                                        />
                                </label>
                                <label>
                                    Duración en dias
                                    <input 
                                        id="days" type="number" placeholder={"" + days} step="1" 
                                        onChange={() => { updateDays() }} 
                                        min={0} 
                                        className={styles.input} 
                                        title="Numero con no mas de 2 decimales."
                                        />
                                </label>
                            </div>
                        </div>
                        <div className={styles.flexBox}>
                            <h2 style={{textAlign: 'center'}}>Total al finalizar:<br />{parseToPesos(displayAmount)}</h2>
                            <div>
                                <p>
                                    Ganancia: <span className={styles.money}>{parseToPesos(displayEarnings)}</span>
                                </p>
                                <small>
                                    <p>
                                        El {truncateNum(smmvPercentage)}% de un salario minimo vital y movil ({parseToPesos(SMMV)})
                                    </p>
                                    <p>
                                        Generando {parseToPesos(displayDaily)} por dia.
                                    </p>
                                </small>
                            </div>
                        </div>
                        <div className={styles.flexBox} style={{userSelect: 'none'}}>
                            <p className={styles.smallHeader}>Información</p>
                            <small>
                                <p>
                                    Esto es sencillamente una calculadora, no un aparato de consejos financieros.<br />No aconsejamos ni desaconsejamos los plazos fijos.
                                </p>
                                <p>
                                    Cualquier decision tomada en base a los datos vistos aca es completamente responsabilidad del usuario.
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
