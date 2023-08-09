export default function PageHeader({ children }) {
	return (
		<div style={{margin: '.5rem 1rem', userSelect: 'none'}}>
            {children}
        </div>
	);
}