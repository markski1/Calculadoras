import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import HeadParams from '../components/atoms/HeadParams';
import Link from 'next/link';
import Layout from '../components/layout';

export default function Impuestos() {
    // - Contains the percentage of taxes per province.
	//                     N/A  CABA  CHACO  CRDB  LPMP  NEUQ  RNGR  SALTA  TDF
	const provincePercentage = [0.0, 0.02, 0.055, 0.03, 0.01, 0.03, 0.05, 0.036, 0.0];

    const afipPercentage = 45;
    const paisPercentage = 8;
    const digitalServicePercent = 21;

    // input states
    const [currencies, setCurrencies] = useState<{ eur: number; usd: number; brs: number; }>({ eur: -1, usd: -1, brs: -1 });
    const [amount, setAmount] = useState(0);
    const [currency, setCurrency] = useState(1);
    const [province, setProvince] = useState(0);

    // display states
    const [displayAmount, setDisplayAmount] = useState(0);
    const [total, setTotal] = useState(0);
    const [totalTaxes, setTotalTaxes] = useState(0);
    const [digitalServiceTaxDisplay, setDigitalServiceTaxDisplay] = useState(0);
    const [perceptionTaxDisplay, setPerceptionTaxDisplay] = useState(0);
    const [paisTaxDisplay, setPaisTaxDisplay] = useState(0);
    const [provinceTaxDisplay, setProvinceTaxDisplay] = useState(0);
    const [provincePercent, setProvincePercent] = useState(0);

    async function fetchCurrencies() {
        const response = await fetch("https://snep.markski.ar/monedas.php");
        const data = await response.json();
        setCurrencies(data);
    }

    useEffect(() => {
        fetchCurrencies();
    }, []);

    useEffect(() => {
        let workingAmount:number;

        workingAmount = amount;
        
        if (currency == 2) {
            workingAmount *= currencies.usd;
        }
        if (currency == 3) {
            workingAmount *= currencies.eur;
        }
        if (currency == 4) {
            workingAmount *= currencies.brs;
        }

        if (workingAmount < 0) {
            alert("Perdón, pero esa conversión actualmente no esta funcionando.");
            return;
        }

        let digitalServiceTax:number;

        // Tierra del Fuego does not pay digital service IVA
        if (province == 8) {
            digitalServiceTax = 0;
            document.getElementById("tdf-alert").style.display = 'block';
        }
        else {
            digitalServiceTax = amount * (digitalServicePercent * 0.01);
            document.getElementById("tdf-alert").style.display = 'none';
        }
        
        let AFIP = workingAmount * (afipPercentage * 0.01);
        let PAIS = workingAmount * (paisPercentage * 0.01);
        let provincePercent = 0.0;
        
        if (province > 0) {
            provincePercent = workingAmount * provincePercentage[province];
        }
        
        let workingTotalTaxes = AFIP + PAIS + provincePercent + digitalServiceTax;

        setPerceptionTaxDisplay(AFIP);
        setProvinceTaxDisplay(provincePercent);
        setDigitalServiceTaxDisplay(digitalServiceTax);
        setPaisTaxDisplay(PAIS);
        setProvincePercent(provincePercentage[province] * 100);
        
        setTotalTaxes(workingTotalTaxes);
        setDisplayAmount(workingAmount);
        setTotal(workingAmount + workingTotalTaxes);
    }, [amount, currency, province]);

    function updateAmount() {
        let number = parseFloat((document.getElementById('amount') as HTMLInputElement).value);
        if (isNaN(number) || !isFinite(number))
            number = 0;

        setAmount(number);
    }

    function updateCurrency() {
        let number = parseFloat((document.getElementById('currency') as HTMLInputElement).value);
        if (isNaN(number) || !isFinite(number))
            number = 1;
        
        setCurrency(number);
    }

    function updateProvince() {
        let number = parseFloat((document.getElementById('province') as HTMLInputElement).value);
        if (isNaN(number) || !isFinite(number) || number < 0)
            number = 0;

        setProvince(number);
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

    return (
        <>
            <HeadParams
                title = "Calculadora de pagos al exterior Argentina"
                description = "Calcula impuestos de pagos al exterior con tarjeta, para Steam, Netflix, Spotify, Epic Games, etc."
                />

            <Layout>
                <div className={styles.siteContainer}>
                    <div style={{margin: '.5rem 1rem'}}>
                        <h3 className={styles.text_accent_pink}>Calculadora de impuestos al exterior</h3>
                        <p className={styles.noMargin}>Calcula pagos al exterior con tarjeta. Aplica a Steam, Netflix, Google, etc.</p>
                    </div>
                    <div className={styles.flexContainer}>
                        <div className={styles.flexBox}>
                            <div style={{textAlign: 'center'}}>
                                <label>
                                    Cantidad de dinero
                                    <input 
                                        id="amount" placeholder="Sin comas ni puntos" type="number" pattern="[0-9]+([\.,][0-9]+)?" step="0.01" 
                                        onChange={() => { updateAmount() }} 
                                        required
                                        min={0} 
                                        className={styles.input} 
                                        title="Numero con no mas de 2 decimales."
                                        />
                                </label>
                                <label>
                                    Moneda
                                    <select onChange={() => { updateCurrency() }} title="Tipo de moneda" defaultValue={1} className={styles.input} id="currency">
                                        <option value={1}>AR$</option>
                                        <option value={2}>USD</option>
                                        <option value={3}>EUR</option>
                                        <option value={4}>BR$</option>
                                    </select>
                                </label>
                                <label>
                                    Provincia
                                    <select onChange={() => { updateProvince() }} title="Provincia" defaultValue={0} className={styles.input} id="province">
                                        <option value={0}>Provincia</option>
                                        <option value={1}>Buenos Aires o CABA</option>
                                        <option value={2}>Chaco</option>
                                        <option value={3}>Cordoba</option>
                                        <option value={4}>La Pampa</option>
                                        <option value={5}>Neuquén</option>
                                        <option value={6}>Rio Negro</option>
                                        <option value={7}>Salta</option>
                                        <option value={8}>Tierra del Fuego</option>
                                        <option value={-1}>Ninguna de las anteriores</option>
                                    </select>
                                </label>
                            </div>
                        </div>
                        <div className={styles.flexBox}>
                            <h2 style={{textAlign: 'center'}}>Total: AR${parseToPesos(total)}</h2>
                            <div>
                                <p>
                                    En la compra: <span className={styles.money}>AR${parseToPesos(displayAmount)}</span><br />
                                    En impuestos: <span className={styles.money}>AR${parseToPesos(totalTaxes)}</span>
                                </p>
                                <small>
                                    <ul>
                                        <li>IVA Servicios Digitales <span className={styles.money}>AR${parseToPesos(digitalServiceTaxDisplay)}</span> <b>(21%)</b> <span id="tdf-alert" style={{display: 'none'}}>* Tiera del Fuego no lo paga</span></li>
                                        <li>Percepción RG AFIP 4815 <span className={styles.money}>AR${parseToPesos(perceptionTaxDisplay)}</span> <b>(45%)</b></li>
                                        <li>Ley impuesto PAIS <span className={styles.money}>AR${parseToPesos(paisTaxDisplay)}</span> <b>(8%)</b></li>
                                        <li>Impuestos provinciales <span className={styles.money}>AR${parseToPesos(provinceTaxDisplay)}</span> <b>(<span id="impuestlol">{provincePercent}</span>%)</b></li>
                                    </ul>
                                </small>
                            </div>
                        </div>
                        <div className={styles.flexBox}>
                            <p className={styles.smallHeader}>¿Que tan exacto es el resultado?</p>
                            <small>
                                <p>
                                    Con pesos suele ser exacto.<br />
                                    En otra divisa, es posible que tu banco use otra convercion.
                                </p>
                                <p>
                                    Se asume un caso común. Recomiendo <a className={styles.money} href="https://www.mercadopago.com.ar/ayuda/pagos-en-moneda-extranjera_4063">revisar esta guia</a>.
                                </p>
                            </small>
                            <p className={styles.smallHeader}>¿Que es el dolar Qatar/Turista?</p>
                            <small>
                                <p>
                                    Un impuesto que se comienza a aplicar al superar los $300 USD en pagos al exterior en un mes. Se aplica retroactivamente en el momento que se supere el monto, y dejaras de pagarlo solo al siguiente mes.
                                </p>
                                <p>
                                    A valor actual, aplicado a 300 dolares, sería de {parseToPesos(300 * currencies.usd * 0.25)}.
                                </p>
                            </small>
                        </div>
                        <div className={styles.flexBox} style={{flexBasis: '49%', flex: '2', minWidth: '15rem'}}>
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
