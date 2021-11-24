/* eslint-disable import/prefer-default-export */
type DayDiffs = {
    startTime: Date;
    endTime: Date;
    appointmentDuration?: Number;
};
export const diffDaysInMinutes = ({
    startTime,
    endTime,
    appointmentDuration
}: DayDiffs) =>
    Math.round((endTime.getTime() - startTime.getTime()) / 60000) /
    Number(appointmentDuration);

export const isEvenDay = (day: Date) => new Date(day).getUTCDate() % 2 === 0;
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
