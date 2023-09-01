import { Staff } from '../../../../shared/types';

export function filterByTreatment(staff: Staff[], treatmentName: string): Staff[] {
	console.log('seo1 >>>>>>>>>>>>>>>', staff);
	console.log('seo2 >>>>>>>>>>>>>>>', treatmentName);
	const result = staff.filter(person =>
		person.treatmentNames.map(t => t.toLowerCase()).includes(treatmentName.toLowerCase())
	);
	console.log('seo3 >>>>>>>>>>>>>>>', result);
	return result;
	/*return staff.filter(person =>
		person.treatmentNames.map(t => t.toLowerCase()).includes(treatmentName.toLowerCase())
	); */
}
