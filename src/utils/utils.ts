/* eslint-disable import/prefer-default-export */
import moment from 'moment';

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

export const isEvenDay = (day: Date) =>
    (moment(day).format('D') as any) % 2 === 0;
export const EVEN_SCHEDULE = {
    OFFICE_HOUR: '08:00-14:00',
    BREAK_TIME: '11:00-11:30'
};
export const ODD_SCHEDULE = {
    OFFICE_HOUR: '13:00-19:00',
    BREAK_TIME: '16:00-16:30'
};
export const SATURDAY_EVEN_SCHEDULE = {
    OFFICE_HOUR: '08:00-19:00',
    BREAK_TIME: '11:00-11:30'
};
export const addDate = ({ date, quantity, type }: TAddDate) =>
    moment(date).add(quantity as any, type as string);

export const APPOINTMENT_COLOR = {
    DESIGN: '#3777FF',
    DEV: '#FFBE86',
    RH: '#FFB5C2'
};
export const appointmentTypes = [
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
