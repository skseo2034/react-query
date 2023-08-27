import InfiniteScroll from 'react-infinite-scroller';
import { Species } from './Species';

const initialUrl = 'https://swapi.dev/api/species/';
const fetchUrl = async (url: any) => {
	const response = await fetch(url);
	return await response.json();
};

export function InfiniteSpecies() {
	// TODO: get data for InfiniteScroll via React Query
	return <InfiniteScroll loadMore={fetchUrl} />;
}
