import { useState, useEffect } from 'react';
import styles from '../styles/Home.module.css';
import HeadParams from '../components/atoms/HeadParams';
import Link from 'next/link';
import Layout from '../components/layout';

export default function Impuestos() {
    // INCOME TAX BRACKET BASES
	const incomeTaxBases =       [2781353, 2086016, 1390677, 1043008, 695339, 521504, 347670, 173843, 0]; // Contains the bases for income tax brackets
    const incomeTaxMins =        [620590,  405035,  217035,  137330,  71272,  45197,  24337,  8691,   0]; // Contains the base payment per bracket
    const incomeTaxPercentages = [35,      31,      27,      23,      19,     15,     12,     9,      5]; // Contains the percentage past base payment per bracket


    // MINIMUM INCOME FOR APPLYING TAX
    const minIncomeTaxable = 700875;
    const minIncrementalDeduction = 808101;

    // TODO: Incremental deduction array.

    // SPECIAL DEDUCTIONS
    const nonImpossableEarnings = 451683.19 / 12;
    const autonomousDeduction = 1580891.18 / 12;
    const dependenceDeduction = 2168079.35 / 12;
    const marriedDeduction = 421088.24 / 12;
    const childDeduction = 212356.37 / 12;

    

    const [amount, setAmount] = useState(0);
    const [sindicate, setSindicate] = useState(0);
    const [dependence, setDependence] = useState(true);
    const [married, setMarried] = useState(false);
    const [children, setChildren] = useState(0);
    const [netAmount, setNetAmount] = useState(0);
    const [totalDeduction, setTotalDeduction] = useState(0);
    const [pamiDeduction, setPamiDeduction] = useState(0);
    const [incomeDeduction, setIncomeDeduction] = useState(0);
    const [retirementDeduction, setRetirementDeduction] = useState(1);
    const [socialDeduction, setSocialDeduction] = useState(0);
    const [sindicateDeduction, setSindicateDeduction] = useState(0);
    

    useEffect(() => {
        let retirement = amount * 0.11;
        let social = amount * 0.03;
        let pami = amount * 0.03;
        let sind = amount * (sindicate * 0.01);

        let workingDeductions = retirement + social + pami + sind;

        let workingIncomeTax = 0;

        // Begin income tax logic
        if (amount > minIncomeTaxable) {
            let taxableAmount = amount - workingDeductions - nonImpossableEarnings;

            taxableAmount *= 13;
            taxableAmount /= 12;

            if (dependence) taxableAmount -= dependenceDeduction;
            else taxableAmount -= autonomousDeduction;
            if (married) taxableAmount -= marriedDeduction;

            taxableAmount -= childDeduction * children;

            for (let i = 0; i < incomeTaxBases.length; i++) {
                if (taxableAmount > incomeTaxBases[i] / 12) {
                    workingIncomeTax = incomeTaxMins[i] / 12;
                    workingIncomeTax += (taxableAmount - incomeTaxBases[i] / 12) * (incomeTaxPercentages[i] * 0.01);

                    break;
                }
            }
        }

        workingDeductions += workingIncomeTax;
        
        let workingNetAmount = amount - workingDeductions;

        setPamiDeduction(pami);
        setRetirementDeduction(retirement);
        setSocialDeduction(social);
        setSindicateDeduction(sind);
        setIncomeDeduction(workingIncomeTax);

        setTotalDeduction(workingDeductions);
        setNetAmount(workingNetAmount);
    }, [amount, sindicate, dependence, married, children]);

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

    function updateMarried() {
        setMarried( (document.getElementById('married') as HTMLInputElement).checked );
    }
    
    function updateChildren() {
        let number = parseFloat((document.getElementById('children') as HTMLInputElement).value);
        if (isNaN(number) || !isFinite(number))
            number = 0;

        setChildren(number);
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
                title = "Calculadora de sueldo neto"
                description = 'Calcular sueldo bruto a sueldo "en mano" con varias opciones y consideraciones.'
                />

            <Layout>
                <div className={styles.siteContainer}>
                    <div style={{margin: '.5rem 1rem'}}>
                        <h3 className={styles.text_accent_pink}>Calculadora de sueldo bruto a neto</h3>
                        <p>Actualizado Agosto 2023</p>
                    </div>
                    <div className={styles.flexContainer}>
                        <div className={styles.flexBox}>
                            <div style={{textAlign: 'center'}}>
                                <label>
                                    Sueldo bruto en pesos:
                                    <input 
                                        placeholder="Sueldo bruto en pesos" type="number" pattern="[0-9]+([\.,][0-9]+)?" step="0.01" 
                                        id="amount"
                                        onChange={() => { updateAmount() }} 
                                        min={0} 
                                        className={styles.input} 
                                        title="Numero con no mas de 2 decimales."
                                        />
                                </label>
                                <label>
                                    Porcentaje a sindicato<br/>
                                    <small>(Dejar vacio si no aplica)</small>
                                    <input 
                                        placeholder="% sindicato" type="number" pattern="[0-9]+([\.,][0-9]+)?" step="0.1" 
                                        id="sindicate"
                                        onChange={() => { updateSindicate() }} 
                                        min={0} 
                                        className={styles.input} 
                                        title="Numero con no mas de 2 decimales."
                                        />
                                </label>
                                <label>
                                    Hijos menores de 18<br/>
                                    <small>(Dejar vacio si no aplica)</small>
                                    <input 
                                        placeholder="Cantidad de hijos." type="number" pattern="[0-9]+([\.,][0-9]+)?" step="1" 
                                        id="children"
                                        onChange={() => { updateChildren() }} 
                                        min={0} 
                                        className={styles.input} 
                                        title="Cantidad de hijos."
                                        />
                                </label>
                                <div className={styles.toMargin}>
                                    <p>
                                        <input 
                                            id="married" type="checkbox" 
                                            onChange={() => { updateMarried() }} 
                                            className={styles.checkbox} 
                                            title="Conyugue a cargo."
                                            />
                                        Conyugue a cargo
                                    </p>
                                    <p>
                                        <input 
                                            id="married" type="radio" 
                                            name="dependence"
                                            checked={dependence === true}
                                            onClick={() => { setDependence(true) }} 
                                            className={styles.checkbox} 
                                            title="Relación de dependencia"
                                            />
                                        Relación de dependencia
                                    </p>
                                    <p>
                                        <input 
                                            id="married" type="radio" 
                                            name="dependence"
                                            checked={dependence === false}
                                            onClick={(e) => { setDependence(false); }} 
                                            className={styles.checkbox} 
                                            title="Autonomo"
                                            />
                                        Autonomo
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className={styles.flexBox}>
                            <h2 style={{textAlign: 'center'}}>Sueldo neto: {parseToPesos(netAmount)}</h2>
                            <div>
                                <p>
                                Impuestos: {parseToPesos(totalDeduction)}<br />
                                </p>
                                <small>
                                    <ul>
                                        <li>Jubilación {parseToPesos(retirementDeduction)} <b>(11%)</b></li>
                                        <li>Obra social {parseToPesos(socialDeduction)} <b>(3%)</b></li>
                                        <li>Aporte PAMI {parseToPesos(pamiDeduction)} <b>(3%)</b></li>
                                        <li>Imp. ganancias {parseToPesos(incomeDeduction)} <b>(variable)</b></li>
                                        <li>Aporte sindicato {parseToPesos(sindicateDeduction)}</li>
                                    </ul>
                                </small>
                                <p>Todos los resultados son aproximados.</p>
                                <div style={{backgroundColor: '#FF000011', padding: '1rem', borderRadius: '8px'}}>
                                    <small>
                                        No estan disponibles aún las deduciones especiales para sueldos menores de $808,101.
                                    </small>
                                    <br />
                                    <small>
                                        Por lo tanto, si tu sueldo bruto esta entre {parseToPesos(minIncomeTaxable, false)} y {parseToPesos(minIncrementalDeduction, false)}, la calculadora muestra mas ganancia de lo que pagaras en realidad.
                                    </small>
                                </div>
                            </div>
                        </div>
                        <div className={styles.flexBox}>
                            <p className={styles.smallHeader}>Información</p>
                            <p>Respecto ganancias, la calculadora considera:</p>
                            <small>
                                <ul>
                                    <li>Sueldos mayores a {parseToPesos(minIncomeTaxable, false)} pagan ganancias.</li>
                                    <li>Sueldos menores a {parseToPesos(minIncrementalDeduction, false)} tienen un descuento incremental.</li>
                                    <li>Personas en relación de dependencia tienen deduccion de {parseToPesos(dependenceDeduction, false)}.</li>
                                    <li>Autonomos, en cambio, tienen deduccion de {parseToPesos(autonomousDeduction, false)}.</li>
                                    <li>Personas con conyugues que no facturen, tienen deduccion de {parseToPesos(marriedDeduction, false)}.</li>
                                    <li>Por hijo menor de 18 años, deducen {parseToPesos(childDeduction, false)}.</li>
                                </ul>
                            </small>
                        </div>
                    </div>
                </div>
            </Layout>
        </>
    )
}
