import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { useCustomToast } from '../../app/hooks/useCustomToast';
import { Treatment } from '../../../../../shared/types';
import { useQuery } from '@tanstack/react-query';
import axios from 'axios';

// for when we need a query function for useQuery
async function getTreatments(): Promise<Treatment[]> {
	const { data } = await axiosInstance.get('/treatments');
	return data;
}

export function useTreatments(): Treatment[] {
	const toast = useCustomToast();

	const fallback = [] as any[];
	const { data = fallback, isLoading } = useQuery([queryKeys.treatments], getTreatments, {
		/*onError: error => {
			const title = error instanceof Error ? error.message : 'error connecting to the server';
		},*/
	});

	return data as Treatment[];
}
