'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import { useSession } from 'next-auth/react';
import { useRouter, usePathname } from 'next/navigation';

const PromptCard = ({ post, handleTagClick, handleEdit, handleDelete }) => {
	const userFirstLetter = post.creator.username.split('')[0].toUpperCase();

	const { data: session } = useSession();
	const pathName = usePathname();
	const router = useRouter();

	const [copied, setCopied] = useState('');

	const handleCopy = () => {
		setCopied(post.prompt);
		navigator.clipboard.writeText(post.prompt);
		setTimeout(() => setCopied(''), 5000);
	};

	const handleProfileClick = () => {
		console.log(post);

		if (post.creator._id === session?.user.id) return router.push('/profile');

		router.push(`/profile/${post.creator._id}?name=${post.creator.username}`);
	};

	return (
		<div className='prompt_card'>
			<div className='flex justify-between items-start gap-5'>
				<div
					className='flex-1 flex justify-start items-center gap-3 cursor-pointer'
					onClick={handleProfileClick}>
					{post?.creator?.image ? (
						<Image
							src={post.creator.image}
							alt="Image de l'utilsateur"
							width={40}
							height={40}
							className='rounded-full object-contain'
						/>
					) : (
						<p className='orange_gradient'>{userFirstLetter}</p>
					)}
				</div>

				<div className='flex flex-col'>
					<h3 className='font-satoshi font-semibold text-gray-900'>
						{post?.creator?.username}
					</h3>
					<p className='font-inter text-sm text-gray-500'>
						{post?.creator?.email}
					</p>
				</div>

				<div className='copy_btn' onClick={handleCopy}>
					<Image
						src={
							copied === post.prompt
								? '/assets/icons/tick.svg'
								: 'assets/icons/copy.svg'
						}
						width={12}
						height={12}
						alt='Copier le texte'
					/>
				</div>
			</div>

			<p className='my-4 font-satoshi text-em text-gray-700 '>{post.prompt}</p>
			<p
				className='font-inter text-sm blue_gradient cursor-pointer'
				title='Cliquez pour faire une recherche par tags'
				onClick={() => handleTagClick && handleTagClick(post.tag)}>
				{post.tag}
			</p>

			{session?.user.id === post.creator._id && pathName === '/profile' && (
				<div className='mt-5 flex-center gap-4 border-t border-gray-100 pt-3'>
					<p
						className='font-inner text-sm green_gradient cursor-pointer'
						onClick={handleEdit}>
						Modifier
					</p>
					<p
						className='font-inner text-sm orange_gradient cursor-pointer'
						onClick={handleDelete}>
						Effacer
					</p>
				</div>
			)}
		</div>
	);
};

export default PromptCard;
