import { createSlice } from '@reduxjs/toolkit';
import { randomAppointments } from '../utils/randomAppointments';

const appointmentSlice = createSlice({
    name: 'appointments',
    initialState: {
        appointments: randomAppointments
    },
    reducers: {
        setAppointment: (state, action) => {
            const data = [...state.appointments, action.payload];
            state.appointments = data as any;
        }
    }
});

export const appointmentReducer = appointmentSlice.reducer;
export const { setAppointment } = appointmentSlice.actions;
export const selectAppointments = (state: any) =>
    state.appointments.appointments;
