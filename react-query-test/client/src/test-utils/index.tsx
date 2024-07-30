import { render, RenderResult } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { ReactElement } from 'react';

// make a function to generate a unique query client for each test
const qenerateQueryClient = () => {
	return new QueryClient();
};

export const renderWithQueryClient = (ui: ReactElement, client?: QueryClient): RenderResult => {
	const queryClient = client ?? qenerateQueryClient();

	return render(<QueryClientProvider client={queryClient}>{ui}</QueryClientProvider>);
};

// from https://tkdodo.eu/blog/testing-react-query#for-custom-hooks
// export const createQueryClientWrapper = (): React.FC => {
//   const queryClient = generateQueryClient();
//   return ({ children }) => (
//     <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
//   );
// };
