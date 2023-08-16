import '@styles/globals.css';

import Navbar from '@components/Navbar';
import Provider from '@components/Provider';

export const metadata = {
	title: 'Promptopia',
	description: "Explorez et Échangez des prompts d'IA",
};

const Rootlayout = ({ children }) => {
	return (
		<html lang='fr'>
			<body>
				<Provider >
					<div className='main'>
						<div className='gradient' />
					</div>
					<main className='app'>
						<Navbar />
						{children}
					</main>
				</Provider>
			</body>
		</html>
	);
};

export default Rootlayout;
