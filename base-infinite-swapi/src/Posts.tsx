import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

import { PostDetail } from './PostDetail';
const maxPostPage = 10;

interface PostItemType {
	userId: number;
	id: number;
	title: string;
	body: string;
}

const fetchPosts = async (pageNum: number) => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${pageNum}`);
	// const data = await response.json();
	// console.log('response', data);
	// return data;
	return await response.json();
};

export const Posts = () => {
	const [currentPage, setCurrentPage] = useState(1);
	const [selectedPost, setSelectedPost] = useState<PostItemType | null>(null);

	const queryClient = useQueryClient();

	useEffect(() => {
		if (currentPage < maxPostPage) {
			const nextPage = currentPage + 1;
			queryClient
				.prefetchQuery(['posts', nextPage], () => fetchPosts(nextPage))
				.then(r => {
					// dummy then
				});
		}
	}, [currentPage, queryClient]);

	// replace with useQuery
	const { data, isError, error, isLoading } = useQuery<PostItemType[], any, any, any>(
		['posts', currentPage],
		() => fetchPosts(currentPage),
		{
			// 데이터가 2초동안 유지되도 된다면.., default 는 0 이다. 이것은 re-fecthing 할때 고려 사항이다.
			// 반면 cacheTime 은 나중에 필요할 수도 있는 데이터 용이다. default 는 5분이다.
			// 새로운 데이트를 fetching 하는 동안 보여줄수 있다. cacheTime 설정을 통해. 만약 그 동안 보여주는것도 위험하다고 판단되면. 0 으로 설정하면 된다.
			staleTime: 2000,
			keepPreviousData: true, // 쿼리 키가 바뀔때에도 지난 데이터를 유지해서, 혹시 이전 페이지로 돌아 갔을때 캐시에 해당 데이터가 있도록 만들고 싶을때 설정한다.
		}
	);

	if (isLoading) {
		return <h3>Loading...</h3>;
	}

	if (isError) {
		return (
			<>
				<h3>Oops, something went wrong</h3>
				<p>{error.toString()}</p>
			</>
		);
	}

	return (
		<>
			<ul>
				{data &&
					data.map((post: PostItemType) => (
						<li key={post.id} className="post-title" onClick={() => setSelectedPost(post)}>
							{post.title}
						</li>
					))}
			</ul>
			<div className="pages">
				<button
					disabled={currentPage <= 1}
					onClick={() => {
						setCurrentPage(prevState => prevState - 1);
					}}
				>
					Previous page
				</button>
				<span>Page {currentPage}</span>
				<button
					disabled={currentPage >= maxPostPage}
					onClick={() => {
						setCurrentPage(prevState => prevState + 1);
					}}
				>
					Next page
				</button>
			</div>
			<hr />
			{selectedPost && <PostDetail post={selectedPost} />}
		</>
	);
};
