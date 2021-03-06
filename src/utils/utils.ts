/* eslint-disable import/prefer-default-export */
import moment from 'moment';
import { IAppointmentType } from '../interfaces/interfaces';

type DayDiffs = {
    startTime: Date;
    endTime: Date;
    appointmentDuration?: Number;
};
type TAddDate = {
    date: Date;
    quantity: Number;
    type: String;
};
export const diffDaysInMinutes = ({
    startTime,
    endTime,
    appointmentDuration
}: DayDiffs) =>
    Math.round((endTime.getTime() - startTime.getTime()) / 60000) /
    Number(appointmentDuration);

export const isEvenDay = (day: Date | moment.Moment) =>
    (moment(day).format('D') as any) % 2 === 0;
export const EVEN_SCHEDULE = {
    START_TIME: '08:00',
    END_TIME: '14:00',
    BREAK_TIME: [{ startTime: '11:00', endTime: '11:30' }]
};
export const ODD_SCHEDULE = {
    START_TIME: '13:00',
    END_TIME: '19:00',
    BREAK_TIME: [{ startTime: '16:00', endTime: '16:30' }]
};
export const addDate = ({ date, quantity, type }: TAddDate) =>
    moment(date).add(quantity as any, type as string);

export const APPOINTMENT_COLOR = {
    DESIGN: '#3777FF',
    DEV: '#FFBE86',
    RH: '#FFB5C2'
};
export const appointmentTypes: IAppointmentType[] = [
    {
        id: 1,
        description: 'Design board',
        color: APPOINTMENT_COLOR.DESIGN
    },
    {
        id: 2,
        description: 'Developers board',
        color: APPOINTMENT_COLOR.DEV
    },
    {
        id: 3,
        description: 'RH board',
        color: APPOINTMENT_COLOR.RH
    }
];
export const getInitialDate = (
    date: any,
    quantity: number | string,
    type: string
) =>
    new Date(
        moment(date)
            .startOf('day')
            .add(quantity as any, type as string)
            .toLocaleString()
    );

export const getAppointmentHours = (quantity: number, date: any) =>
    [...new Array(quantity)].map((_, i) => {
        const startTime = addDate({
            date,
            quantity: 30 * i,
            type: 'minutes'
        }).format('HH:mm');
        const endTime = addDate({
            date,
            quantity: 30 * (i + 1),
            type: 'minutes'
        }).format('HH:mm');
        return {
            id: i,
            startTime,
            endTime
        };
    });
