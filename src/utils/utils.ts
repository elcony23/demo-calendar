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
