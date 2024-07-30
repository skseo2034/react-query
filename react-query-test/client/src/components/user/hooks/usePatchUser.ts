import jsonpatch from 'fast-json-patch';

import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import { useUser } from './useUser';
import { User } from '../../../../../shared/types';
import { UseMutateFunction, useMutation, useQueryClient } from '@tanstack/react-query';
import { useCustomToast } from '../../app/hooks/useCustomToast';
import { queryKeys } from '../../../react-query/constants';

// for when we need a server function
async function patchUserOnServer(newData: User | null, originalData: User | null): Promise<User | null> {
	if (!newData || !originalData) {
		return null;
	}
	// create a patch for the difference between newData and originalData
	const patch = jsonpatch.compare(originalData, newData);

	// send patched data to the server
	const { data } = await axiosInstance.patch(
		`/user/${originalData.id}`,
		{ patch },
		{
			headers: getJWTHeader(originalData),
		}
	);
	return data.user;
}

export const usePatchUser = (): UseMutateFunction<User | null, unknown, User, unknown> => {
	const { user, updateUser } = useUser();
	const toast = useCustomToast();
	const queryClient = useQueryClient();

	// useMutate 는 newUserData 를 인수로 받어서 patchUserOnServer를 실행한다.
	const { mutate: patchUser } = useMutation((newUserData: User) => patchUserOnServer(newUserData, user), {
		// onMutate returns context that is passed to onError
		onMutate: async (newData: User | null) => {
			// cancel any outgoing queries for user data, so old server data
			// doesn't overwrite our optimistic update
			await queryClient.cancelQueries([queryKeys.user]);

			// snapshot of previous user value
			const previousUserData = queryClient.getQueryData([queryKeys.user]);
			// optimistically update the cache with new user value
			updateUser(newData as User);
			// return context object tieh snapshotted value
			return { previousUserData };
		},
		onError: (error, newData, context) => {
			// roll back chaceh to daved value
			if (context && context.previousUserData) {
				updateUser(context.previousUserData as User);
				toast({
					title: 'Update failed; restoring previous vlaues',
					status: 'warning',
				});
			}
		},
		// onSuccess 는 mutation 에서 반환 되는 모든 데이터를 받는다, 여기서는 patchUserOnServer 가 반환하는 user 이다.
		onSuccess: (userData: User | null) => {
			if (userData) {
				// onMutate 에서 성공할 것을 예상하고 미리 낙관적인 update 를 했으므로 주석처리 함.
				// updateUser(userData);
				toast({
					title: 'User updated!',
					status: 'success',
				});
			}
		},
		onSettled: async () => {
			// invalidae user query to make sure we're in sync with server data
			// 쿼리를 무효화 한다 그러면 리패치가 되어 서버와 동일하게 맞줘 준다.
			await queryClient.invalidateQueries([queryKeys.user]);
		},
	});

	return patchUser;
};
