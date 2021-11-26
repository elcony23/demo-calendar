import moment from 'moment';
import React, { FC } from 'react';
import { IAppointmentReducer } from '../../interfaces/interfaces';
import { getAppointmentHours } from '../../utils/utils';
import AppointmentCard from '../AppointmentCard/AppointmentCard';
import Dot from '../Dot/Dot';
import Styles from './Appointment.module.scss';

interface Props {
    numAppointments: Number;
    currentDate: Date | moment.Moment;
    scheduledAppointments: IAppointmentReducer[];
    breakTimeAppointments: Array<any>;
}
const Appointment: FC<Props> = function ({
    numAppointments,
    currentDate,
    scheduledAppointments,
    breakTimeAppointments
}) {
    const filterAppointmentsByDay = scheduledAppointments.filter(
        (selectedAppointment: any) =>
            selectedAppointment.date ===
            moment(currentDate).format('DD[/]MM[/]YYYY')
    );
    const appointments = getAppointmentHours(
        Number(numAppointments),
        currentDate
    );
    return (
        <div className={Styles['grid-container']}>
            {appointments.map((appointment, i) => {
                const getAppointmentsRange = filterAppointmentsByDay.filter(
                    (hour: any) =>
                        hour.startTime === appointment.startTime &&
                        hour.endTime === appointment.endTime
                );
                const isBreakTime = !!breakTimeAppointments.find(
                    ({ startTime, endTime }) =>
                        startTime === appointment.startTime &&
                        endTime === appointment.endTime
                );
                return (
                    <AppointmentCard
                        isBreakTime={isBreakTime}
                        key={i}
                        startTime={appointment.startTime}
                        endTime={appointment.endTime}
                        appointmentsRange={getAppointmentsRange}
                    />
                );
            })}
        </div>
    );
};

export default Appointment;
