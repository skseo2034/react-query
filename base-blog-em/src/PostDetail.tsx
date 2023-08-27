import { FC } from 'react';
import { useMutation, useQuery } from '@tanstack/react-query';
const fetchComments = async (postId: number) => {
	console.log('postId', postId);
	const response = await fetch(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`);
	return await response.json();
};

const deletePost = async (postId: number) => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, { method: 'DELETE' });
	console.log('response', response);
	/*if (!response.ok) {
		window.alert('오류 발생');
		return null;
	}*/
	return await response.json();
};

const updatePost = async (postId: number) => {
	const response = await fetch(`https://jsonplaceholder.typicode.com/postId/${postId}`, {
		method: 'PATCH',
		body: JSON.stringify({ title: 'REACT QUERY FOREVER!!!!' }),
	});
	return await response.json();
};

interface CommentType {
	id: number;
	email: string;
	body: string;
}

interface Props {
	post: PostItemType;
}
interface PostItemType {
	userId: number;
	id: number;
	title: string;
	body: string;
}

//export const PostDetail: FC<Props> = ({ post }) => {
//export const PostDetail = (props: { post: PostItemType }) => {
export const PostDetail = ({ post }: { post: PostItemType }) => {
	// const { post } = props;
	// replace with useQuery
	//

	// 아래 처럼 comments 라는 동일한 키를 사용할때,
	// 어떤 트리거가 발생해야지만 데이터를 다시 가져온다.
	// 그 트리거는
	// 1. 컴포넌트를 다시 마운트할때(remount)
	// 2. 원도우 다시 포커스를 할때 (refocus)
	// 3. useQuery 에서 반환되어 수동으로 리페칭을 실행할때 (running refetch function)
	// 4. 지정된 간격으로 리페칭을 자동으로 실행할 때.
	// 5. 변이(mutation)를 생성한 뒤 쿼리(query)를 무효화 할시
	// 클라이언트의 데이터가 서버의 데이터아 불일지할때 리페팅이 트리거 된다.
	// 따라서 아래와 같이 post.id 를 추가한다.
	const { data, isLoading, error, isError } = useQuery<CommentType[], any, any, any>(['comments', post.id], () =>
		fetchComments(post.id)
	);

	const deleteMutation = useMutation((postId: number) => deletePost(postId));

	const updateMutation = useMutation((postId: number) => updatePost(postId));

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
			<h3 style={{ color: 'blue' }}>{post.title}</h3>
			{/*<button onClick={() => deleteMutation.mutate()}>Delete</button> <button>Update title</button>*/}
			<button onClick={() => deleteMutation.mutate(post.id)}>Delete</button>
			<button onClick={() => updateMutation.mutate(post.id)}>Update Title</button>
			{deleteMutation.isError && <p style={{ color: 'red' }}>Error deleting post</p>}
			{deleteMutation.isLoading && <p style={{ color: 'purple' }}>Deleting the post</p>}
			{deleteMutation.isSuccess && <p style={{ color: 'green' }}>Post has (not) been deleted</p>}

			{updateMutation.isError && <p style={{ color: 'red' }}>Error updating post title</p>}
			{updateMutation.isLoading && <p style={{ color: 'purple' }}>updating the post title</p>}
			{updateMutation.isSuccess && <p style={{ color: 'green' }}>Post title has (not) been updated</p>}
			<p>{post.body}</p>
			<h4>Comments</h4>
			{data.map((comment: CommentType) => (
				<li key={comment.id}>
					{comment.email}: {comment.body}
				</li>
			))}
		</>
	);
};
