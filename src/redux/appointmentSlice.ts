import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const appointmentSlice = createSlice({
    name: 'appointments',
    initialState: {
        appointments: []
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
