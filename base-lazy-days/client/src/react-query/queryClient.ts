import { QueryCache, QueryClient } from '@tanstack/react-query';
import { createStandaloneToast } from '@chakra-ui/react';
import { theme } from '../theme';

const { toast } = createStandaloneToast({ theme });

function queryErrorHandler(error: unknown): void {
	// error is type unknown because in js, anything can be an error (e.g. throw(5))
	const id = 'react-query-error';
	const title = error instanceof Error ? error.message : 'error connecting to server';

	// prevent duplicate toasts
	toast.closeAll();
	toast({ id, title, status: 'error', variant: 'subtle', isClosable: true });
}

// to satisfy typescript until this file has uncommented contents

export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			onError: queryErrorHandler,
			// 전역설정. 아래와 같은 설정은 데이터의 변화가 거의 없다는 가정하에 refetching 을 제한하는 옵션
			// 권장하지 않는다. 사용자가 최신데이터를 보지 못할 가능성이 잇다.
			staleTime: 60000, // 10 minutes
			cacheTime: 90000, // 15 minutes 통상은 statleTime 보다 길어야 한다. 기본 5분이다. 왜냐면 staleTime 보다 적어면 다시 불러올때 보여줄 데이터가 없다.
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
		},
	},
});

/*
export const queryClient = new QueryClient({
	defaultOptions: {
		queries: {
			// 전역설정. 아래와 같은 설정은 데이터의 변화가 거의 없다는 가정하에 refetching 을 제한하는 옵션
			// 권장하지 않는다. 사용자가 최신데이터를 보지 못할 가능성이 잇다.
			staleTime: 60000, // 10 minutes
			cacheTime: 90000, // 15 minutes 통상은 statleTime 보다 길어야 한다. 기본 5분이다. 왜냐면 staleTime 보다 적어면 다시 불러올때 보여줄 데이터가 없다.
			refetchOnMount: false,
			refetchOnWindowFocus: false,
			refetchOnReconnect: false,
		},
	},
	queryCache: new QueryCache({
		onError: (error, query: any) => {
			if (query.meta.errorMessage) {
				queryErrorHandler(query.meta.errorMessage);
			}
		},
	}),
});
*/

/*import { createStandaloneToast } from '@chakra-ui/react';
import { QueryCache, QueryClient } from '@tanstack/react-query';

import { theme } from '../theme';

// const toast = createStandaloneToast({ theme });
const { ToastContainer, toast } = createStandaloneToast({ theme });
function queryErrorHandler(error: unknown): void {
	// error is type unknown because in js, anything can be an error (e.g. throw(5))
	const title = error instanceof Error ? error.message : 'error connecting to server';

	///////////////////////////////
	// NOTE: no toast.closeAll() //
	///////////////////////////////

	toast({ title, status: 'error', variant: 'subtle', isClosable: true });
}

export const queryClient = new QueryClient({
	queryCache: new QueryCache({
		onError: queryErrorHandler,
	}),
});*/
