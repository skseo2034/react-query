import InfiniteScroll from 'react-infinite-scroller';
import { useInfiniteQuery } from '@tanstack/react-query';

import { Person } from './Person';

const initialUrl = 'https://swapi.dev/api/people/';
const fetchUrl = async (url: any) => {
	const response = await fetch(url);
	return await response.json();
};

export const InfinitePeople = () => {
	const LIMIT = 10;
	// TODO: get data for InfiniteScroll via React Query
	const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isError, error } = useInfiniteQuery(
		['sw-people'],
		({ pageParam = initialUrl }) => fetchUrl(pageParam),
		{
			getNextPageParam: (lastPage: any) => lastPage.next || undefined,
		}
	);

	if (isLoading) {
		<div className="loading">Loading...</div>;
	}

	if (isError) {
		<div>Error! {(error as any).toString()}</div>;
	}

	return (
		<>
			{isFetching && <div className="loading">Loading...</div>}
			<InfiniteScroll
				loadMore={fetchNextPage as () => void}
				/*loadMore={fetchNextPage => {
				//dummy
			}}*/
				hasMore={hasNextPage}
			>
				{data &&
					data.pages.map(pageData => {
						return pageData.results.map((person: any) => {
							return (
								<Person
									key={person.name}
									name={person.name}
									hairColor={person.hair_color}
									eyeColor={person.eye_color}
								/>
							);
						});
					})}
			</InfiniteScroll>
		</>
	);
};
