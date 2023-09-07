//import { Appointment } from '../../../../../shared/types';
import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { useCustomToast } from '../../app/hooks/useCustomToast';
import { useUser } from '../../user/hooks/useUser';
import { Appointment } from '../../../../../shared/types';
import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';

// for when we need functions for useMutation
const setAppointmentUser = async (appointment: Appointment, userId: number | undefined): Promise<void> => {
	if (!userId) return;
	const patchOp = appointment.userId ? 'replace' : 'add';
	const patchData = [{ op: patchOp, path: '/userId', value: userId }];
	await axiosInstance.patch(`/appointment/${appointment.id}`, {
		data: patchData,
	});
};

export const useReserveAppointment = (): UseMutateFunction<void, unknown, Appointment, unknown> => {
	const { user } = useUser();
	const toast = useCustomToast();
	const queryClient = useQueryClient();

	const { mutate } = useMutation((appointment: Appointment) => setAppointmentUser(appointment, user?.id), {
		onSuccess: async () => {
			await queryClient.invalidateQueries([queryKeys.appointments]);
			toast({
				title: 'You have reserved then appointment!',
				status: 'success',
			});
		},
	});

	return mutate;
};
