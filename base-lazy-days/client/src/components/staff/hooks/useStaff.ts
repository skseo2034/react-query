import { Dispatch, SetStateAction, useState } from 'react';

import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { filterByTreatment } from '../utils';
import { Staff } from '../../../../../shared/types';
import { useQuery } from '@tanstack/react-query';

// for when we need a query function for useQuery
const getStaff = async (): Promise<Staff[]> => {
	const { data } = await axiosInstance.get('/staff');
	return data;
};

interface UseStaff {
	staff: Staff[];
	filter: string;
	setFilter: Dispatch<SetStateAction<string>>;
}

export function useStaff(): UseStaff {
	// for filtering staff by treatment
	const [filter, setFilter] = useState('all');

	// TODO: get data from server via useQuery
	const fallback = [] as any[];

	const { data: staff = fallback, isLoading } = useQuery([queryKeys.staff], getStaff, {
		/*onError: error => {
			const title = error instanceof Error ? error.message : 'error connecting to the server';
		},*/
	});

	return { staff, filter, setFilter };
}
