import Head from "next/head";

export default function HeadParams(props: {title: string, description: string, image?: string}) {
    let imgUrl: string;
    if (props.image) {
        imgUrl = props.image;
    }
    else {
        imgUrl = "https://calc.markski.ar/logo_small.png";
    }
	let showTitle = props.title + " - Calculando Argentina";
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
			<link rel="icon" href="/favicon.png" />
			<link rel="manifest" href="manifest.json" />
		</Head>
	);
} 