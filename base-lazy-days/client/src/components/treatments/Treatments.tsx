import { Box, Heading, HStack } from '@chakra-ui/react';
import { ReactElement, useEffect, useState } from 'react';

import { useTreatments } from './hooks/useTreatments';
import { Treatment } from './Treatment';
import { useSubmit } from 'react-router-dom';
import { Treatment as TreatmentType } from '../../../../shared/types';

export function Treatments(): ReactElement {
	// replace with data from React Query
	// const treatments = useTreatments();
	const { treatments, refetch } = useTreatments();

	const handleBtn = async () => {
		await refetch();
	};

	return (
		<Box>
			<button onClick={handleBtn}>다시 가져오기</button>
			<Heading mt={10} textAlign="center">
				Available Treatments
			</Heading>
			<HStack m={10} spacing={8} justify="center">
				{treatments.map(treatmentData => (
					<Treatment key={treatmentData.id} treatmentData={treatmentData} />
				))}
			</HStack>
		</Box>
	);
}
