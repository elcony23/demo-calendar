export interface IAppointmentType {
    id: Number;
    description: String;
    color: String;
}
export interface IAppointmentReducer {
    date: String;
    startTime: String;
    endTime: String;
    appointmentType: IAppointmentType;
    description: String;
}
