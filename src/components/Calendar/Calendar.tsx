import React, { FC, useState } from 'react';
import Swal from 'sweetalert2';
import { Calendar as AntCalendar, Layout, Badge, Button, Alert } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Styles from './Calendar.module.scss';

import {
    addDate,
    diffDaysInMinutes,
    EVEN_SCHEDULE,
    getAppointmentHours,
    getInitialDate,
    isEvenDay,
    ODD_SCHEDULE
} from '../../utils/utils';
import AppointmentDialog from '../AppointmentDialog/AppointmentDialog';
import {
    selectAppointments,
    setAppointment
} from '../../redux/appointmentSlice';
import Dot from '../Dot/Dot';

const { Content, Sider } = Layout;

const Calendar: FC = function () {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const dispatch = useDispatch();
    const currentAppointments = useSelector(selectAppointments);

    const getListData = (currentDay: moment.Moment) => {
        const currentDate = currentDay.format('DD[/]MM[/]YYYY');
        return currentAppointments
            .filter(
                (currentAppointment: any) =>
                    currentAppointment.date === currentDate
            )
            .map((appointment: any, idx: any) => ({ ...appointment, idx }));
    };
    const dateCellRender = (value: moment.Moment) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item: any) => (
                    <li key={item.idx}>
                        <Dot color={item.appointmentType.color} />
                    </li>
                ))}
            </ul>
        );
    };
    const disabledDate = (currentDay: moment.Moment) => {
        if (currentDay.isoWeekday() === 6) {
            return !isEvenDay(currentDay);
        }
        if (currentDay.isoWeekday() === 7) return true;
        return false;
    };
    const onNewAppointment = () => {
        const weeklyAppointments = getAppointmentsFromWeek(
            selectedDate,
            currentAppointments
        );
        const currentDayHasAppointments = currentAppointments.some(
            ({ date }: any) =>
                date === moment(selectedDate).format('DD[/]MM[/]YYYY')
        );
        if (weeklyAppointments.length < 2) {
            if (!currentDayHasAppointments) {
                setIsDialogVisible(true);
            } else {
                Swal.fire({
                    icon: 'error',
                    title: 'Error',
                    text: 'This day has already an appointment scheduled'
                });
            }
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'You can only schedule 2 appointments per week'
            });
        }
    };
    const onSubmitDialog = (data: any) => {
        dispatch(setAppointment(data));
        setIsDialogVisible(false);
    };
    const scheduleStartTime = isEvenDay(selectedDate)
        ? EVEN_SCHEDULE.OFFICE_HOUR.split('-')[0]
        : ODD_SCHEDULE.OFFICE_HOUR.split('-')[0];
    const scheduleEndTime = isEvenDay(selectedDate)
        ? EVEN_SCHEDULE.OFFICE_HOUR.split('-')[1]
        : ODD_SCHEDULE.OFFICE_HOUR.split('-')[1]; // TODO cambiar estos types por objetos
    const getAppointmentsFromWeek = (
        currentDate: Date,
        appointments: Array<any>
    ) => {
        const startDayWeek = moment(currentDate).startOf('week');
        const endDayWeek = moment(currentDate).endOf('week');
        return appointments.filter(({ date }: any) => {
            const year = Number(date.split('/')[2]);
            const month = Number((date.split('/')[1] as any) - 1);
            const day = Number(date.split('/')[0]);
            return moment(new Date(year, month, day)).isBetween(
                startDayWeek,
                endDayWeek
            );
        });
    };
    // TODO APPOINTMENNTCARD
    return (
        <Layout>
            {isDialogVisible && (
                <AppointmentDialog
                    date={selectedDate}
                    appointmentQuantity={diffDaysInMinutes({
                        startTime: getInitialDate(
                            selectedDate,
                            scheduleStartTime,
                            'hours'
                        ),
                        endTime: getInitialDate(
                            selectedDate,
                            scheduleEndTime,
                            'hours'
                        ),
                        appointmentDuration: 30
                    })}
                    appointmentDate={getInitialDate(
                        selectedDate,
                        scheduleStartTime,
                        'hours'
                    )}
                    visible={isDialogVisible}
                    onSubmit={onSubmitDialog}
                    onClose={() => setIsDialogVisible(false)}
                />
            )}
            <Sider className={Styles['sider-layout']} width={400}>
                <h1 className={Styles.title}>Appointment calendar</h1>
                <AntCalendar
                    disabledDate={disabledDate}
                    dateCellRender={dateCellRender}
                    onChange={(date) => setSelectedDate(date.toDate())}
                />
            </Sider>
            <Layout className="site-layout">
                <Content className={Styles['layout-content']}>
                    <div className="site-layout-background">
                        {moment(selectedDate).format('dddd, MMMM Do YYYY')}
                        <Button
                            onClick={onNewAppointment}
                            className={Styles.btn}
                            size="large"
                        >
                            Schedule appointment
                        </Button>
                        <Appointment
                            date={getInitialDate(
                                selectedDate,
                                scheduleStartTime,
                                'hours'
                            )}
                            numAppointments={diffDaysInMinutes({
                                startTime: getInitialDate(
                                    selectedDate,
                                    scheduleStartTime,
                                    'hours'
                                ),
                                endTime: getInitialDate(
                                    selectedDate,
                                    scheduleEndTime,
                                    'hours'
                                ),
                                appointmentDuration: 30
                            })}
                            selectedAppointments={currentAppointments}
                        />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

const Appointment = function ({
    numAppointments,
    date,
    selectedAppointments
}: any) {
    // TODO sacar esta funcion y hacer el dot
    const filterAppointmentsByDay = selectedAppointments.filter(
        (selectedAppointment: any) =>
            selectedAppointment.date === moment(date).format('DD[/]MM[/]YYYY')
    );
    const appointments = getAppointmentHours(numAppointments, date);
    return (
        <div className={Styles['grid-container']}>
            {appointments.map((appointmentHour) => {
                // TODO abstraer esta parte
                const filterHours = filterAppointmentsByDay.filter(
                    (appointment: any) =>
                        appointment.startTime === appointmentHour.startTime &&
                        appointment.endTime === appointmentHour.endTime
                );
                return (
                    <div
                        className={Styles['item-appointment']}
                        key={appointmentHour.id}
                    >
                        <div
                            className={Styles['appointment-hour']}
                        >{`${appointmentHour.startTime} - ${appointmentHour.endTime}`}</div>
                        <div>
                            {filterHours.map((hour: any) => (
                                <div key={hour.description}>
                                    <div
                                        className="dot"
                                        style={{
                                            backgroundColor:
                                                hour.appointmentType.color
                                        }}
                                    />
                                    {hour.description}
                                </div>
                            ))}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
export default Calendar;
