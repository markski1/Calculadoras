import { useState, useEffect } from 'react';
import styles from '../styles/Custom.module.css';
import HeadParams from '../components/atoms/HeadParams';
import Link from 'next/link';
import Layout from '../components/layout';
import PageHeader from '../components/atoms/PageHeader';

export default function Cuenta() {
    // display states
    const [displayPeople, setDisplayPeople] = useState( [] );
    const [peopleList, setPeopleList] = useState( [] );

    useEffect(() => {
        if (peopleList.length < 3) {
            setDisplayPeople( [ <p key={0}>Se mostrara cuando se agreguen {3 - peopleList.length} personas</p> ] );
            return;
        }

        let payDirectly = [];
        let payTheOthers = [];
        let totalSpentAmount = 0;

        // how much money must be received by those who do pay directly
        let toBeReceived = 0;

        // First pass: Separate those who pay directly and who don't.
        peopleList.forEach(person => {
            if (person.pays) {
                payDirectly.push( {name: person.name, spent: person.spent, needsGetPaid: 0} );
                toBeReceived -= person.spent; // this person pays their own bill
            }
            else {
                payTheOthers.push( {name: person.name, spent: person.spent} );
            }
            totalSpentAmount += person.spent;
        });

        // add the total to this variable, to which the payments of the footers was already substracted above.
        toBeReceived += totalSpentAmount;

        // How much each who pays directly will pay.
        let payAmount:number;
        
        if (payDirectly.length > 0) {
            payAmount = totalSpentAmount / payDirectly.length;
        }
        else {
            // if no direct payers were added yet, can't calculate.
            setDisplayPeople( [ <p key={0}>Se mostrara cuando se agregue al menos una persona que pague la cuenta</p> ] );
            return;
        }

        // start result output with the total. 
        let output = [ (<p>Total: {parseToPesos(totalSpentAmount, false)}</p>) ];

        // Print how much footers must pay.
        payDirectly.forEach(person => {
            output.push(<hr />);
			output.push(<p key={person.id}>{person.name} paga {parseToPesos(payAmount, false)} directamente</p>);
            person.needsGetPaid = payAmount - person.spent;
		});

        // this array will contain people who cannot pay whole amounts to a single footer.
        let roundTwoPayments = [];

        // Now, for everyone who must get paid
        for (let person of payTheOthers) {
            let nameGetsPaid = "";

            // Of those who footed the bill, see if the payment fits for any of them them
            for (let element of payDirectly) {
                if (element.needsGetPaid >= person.spent) {
                    nameGetsPaid = element.name;
                    element.needsGetPaid -= person.spent;
                    break;
                }
            };
            // sort per run so that, for the next person, highest footer gets evaluated first.
            payDirectly.sort((a, b) => b.needsGetPaid - a.needsGetPaid);
                    
            // best scenario: they can pay it all to a single person.
            if (nameGetsPaid.length >= 1) {
                output.push(<hr />);
                output.push(<p key={person.id}>{person.name} le paga {parseToPesos(person.spent, false)} a {nameGetsPaid}</p>);
            }
            else {
                // worst scenario: payment must be divided
                roundTwoPayments.push(person);
            }
		};

        // payment divisions, if needed
        if (roundTwoPayments.length > 0) {
            for (let person of roundTwoPayments) {
                let paymentObj = [ ];

                // how much the person has to pay.
                // separate variable as this will get substracted each part of a payment.
                let hasToPay = person.spent;

                // again, go through all the footers, see how much they have to get paid.
                for (let footer of payDirectly) {
                    // if this footer needs to be paid, and the person hasn't completed the payments yet
                    if (footer.needsGetPaid > 0 && hasToPay > 0) {
                        let paysThisPerson = 0;

                        if (hasToPay > footer.needsGetPaid) {
                            paysThisPerson = footer.needsGetPaid;
                            footer.needsGetPaid = 0;
                        }
                        else {
                            paysThisPerson = hasToPay;
                            footer.needsGetPaid -= hasToPay;
                        }

                        hasToPay -= paysThisPerson;
                        paymentObj.push(<span>{parseToPesos(paysThisPerson, false)} a {footer.name} </span>);
                    }
                };

                output.push(<hr />);
                output.push(<p key={person.id}>{person.name} debe dividir su pago: {paymentObj}</p>);
            }
        }
        
        setDisplayPeople(output);
    });

    function addPerson() {
        let personName = (document.getElementById('name') as HTMLInputElement).value;
        let personSpent = parseInt((document.getElementById('spent') as HTMLInputElement).value);
        let personPays = (document.getElementById('pays') as HTMLInputElement).checked;

        if (personName.length < 1) return false;
        if (personSpent < 1) return false;

        let newList = peopleList;
        newList.push({ name: personName, spent: personSpent, pays: personPays, id: newList.length });
        console.log(newList);

        (document.getElementById('personForm') as HTMLFormElement).reset();

        setPeopleList(newList);

        return true;
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
                title = "Calculadora división de cuenta"
                description = "Agrega cuanto gasto cada uno y quien paga la cuenta, y mira cuanto le tiene que dar cada uno al que pago. Restaurants, Cafes, Pedidos, etc..."
                />

            <Layout>
                <div className={styles.siteContainer}>
                    <PageHeader>
                        <h3 className={styles.text_accent_pink}>Calculadora división de cuenta</h3>
                    </PageHeader>
                    <div className={styles.flexContainer}>
                        <div className={styles.flexBox} style={{userSelect: 'none'}}>
                            <form id="personForm" style={{textAlign: 'center'}} onSubmit={(e) => { e.preventDefault(); }}>
                                <h3>Agregar persona</h3>
                                <label>
                                    Nombre persona
                                    <input 
                                        id="name" type="text" placeholder="Ingresar nombre"
                                        min={0}
                                        className={styles.input} 
                                        title="Numero con no mas de 2 decimales."
                                        />
                                </label>
                                <label>
                                    Gasto de persona
                                    <input 
                                        id="spent" type="number" placeholder="Sin coma ni puntos" step="1" 
                                        min={0}
                                        className={styles.input} 
                                        title="Numero con no mas de 2 decimales."
                                        />
                                </label>
                                <label><p>
                                    <input 
                                        id="pays" type="checkbox" 
                                        className={styles.checkbox} 
                                        title="Indica si esta persona paga o no la cuenta."
                                        />
                                    Paga la cuenta
                                </p></label>
                                <input type="submit" onClick={() => { addPerson(); } } value="Agregar persona" className={styles.input} />
                            </form>
                        </div>
                        <div className={styles.flexBox}>
                            <h2 style={{textAlign: 'center'}}>Resultado</h2>
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
                                    Sensillamente agrega persona por persona cuanto gasto cada uno. A quienes pagan la cuenta directamente, marca el campo "Paga la cuenta".
                                </p>
                                <p>
                                    La cuenta total se divide entre ellas, y a las demas se les dira cuanto le tienen que dar a los que pagaron.
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
