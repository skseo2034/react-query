import { Dispatch, SetStateAction, useCallback, useState } from 'react';

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

	const selectFn = useCallback(
		(data: Staff[]) => {
			console.log('seo4 >>>>>>>>>>>>>>>>', data);
			return filterByTreatment(data, filter);
		},
		[filter]
	);

	const fallback = [] as any[];

	const { data: staff = fallback, isLoading } = useQuery([queryKeys.staff], getStaff, {
		select: filter !== 'all' ? selectFn : undefined,
	});

	console.log('useStaff >>>>> ', staff);

	return { staff, filter, setFilter };
}
