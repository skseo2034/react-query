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

export function App(): ReactElement {
	return (
		<ChakraProvider theme={theme}>
			<Navbar />
			{/*<Loading />*/}
			<Routes>
				<Route path="/Staff" element={<AllStaff />} />
				<Route path="/Calendar" element={<Calendar />} />
				<Route path="/Treatments" element={<Treatments />} />
				<Route path="/signin" element={<Signin />} />
				<Route path="/user/:id" element={<UserProfile />} />
				<Route path="/" element={<Home />} />
			</Routes>
		</ChakraProvider>
	);
}
