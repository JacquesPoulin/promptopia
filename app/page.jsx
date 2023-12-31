import React from 'react';
import Feed from '@components/Feed';

const Home = () => {
	return (
		<section className='w-full flex-center flex-col'>
			<h1 className='head_text text-center'>
				Découvrir & Partager
				<br className='max-md:hidden' />
				<span className='orange_gradient text-center'>
					Prompts généré par IA
				</span>
			</h1>
			<p className='desc text-center'>
				"Promptopia", l'outil d'inspiration alimenté par l'IA en "open-source"
				et conçu pour le monde contemporain, où vous pouvez explorer, créer et
				partager des prompts créatifs en toute liberté.
			</p>

			{/* COMPOSANT FEED */}
			<Feed />
		</section>
	);
};

export default Home;
