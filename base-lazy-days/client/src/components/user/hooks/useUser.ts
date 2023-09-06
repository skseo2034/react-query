import { AxiosResponse } from 'axios';

import { axiosInstance, getJWTHeader } from '../../../axiosInstance';
import { queryKeys } from '../../../react-query/constants';
import { clearStoredUser, getStoredUser, setStoredUser } from '../../../user-storage';
import { User } from '../../../../../shared/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';

const getUser = async (user: User | null): Promise<User | null> => {
	console.log('getUser running ');
	if (!user) return null;
	console.log('getUser getJWTHeader(user)>>>>> ', getJWTHeader(user));
	const { data }: AxiosResponse<{ user: User }> = await axiosInstance.get(`/user/${user.id}`, {
		headers: getJWTHeader(user),
	});
	return data.user;
};

interface UseUser {
	user: User | null;
	updateUser: (user: User) => void;
	clearUser: () => void;
}

export function useUser(): UseUser {
	console.log('useUser running >>>>>>>>>>>>>>>>>');
	const queryClient = useQueryClient();
	const { data: user } = useQuery<any>([queryKeys.user], () => getUser(user), {
		initialData: getStoredUser,
		// onSuccess 함수는 쿼리함수(() => getUser(user)) 에서 반환된 데이터 나 setQueryData 에서 데이터를 가져오는 함수이다.
		/*onSuccess: (received: User | null) => {
			console.log('received >>>>>>>>>>>>>>>>>', received);
			if (!received) {
				clearStoredUser();
			} else {
				setStoredUser(received);
			}
		},*/
	});

	if (!user) {
		clearStoredUser();
	} else {
		setStoredUser(user);
	}
	console.log('useUser data >>>>>>>>>>>>>>>>>', getJWTHeader(user));
	//const user = null;

	// meant to be called from useAuth
	const updateUser = (newUser: User): void => {
		queryClient.setQueryData([queryKeys.user], newUser);
	};

	// meant to be called from useAuth
	const clearUser = () => {
		queryClient.setQueryData([queryKeys.user], null);
		queryClient.removeQueries(['user-appointments']);
	};

	return { user, updateUser, clearUser };
}
