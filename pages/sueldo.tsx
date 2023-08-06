import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import HeadParams from '../components/atoms/HeadParams';
import Link from 'next/link';
import Layout from '../components/layout';

export default function Impuestos() {
    const [amount, setAmount] = useState(0);
    const [sindicate, setSindicate] = useState(0);
    const [netAmount, setNetAmount] = useState(0);
    const [totalDeduction, setTotalDeduction] = useState(0);
    const [pamiDeduction, setPamiDeduction] = useState(0);
    const [incomeDeduction, setIncomeDeduction] = useState(0);
    const [retirementDeduction, setRetirementDeduction] = useState(1);
    const [socialDeduction, setSocialDeduction] = useState(0);
    const [sindicateDeduction, setSindicateDeduction] = useState(0);
    
    const minIncomeTaxable = 700875;

    useEffect(() => {
        let workingAmount = amount;

        let retirement = workingAmount * 0.11;
        let social = workingAmount * 0.03;
        let pami = workingAmount * 0.03;
        let sind = workingAmount * (sindicate * 0.01);

        let workingIncomeTax = 0;

        // Begins thief simulator (AKA income tax logic)
        if (workingAmount > minIncomeTaxable) {
            let bruteAnualAmount = amount * 13; // 1 more month because of aguinaldo
            bruteAnualAmount -= bruteAnualAmount * 0.17; // remove basic taxes

            // TODO:
            // - Relación de dependencia
            // - Autonomos

            let taxableAmount = amount - minIncomeTaxable;

            if (taxableAmount > 2781353) {
                workingIncomeTax = 620590;
                workingIncomeTax += taxableAmount * 0.35;
            }
            else if (taxableAmount > 2086016) {
                workingIncomeTax = 405035;
                workingIncomeTax += taxableAmount * 0.31;
            }
            else if (taxableAmount > 1390677) {
                workingIncomeTax = 217035;
                workingIncomeTax += taxableAmount * 0.27;
            }
            else if (taxableAmount > 1043008) {
                workingIncomeTax = 137330;
                workingIncomeTax += taxableAmount * 0.23;
            }
            else if (taxableAmount > 695339) {
                workingIncomeTax = 71272;
                workingIncomeTax += taxableAmount * 0.19;
            }
            else if (taxableAmount > 521504) {
                workingIncomeTax = 45197;
                workingIncomeTax += taxableAmount * 0.15;
            }
            else if (taxableAmount > 347670) {
                workingIncomeTax = 24337;
                workingIncomeTax += taxableAmount * 0.12;
            }
            else if (taxableAmount > 173843) {
                workingIncomeTax = 8691;
                workingIncomeTax += taxableAmount * 0.9;
            }
            else {
                workingIncomeTax = 0;
                workingIncomeTax += taxableAmount * 0.5;
            }
        }
        
        let workingDeductions = retirement + social + pami + sind;
        
        let workingNetAmount = workingAmount - workingDeductions;

        setPamiDeduction(pami);
        setRetirementDeduction(retirement);
        setSocialDeduction(social);
        setSindicateDeduction(sind);
        setIncomeDeduction(workingIncomeTax);

        setTotalDeduction(workingDeductions);
        setNetAmount(workingNetAmount);
    }, [amount, sindicate]);

    function updateAmount() {
        let number = parseFloat((document.getElementById('amount') as HTMLInputElement).value);
        if (isNaN(number) || !isFinite(number))
            number = 0;

        setAmount(number);
    }

    function updateSindicate() {
        let number = parseFloat((document.getElementById('sindicate') as HTMLInputElement).value);
        if (isNaN(number) || !isFinite(number))
            number = 0;

        setSindicate(number);
    }

    return (
        <>
            <HeadParams
                title = "Calculadora de sueldo bruto a neto"
                description = 'Calcular sueldo bruto a sueldo "en mano" con varias opciones y consideraciones.'
                />

            <Layout>
                <div className={styles.siteContainer}>
                    <h3 className={styles.text_accent_pink}>Calculadora de sueldo bruto a neto</h3>
                    <div className={styles.flexContainer}>
                        <div className={styles.flexBox}>
                            <div style={{textAlign: 'center'}}>
                                <label>
                                    Sueldo bruto en pesos:
                                    <input 
                                        id="amount" placeholder="Sueldo bruto en pesos" type="number" pattern="[0-9]+([\.,][0-9]+)?" step="0.01" 
                                        onChange={() => { updateAmount() }} 
                                        required
                                        min={0} 
                                        className={styles.input} 
                                        title="Numero con no mas de 2 decimales."
                                        />
                                </label>
                                <label>
                                    Porcentaje a sindicato<br/>
                                    <small>(Dejar vacio si no aplica)</small>
                                    <input 
                                        id="sindicate" placeholder="% sindicato" type="number" pattern="[0-9]+([\.,][0-9]+)?" step="0.1" 
                                        onChange={() => { updateSindicate() }} 
                                        required
                                        min={0} 
                                        className={styles.input} 
                                        title="Numero con no mas de 2 decimales."
                                        />
                                </label>
                            </div>
                        </div>
                        <div className={styles.flexBox}>
                            <h2 style={{textAlign: 'center'}}>Sueldo neto: AR${netAmount.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</h2>
                            <div>
                                <p>
                                Impuestos: <span className={styles.money}>AR${totalDeduction.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span><br />
                                </p>
                                <small>
                                    <ul>
                                        <li>Jubilación <span className={styles.money}>AR${retirementDeduction.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> <b>(11%)</b></li>
                                        <li>Obra social <span className={styles.money}>AR${socialDeduction.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> <b>(3%)</b></li>
                                        <li>Aporte PAMI <span className={styles.money}>AR${pamiDeduction.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> <b>(3%)</b></li>
                                        <li>Imp. ganancias <span className={styles.money}>AR${incomeDeduction.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span> <b>(variable)</b></li>
                                        <li>Aporte sindicato <span className={styles.money}>AR${sindicateDeduction.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span></li>
                                    </ul>
                                </small>
                            </div>
                        </div>
                        <div className={styles.flexBox} style={{marginTop: '1rem'}}>
                            <p className={styles.smallHeader}>¿Que tan exacto es el resultado?</p>
                            <p>
                                <small>
                                    Es aproximado. Mayormente porque calcular el impuesto a la ganancia tiene varias condicionales e inconsistencias. 
                                    Esta calculadora aproxima el sueldo para un caso "generico", sin hijos ni conyugue legal.
                                </small>
                            </p>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
