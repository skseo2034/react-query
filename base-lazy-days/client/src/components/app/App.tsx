import { ChakraProvider } from '@chakra-ui/react';
import { ReactElement } from 'react';

import { theme } from '../../theme';
import { Loading } from './Loading';
import { Navbar } from './Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { AllStaff } from '../staff/AllStaff';
import { Calendar } from '../appointments/Calendar';
import { Treatments } from '../treatments/Treatments';
import { Signin } from '../user/Signin';
import { UserProfile } from '../user/UserProfile';
import { Home } from './Home';

import { QueryClientProvider } from '@tanstack/react-query';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { queryClient } from '../../react-query/queryClient';

export function App(): ReactElement {
	return (
		<ChakraProvider theme={theme}>
			<QueryClientProvider client={queryClient}>
				<Navbar />
				<Loading />
				<Routes>
					<Route path="/Staff" element={<AllStaff />} />
					<Route path="/Calendar" element={<Calendar />} />
					<Route path="/Treatments" element={<Treatments />} />
					<Route path="/signin" element={<Signin />} />
					<Route path="/user/:id" element={<UserProfile />} />
					<Route path="/" element={<Home />} />
				</Routes>
				<ReactQueryDevtools />
			</QueryClientProvider>
		</ChakraProvider>
	);
}
