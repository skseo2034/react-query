import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { useCustomToast } from '../../app/hooks/useCustomToast';
import { Treatment } from '../../../../../shared/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { Dispatch, SetStateAction, useState } from 'react';

// for when we need a query function for useQuery
async function getTreatments(): Promise<Treatment[]> {
	const { data } = await axiosInstance.get('/treatments');
	return data;
}

export function useTreatments() {
	const toast = useCustomToast();

	const fallback = [] as Treatment[];
	const {
		data: treatments = fallback,
		isLoading,
		refetch,
	} = useQuery([queryKeys.treatments], getTreatments, {
		// enabled: false, // 이 값이 true 가 될때 까지 요청하지 않는다.
		/*onError: error => {
			const title = error instanceof Error ? error.message : 'error connecting to the server';
		},*/
		// 아래는 개별설정 queryClient.ts 에서 전역으로 설정했으므로 주석처리.
		/*staleTime: 60000, // 10 minutes
		cacheTime: 90000, // 15 minutes 통상은 statleTime 보다 길어야 한다. 기본 5분이다. 왜냐면 staleTime 보다 적어면 다시 불러올때 보여줄 데이터가 없다.
		refetchOnMount: false,
		refetchOnWindowFocus: false,
		refetchOnReconnect: false,*/
	});

	return { treatments, refetch };
}

export const usePrefetchTreatments = () => {
	const queryClient = useQueryClient();
	queryClient
		.prefetchQuery([queryKeys.treatments], getTreatments, {
			/*staleTime: 60000, // 10 minutes
			cacheTime: 90000,*/
		})
		.then(r => {
			// dummy
		});
};
