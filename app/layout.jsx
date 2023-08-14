import '@styles/globals.css';

export const metadata = {
	title: 'Promptopia',
	description: "Explorez et Échangez des idées d'IA",
};

const Rootlayout = ({ children }) => {
	return (
		<html lang='fr'>
			<body>
				<div className='main'>
					<div className='gradient' />
				</div>
				<main className='app'>{children}</main>
			</body>
		</html>
	);
};

export default Rootlayout;
