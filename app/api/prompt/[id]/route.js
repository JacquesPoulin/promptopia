import Prompt from '@models/prompt';
import { connectToDB } from '@utils/database';

export const GET = async (req, { params }) => {
	try {
		await connectToDB();

		const prompt = await Prompt.findById(params.id).populate('creator');

		if (!prompt) return new Response('Prompt introuvable', { status: 404 });

		return new Response(JSON.stringify(prompt), { status: 200 });
	} catch (error) {
		return new Response('Internal Server Error', { status: 500 });
	}
};

export const PATCH = async (req, { params }) => {
	const { prompt, tag } = await req.json();

	try {
		await connectToDB();

		// ? Trouver le prompt grâce à son ID
		const existingPrompt = await Prompt.findById(params.id);

		if (!existingPrompt) {
			return new Response('Prompt introuvable', { status: 404 });
		}

		// ? Update le prompt
		existingPrompt.prompt = prompt;
		existingPrompt.tag = tag;

		await existingPrompt.save();

		return new Response('Prompt modifié', { status: 200 });
	} catch (error) {
		return new Response('Erreur dans la modification du prompt', {
			status: 500,
		});
	}
};

export const DELETE = async (req, { params }) => {
	try {
		await connectToDB();

		// ? Trouver le prompt grâce à son ID et l'effacer
		await Prompt.findByIdAndRemove(params.id);

		return new Response('Prompt effacé', { status: 200 });
	} catch (error) {
		return new Response('Erreur dans la suppression du prompt', {
			status: 500,
		});
	}
};
