import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type TPayload = {
    appointments: Array<number>;
};

const appointmentSlice = createSlice({
    name: 'appointment',
    initialState: {
        appointments: []
    },
    reducers: {
        changeAppointment: (state, { payload }: PayloadAction<TPayload>) => {
            state.appointments = payload.appointments as any;
        }
    }
});

export const appointmentReducer = appointmentSlice.reducer;
export const { changeAppointment } = appointmentSlice.actions;
