import { Appointment } from '../../../../shared/types';

/*type humanInfo = {
	number: Appointment[];
};*/

// export type AppointmentDateMap = humanInfo;

export type AppointmentDateMap = Record<number, Appointment[]>;
