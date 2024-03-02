'use client';

import { useSession } from 'next-auth/react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import Profile from '@components/Profile';

const MyProfile = () => {
	const router = useRouter();
	const { data: session } = useSession();

	const [myPosts, setMyPosts] = useState([]);

	useEffect(() => {
		location.reload();
	}, [])

	useEffect(() => {
		const fetchPosts = async () => {
			const response = await fetch(`/api/users/${session?.user.id}/posts`);
			const data = await response.json();

			setMyPosts(data);
		};

		if (session?.user.id) fetchPosts();
	}, [session?.user.id]);

	const handleEdit = (post) => {
		router.push(`/modifier-prompt?id=${post._id}`);
	};

	const handleDelete = async (post) => {
		const hasConfirmed = confirm(
			'Êtes-vous sûr de vouloir supprimer ce post ?'
		);

		if (hasConfirmed) {
			try {
				await fetch(`/api/prompt/${post._id.toString()}`, {
					method: 'DELETE',
				});

				// ? Afficher tous les posts sauf celui que l'on a effacé 
				const filteredPosts = myPosts.filter((item) => item._id !== post._id);

				setMyPosts(filteredPosts);

			} catch (error) {
				console.log(error);
			}
		}
	};

	return (
		<Profile
			name={session?.user.name}
			desc='Bienvenue sur votre profil'
			data={myPosts}
			handleEdit={handleEdit}
			handleDelete={handleDelete}
		/>
	);
};

export default MyProfile;
