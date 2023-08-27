'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';

import Form from '@components/Form';

const CreatePrompt = () => {

  const router = useRouter();
  const { data: session } = useSession();

	const [submit, setSubmit] = useState(false);
	const [post, setPost] = useState({
		prompt: '',
		tag: '',
	});

	// ! Fonction(s)
	const createPrompt = async (e) => {
		e.preventDefault();
		setSubmit(true);
		try {
			const response = await fetch('/api/prompt/new', {
				method: 'POST',
				body: JSON.stringify({
					userId: session?.user.id,
					prompt: post.prompt,
					tag: post.tag,
				}),
			});

			if (response.ok) {
				router.push('/');
			}
		} catch (error) {
			console.log(`Quelque chose s'est mal passée dans le push : ${error}`);
		} finally {
			setSubmit(false);
		}
	};

	return (
		<Form
			type='Créer'
			post={post}
			setPost={setPost}
			submitting={submit}
			handleSubmit={createPrompt}
		/>
	);
};

export default CreatePrompt;
