import Head from "next/head";

export default function CommandEntry(props: {title: string, description: string, image?: string}) {
    let imgUrl: string;
    if (props.image) {
        imgUrl = props.image;
    }
    else {
        imgUrl = "https://markski.ar/images/profileDesplacement.png";
    }
	let showTitle = props.title + " - Calculadora";
	return (
		<Head>
			<title>{showTitle}</title>
			<meta
				name="description"
				content={props.description}
			/>
			<meta name="og:title" content={showTitle} />
			<meta property="og:image" content={imgUrl} />
			<meta property="og:description" content={props.description} />
		</Head>
	);
} 