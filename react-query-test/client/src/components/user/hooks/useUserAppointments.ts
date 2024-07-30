import dayjs from 'dayjs';

import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { useUser } from './useUser';
import { Appointment, User } from '../../../../../shared/types';
import { useQuery } from '@tanstack/react-query';

// for when we need a query function for useQuery
const getUserAppointments = async (user: User | null): Promise<Appointment[] | null> => {
	if (!user) {
		return null;
	}
	const { data } = await axiosInstance.get(`/user/${user.id}/appointments`, {
		headers: getJWTHeader(user),
	});
	return data.appointments;
};

export function useUserAppointments(): Appointment[] {
	const { user } = useUser();

	const fallback: Appointment[] = [];
	const { data: userAppointments = fallback } = useQuery(
		[queryKeys.appointments, queryKeys.user, user?.id],
		() => getUserAppointments(user),
		{
			enabled: !!user,
		}
	);

	return userAppointments as Appointment[];
}
