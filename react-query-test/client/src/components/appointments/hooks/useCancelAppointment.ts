import { axiosInstance } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { useCustomToast } from '../../app/hooks/useCustomToast';
import { Appointment } from '../../../../../shared/types';
import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';
// import { toast } from 'react-toastify';

// for when server call is needed
async function removeAppointmentUser(appointment: Appointment): Promise<void> {
	const patchData = [{ op: 'remove', path: '/userId' }];
	await axiosInstance.patch(`/appointment/${appointment.id}`, {
		data: patchData,
	});
}

export function useCancelAppointment(): UseMutateFunction<void, unknown, Appointment, unknown> {
	const toast = useCustomToast();
	const queryClient = useQueryClient();
	const { mutate } = useMutation(removeAppointmentUser, {
		onSuccess: async () => {
			await queryClient.invalidateQueries([queryKeys.appointments]);
			toast({
				title: 'You have cancled then appointment!',
				status: 'warning',
			});
		},
	});

	return mutate;
}
