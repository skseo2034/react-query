import { render, screen } from '@testing-library/react';

import { Treatments } from '../Treatments';
import { renderWithQueryClient } from '../../../test-utils';

test('renders response from query', async () => {
	renderWithQueryClient(<Treatments />);

	const treatementTitles = await screen.findByRole('heading', { name: /massage| facial | scrub/i });

	expect(treatementTitles).toHaveLength(3);
});
