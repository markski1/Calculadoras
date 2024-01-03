import { useState, useEffect } from 'react';
import styles from '../styles/Custom.module.css';
import HeadParams from '../components/atoms/HeadParams';
import Link from 'next/link';
import Layout from '../components/layout';
import PageHeader from '../components/atoms/PageHeader';

export default function Sueldo() {
    // INCOME TAX BRACKET BASES
	const incomeTaxBases =       [2781353, 2086016, 1390677, 1043008, 695339, 521504, 347670, 173843, 0]; // Contains the bases for income tax brackets
    const incomeTaxMins =        [620590,  405035,  217035,  137330,  71272,  45197,  24337,  8691,   0]; // Contains the base payment per bracket
    const incomeTaxPercentages = [35,      31,      27,      23,      19,     15,     12,     9,      5]; // Contains the percentage past base payment per bracket

    // SPECIAL DEDUCTION ARRAYS
    // This looks HORRIBLE, but it's not my fault.
    // It's how it works. Don't believe me? https://www.afip.gob.ar/gananciasYBienes/ganancias/personas-humanas-sucesiones-indivisas/deducciones/documentos/Deduccion_especial_incrementada_agosto_2023.pdf
    const specialDeductionBases = [701316, 701785, 702253, 702718, 703186, 703655, 704119, 704588, 705054, 705523, 705991, 706456, 706924, 707392, 707857, 708326, 708792, 709261, 709729, 710194, 710662, 711130, 711595, 712064, 712530, 712998, 713467, 713932, 714400, 714868, 715333, 715801, 716268, 716736, 717205, 717669, 718138, 718606, 719071, 719539, 720006, 720474, 720942, 721407, 721876, 722344, 722809, 723277, 723744, 724212, 724680, 725145, 725614, 726082, 726547, 727015, 727482, 727950, 728418, 728883, 729351, 729820, 730285, 730753, 731219, 731688, 732156, 732621, 733089, 733558, 734022, 734491, 734957, 735426, 735894, 736359, 736827, 737295, 737760, 738229, 738695, 739164, 739632, 740097, 740565, 741033, 741498, 741966, 742433, 742901, 743370, 743835, 744303, 744771, 745236, 745704, 746171, 746639, 747108, 747572, 748041, 748509, 748974, 749442, 749909, 750377, 750845, 751310, 751779, 752247, 752712, 753180, 753647, 754115, 754583, 755048, 755516, 755985, 756450, 756918, 757385, 757853, 758321, 758786, 759254, 759723, 760188, 760656, 761122, 761591, 762059, 762524, 762992, 763461, 763925, 764394, 764860, 765329, 765797, 766262, 766730, 767198, 767663, 768132, 768598, 769066, 769535, 770000, 770468, 770936, 771401, 771869, 772336, 772804, 773273, 773738, 774206, 774674, 775139, 775607, 776074, 776542, 777011, 777475, 777944, 778412, 778877, 779345, 779812, 780280, 780747, 781213, 781682, 782146, 782615, 783083, 783550, 784018, 784486, 784951, 785419, 785884, 786353, 786821, 787288, 787756, 788224, 788689, 789157, 789622, 790090, 790559, 791025, 791494, 791962, 792427, 792895, 793360, 793828, 794297, 794763, 795232, 795700, 796165, 796633, 797098, 797566, 798035, 798501, 798969, 799438, 799903, 800371, 800836, 801304, 801772, 802239, 802707, 803176, 803640, 804109, 804574, 805042, 805510, 805977, 806445, 806914, 807378, 807847, 808341]
    const specialDeductionAmounts = [359613, 356488, 353639, 350973, 348400, 345916, 343520, 341164, 338868, 336606, 334382, 332209, 330051, 327921, 325832, 323751, 321701, 319663, 317644, 315659, 313675, 311708, 309770, 307832, 305915, 304003, 302105, 300232, 298357, 296493, 294653, 292809, 290982, 289158, 287342, 285549, 283751, 281962, 280193, 278420, 276660, 274901, 273149, 271417, 269678, 267947, 266234, 264515, 262809, 261102, 259400, 257717, 256027, 254343, 252676, 251002, 249339, 247675, 246016, 244373, 242724, 241079, 239450, 237814, 236188, 234561, 232937, 231330, 229715, 228103, 226508, 224904, 223311, 221715, 220122, 218545, 216960, 215379, 213812, 212237, 210672, 209103, 207539, 205988, 204430, 202874, 201333, 199784, 198243, 196700, 195160, 193633, 192099, 190567, 189049, 187522, 186004, 184483, 182965, 181460, 179947, 178436, 176939, 175433, 173936, 172435, 170936, 169452, 167958, 166466, 164988, 163502, 162023, 160540, 159060, 157593, 156118, 154644, 153184, 151714, 150252, 148787, 147324, 145874, 144415, 142957, 141513, 140060, 138614, 137164, 135717, 134282, 132838, 131396, 129967, 128529, 127098, 125663, 124230, 122809, 121380, 119952, 118537, 117112, 115695, 114274, 112855, 111448, 110032, 108617, 107215, 105803, 104399, 102991, 101584, 100190, 98786, 97384, 95994, 94595, 93203, 91807, 90413, 89030, 87638, 86248, 84870, 83482, 82102, 80717, 79338, 77962, 76582, 75213, 73835, 72459, 71089, 69715, 68343, 66982, 65612, 64254, 62886, 61520, 60161, 58797, 57435, 56084, 54724, 53376, 52018, 50662, 49312, 47959, 46606, 45265, 43915, 42576, 41228, 39881, 38541, 37196, 35853, 34521, 33180, 31850, 30511, 29173, 27841, 26506, 25171, 23848, 22515, 21194, 19864, 18535, 17211, 15884, 14558, 13243, 11919, 10606, 9284, 7963, 6648, 5329, 4011, 2704, 1388, 0]

    // BRUTE SALARY ABOVE THIS PAY INCOME TAX
    const minIncomeTaxable = 700875;
    // BRUTE SALARY BELOW THIS HAS SPECIAL DEDUCTIONS
    const minIncrementalDeduction = 808101;

    const maximumImpossableBase = 776478.32;

    // SPECIAL DEDUCTIONS
    // All values are yearly, so divide by 12
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
        let impossableAmount:number;

        if (amount > maximumImpossableBase) {
            impossableAmount = maximumImpossableBase;
        }
        else {
            impossableAmount = amount;
        }

        let retirement = impossableAmount * 0.11;
        let social = impossableAmount * 0.03;
        let pami = impossableAmount * 0.03;

        let sind = amount * (sindicate * 0.01);

        let workingDeductions = retirement + social + pami + sind;

        let workingIncomeTax = 0;

        /*
        // Begin income tax logic
        if (amount > minIncomeTaxable) {
            // Take brute salary, remove the fixed dedutions from above, and the non-impossable earnings deduction
            let taxableAmount = amount - workingDeductions - nonImpossableEarnings;

            // multiply by 13 to get SAC values, then down to 12 to go back to monthly
            taxableAmount *= 13;
            taxableAmount /= 12;
            
            // Workers in dependence relation get one type of deduction
            if (dependence) taxableAmount -= dependenceDeduction;
            else taxableAmount -= autonomousDeduction; // Autonomous workers get a smaller deduction
            
            // People who're married get a deduction
            if (married) taxableAmount -= marriedDeduction;

            // Per every children below the age of 18, there's a deduction.
            taxableAmount -= childDeduction * children;

            // Incremental deduction below a certain point.
            if (amount < minIncrementalDeduction) {
                let deductionLength = specialDeductionBases.length;
                for (let i = 0; i < deductionLength; i++) {
                    if (specialDeductionBases[i] > amount) {
                        taxableAmount -= specialDeductionAmounts[i];
                        break;
                    }
                }
            }

            // use the incomeTax* arrays at the top of the file to calculate the tax.
            for (let i = 0; i < incomeTaxBases.length; i++) {
                if (taxableAmount > incomeTaxBases[i] / 12) {
                    workingIncomeTax = incomeTaxMins[i] / 12;
                    workingIncomeTax += (taxableAmount - incomeTaxBases[i] / 12) * (incomeTaxPercentages[i] * 0.01);

                    break;
                }
            }
        }
        */

        // It is possible for salaries which are barely high enough to enter income tax territory
        // to have enough deductions to go below. In that case, no tax is paid.
        if (workingIncomeTax < 0) workingIncomeTax = 0;

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
                    <PageHeader>
                        <h3 className={styles.text_accent_pink}>Calculadora de sueldo bruto a neto</h3>
                        <p>Actualizado Agosto 2023</p>
                    </PageHeader>
                    <div className={styles.flexContainer}>
                        <div className={styles.flexBox} style={{userSelect: 'none'}}>
                            <div style={{textAlign: 'center'}}>
                                <label>
                                    Sueldo bruto en pesos:
                                    <input 
                                        placeholder="Sin comas ni puntos" type="number" step="1" 
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
                                        placeholder="% sindicato" type="number" step="0.1" 
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
                                        placeholder="Cantidad de hijos." type="number" step="1" 
                                        id="children"
                                        onChange={() => { updateChildren() }} 
                                        min={0} 
                                        className={styles.input} 
                                        title="Cantidad de hijos."
                                        />
                                </label>
                                <div className={styles.toMargin}>
                                    <label><p>
                                        <input 
                                            id="married" type="checkbox" 
                                            onChange={() => { updateMarried() }} 
                                            className={styles.checkbox} 
                                            title="Conyugue a cargo."
                                            />
                                        Conyugue a cargo
                                    </p></label>
                                    <label><p>
                                        <input 
                                            id="married" type="radio" 
                                            name="dependence"
                                            checked={dependence === true}
                                            onClick={() => { setDependence(true) }} 
                                            className={styles.checkbox} 
                                            title="Relación de dependencia"
                                            />
                                        Relación de dependencia
                                    </p></label>
                                    <label><p>
                                        <input 
                                            id="married" type="radio" 
                                            name="dependence"
                                            checked={dependence === false}
                                            onClick={() => { setDependence(false); }} 
                                            className={styles.checkbox} 
                                            title="Autonomo"
                                            />
                                        Autonomo
                                    </p></label>
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
                                        <li>Aporte sindical {parseToPesos(sindicateDeduction)} <b>({sindicate}%)</b></li>
                                        <li>Imp. ganancias {parseToPesos(incomeDeduction)} <b>(variable)</b></li>
                                    </ul>
                                </small>
                                <p>Todos los resultados son aproximados.</p>
                            </div>
                        </div>
                        <div className={styles.flexBox} style={{userSelect: 'none'}}>
                            <p className={styles.smallHeader}>Información</p>
                            <p>Consideraciones tomadas implicitamente por la calculadora:</p>
                            <small>
                                <ul>
                                    <li>Aportes fijos son sobre un maximo imponible de {parseToPesos(maximumImpossableBase, false)}</li>
                                    <li>ACTUALMENTE DESHABILITADO IMP. GANANCIA</li>
                                    <li>Sueldos mayores a {parseToPesos(minIncomeTaxable, false)} pagan ganancias.</li>
                                    <li>Sueldos menores a {parseToPesos(minIncrementalDeduction, false)} tienen una <a className={styles.text_accent_subtle} href="https://www.afip.gob.ar/gananciasYBienes/ganancias/personas-humanas-sucesiones-indivisas/deducciones/documentos/Deduccion_especial_incrementada_agosto_2023.pdf">deducción especial incremental</a>.</li>
                                    <li>Personas en relación de dependencia tienen deduccion de {parseToPesos(dependenceDeduction, false)}.</li>
                                    <li>Autonomos, en cambio, tienen deduccion de {parseToPesos(autonomousDeduction, false)}.</li>
                                    <li>Personas con conyugues que no facturen, tienen deduccion de {parseToPesos(marriedDeduction, false)}.</li>
                                    <li>Por hijo menor de 18 años, se deducen {parseToPesos(childDeduction, false)}.</li>
                                </ul>
                                Todos los valores son mensuales.
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
