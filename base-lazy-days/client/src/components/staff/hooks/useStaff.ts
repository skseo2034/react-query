import { Dispatch, SetStateAction, useState } from 'react';

import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { filterByTreatment } from '../utils';
import { Staff } from '../../../../../shared/types';

// for when we need a query function for useQuery
// async function getStaff(): Promise<Staff[]> {
//   const { data } = await axiosInstance.get('/staff');
//   return data;
// }

interface UseStaff {
	staff: Staff[];
	filter: string;
	setFilter: Dispatch<SetStateAction<string>>;
}

export function useStaff(): UseStaff {
	// for filtering staff by treatment
	const [filter, setFilter] = useState('all');

	// TODO: get data from server via useQuery
	const staff = [] as any[];

	return { staff, filter, setFilter };
}
