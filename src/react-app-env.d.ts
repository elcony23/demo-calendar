/// <reference types="react-scripts" />

interface AppointmentDialogProps {
    visible: Boolean;
}
interface AppointmentType {
    id: Number;
    description: String;
    color: String;
}
interface IAppointReducer {
    date: String;
    startTime: String;
    endTime: String;
    appointmentType: AppointmentType;
    description: String;
}
