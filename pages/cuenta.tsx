import { useState, useEffect } from 'react';
import styles from '../styles/Custom.module.css';
import HeadParams from '../components/atoms/HeadParams';
import Layout from '../components/layout';
import PageHeader from '../components/atoms/PageHeader';

export default function Cuenta() {
    // display states
    const [displayPeople, setDisplayPeople] = useState( [ <p key={0}>Se mostrara cuando se agreguen 2 personas</p> ] );
    const [peopleList, setPeopleList] = useState( [] );

    function calculate() {
        if (peopleList.length < 2) {
            setDisplayPeople( [ <p key={0}>Se mostrara cuando se agreguen {2 - peopleList.length} personas</p> ] );
            return;
        }

        // total paid by everyone
        let totalPaid = 0;
        peopleList.forEach(person => {
            totalPaid += person.spent;
        });

        // how much should be paid if everyone paid equally
        const equalShare = totalPaid / peopleList.length;

        // people who paid more or less
        type Creditor = { name: string; needsToReceive: number };
        type Debtor = { name: string; needsToPay: number };

        const creditors: Creditor[] = [];
        const debtors: Debtor[] = [];

        peopleList.forEach(person => {
            const diff = person.spent - equalShare;

            if (diff > 0.01) {
                // paid more
                creditors.push({ name: person.name, needsToReceive: diff });
            } else if (diff < -0.01) {
                // paid less
                debtors.push({ name: person.name, needsToPay: -diff });
            }
        });

        // order to keep algo stable
        creditors.sort((a, b) => b.needsToReceive - a.needsToReceive);
        debtors.sort((a, b) => b.needsToPay - a.needsToPay);

        const output = [
            (<p key="total">Total: {parseToPesos(totalPaid, false)}</p>),
            (<p key="share">Cada uno deberia pagar: {parseToPesos(equalShare, false)}</p>)
        ];

        // if everyone paid just about the same
        if (creditors.length === 0 && debtors.length === 0) {
            output.push(<hr key="hr-equal" />);
            output.push(<p key="all-even">Todos ya pagaron lo que corresponde. No hacen falta transferencias.</p>);
            setDisplayPeople(output);
            return;
        }

        // calc who pays who
        let transferKey = 0;

        let cIndex = 0;
        let dIndex = 0;

        output.push(<h4>Movimientos sugeridos</h4>);

        while (cIndex < creditors.length && dIndex < debtors.length) {
            const creditor = creditors[cIndex];
            const debtor = debtors[dIndex];

            const amount = Math.min(creditor.needsToReceive, debtor.needsToPay);

            if (amount > 0.01) {
                output.push(<hr key={`hr-${transferKey}`} />);
                output.push(
                    <p key={`t-${transferKey}`}>
                        {debtor.name} le paga {parseToPesos(amount, false)} a {creditor.name}
                    </p>
                );
                transferKey++;

                creditor.needsToReceive -= amount;
                debtor.needsToPay -= amount;
            }

            if (creditor.needsToReceive <= 0.01) cIndex++;
            if (debtor.needsToPay <= 0.01) dIndex++;
        }

        setDisplayPeople(output);
    }

    function addPerson() {
        let personName = (document.getElementById('name') as HTMLInputElement).value;
        let personSpent = parseInt((document.getElementById('spent') as HTMLInputElement).value);

        if (personName.length < 1) {
            window.alert("Toda persona debe tener un nombre.");
            (document.getElementById('name') as HTMLInputElement).focus();
            return false;
        }
        if (personSpent < 1) {
            window.alert("Para este tipo de calculadora, toda persona debe haber gastado.");
            (document.getElementById('spent') as HTMLInputElement).focus();
            return false;
        }

        let newList = [...peopleList, { name: personName, spent: personSpent, id: peopleList.length }];
        setPeopleList(newList);

        (document.getElementById('personForm') as HTMLFormElement).reset();
        (document.getElementById('name') as HTMLInputElement).focus();

        return true;
    }

    function resetAll() {
        setPeopleList([]);
        setDisplayPeople([ <p key={0}>Se mostrara cuando se agreguen 2 personas</p> ]);
        (document.getElementById('personForm') as HTMLFormElement)?.reset();
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

    useEffect(() => {
      calculate();
    }, [peopleList]);

    // calc resumed table
    const totalPaid = peopleList.reduce((acc, p: any) => acc + p.spent, 0);
    const equalShare = peopleList.length > 0 ? totalPaid / peopleList.length : 0;

    return (
        <>
            <HeadParams
                title = "Calculadora división de gastos"
                description = "Agrega cuanto pago cada uno y mira como distribuir los pagos para que todos paguen lo mismo."
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
                                        title="Nombre de la persona."
                                        />
                                </label>
                                <label>
                                    Monto que pago la persona
                                    <input
                                        id="spent" type="number" placeholder="Sin coma ni puntos" step="1"
                                        min={0}
                                        className={styles.input}
                                        title="Monto que pago esta persona."
                                        />
                                </label>
                                <input
                                    type="submit"
                                    onClick={() => { addPerson(); }}
                                    value="Agregar persona"
                                    className={styles.input}
                                />
                                <button
                                    type="button"
                                    onClick={resetAll}
                                    className={styles.input}
                                    style={{ marginTop: '0.5rem' }}
                                >
                                    Resetear
                                </button>
                            </form>
                        </div>
                        <div className={styles.flexBox}>
                            <h2 style={{textAlign: 'center'}}>Resultado</h2>

                            {peopleList.length > 0 && (
                                <div style={{ overflowX: 'auto', marginBottom: '1rem' }}>
                                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9rem' }}>
                                        <thead>
                                            <tr>
                                                <th style={{ textAlign: 'left', borderBottom: '1px solid #ccc', padding: '0.25rem' }}>Persona</th>
                                                <th style={{ textAlign: 'right', borderBottom: '1px solid #ccc', padding: '0.25rem' }}>Pagó</th>
                                                <th style={{ textAlign: 'right', borderBottom: '1px solid #ccc', padding: '0.25rem' }}>Debería pagar</th>
                                                <th style={{ textAlign: 'right', borderBottom: '1px solid #ccc', padding: '0.25rem' }}>Diferencia</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {peopleList.map((person: any) => {
                                                const diff = person.spent - equalShare;
                                                let label = 'Está equilibrado';
                                                if (diff > 0.01) label = 'Debe recibir';
                                                else if (diff < -0.01) label = 'Debe pagar';

                                                return (
                                                    <tr key={person.id}>
                                                        <td style={{ padding: '0.25rem' }}>{person.name}</td>
                                                        <td style={{ padding: '0.25rem', textAlign: 'right' }}>
                                                            {parseToPesos(person.spent, false)}
                                                        </td>
                                                        <td style={{ padding: '0.25rem', textAlign: 'right' }}>
                                                            {parseToPesos(equalShare || 0, false)}
                                                        </td>
                                                        <td style={{ padding: '0.25rem', textAlign: 'right' }}>
                                                            {label !== 'Está equilibrado' && (
                                                                <>
                                                                    {label}: {parseToPesos(Math.abs(diff), false)}
                                                                </>
                                                            )}
                                                            {label === 'Está equilibrado' && label}
                                                        </td>
                                                    </tr>
                                                );
                                            })}
                                        </tbody>
                                    </table>
                                </div>
                            )}

                            <div>
                                {displayPeople}
                            </div>
                        </div>
                        <div className={styles.flexBox} style={{userSelect: 'none'}}>
                            <p className={styles.smallHeader}>Instrucciones</p>
                            <small>
                                <p>
                                    La idea de esta calculadora es para casos donde varias personas pagan cosas de una salida (por ejemplo, restaurante o bar) y luego quieren dividir todo para que cada uno termine pagando lo mismo.
                                </p>
                                <p>
                                    Indicá cuánto pagó cada persona. La calculadora te dirá quién le tiene que pagar a quién y cuánto.
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
        </>)
    }