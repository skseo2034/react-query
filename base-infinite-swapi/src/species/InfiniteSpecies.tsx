import InfiniteScroll from 'react-infinite-scroller';
import { Species } from './Species';
import { useInfiniteQuery } from '@tanstack/react-query';
import { Person } from '../people/Person';

const initialUrl = 'https://swapi.dev/api/species/';
const fetchUrl = async (url: any) => {
	const response = await fetch(url);
	return await response.json();
};

export function InfiniteSpecies() {
	// TODO: get data for InfiniteScroll via React Query
	const { data, fetchNextPage, hasNextPage, isLoading, isFetching, isError, error } = useInfiniteQuery(
		['sw-species'],
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
			{/*<button onClick={() => fetchNextPage()}>Next</button>*/}
			{isFetching && <div className="loading">Loading...</div>}
			<InfiniteScroll loadMore={fetchNextPage as () => void} hasMore={hasNextPage}>
				{data ? (
					data.pages.map(pageData => {
						return pageData.results.map((specie: any) => {
							return (
								<Species
									key={specie.name}
									name={specie.name}
									language={specie.language}
									averageLifespan={specie.average_lifespan}
								/>
							);
						});
					})
				) : (
					<></>
				)}
			</InfiniteScroll>
		</>
	);
}
