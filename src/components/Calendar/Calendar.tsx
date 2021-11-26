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
import { IAppointmentReducer } from '../../interfaces/interfaces';
import Appointment from '../Appointment/Appointment';

const { Content, Sider } = Layout;

const Calendar: FC = function () {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [isDialogVisible, setIsDialogVisible] = useState(false);
    const dispatch = useDispatch();
    const currentAppointments = useSelector(selectAppointments);
    const getListData = (currentDay: moment.Moment) => {
        const currentDate = currentDay.format('DD[/]MM[/]YYYY');
        return currentAppointments.filter(
            (currentAppointment: any) => currentAppointment.date === currentDate
        );
    };
    const dateCellRender = (value: moment.Moment) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item: IAppointmentReducer, i: number) => (
                    <li key={i}>
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
            ({ date }: IAppointmentReducer) =>
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
    const onSubmitDialog = (data: IAppointmentReducer) => {
        dispatch(setAppointment(data));
        setIsDialogVisible(false);
    };
    const getSpecialPeriod = (date: Date) =>
        isEvenDay(date) ? EVEN_SCHEDULE.BREAK_TIME : ODD_SCHEDULE.BREAK_TIME;

    const scheduleStartTime = isEvenDay(selectedDate)
        ? EVEN_SCHEDULE.START_TIME
        : ODD_SCHEDULE.START_TIME;

    const scheduleEndTime = isEvenDay(selectedDate)
        ? EVEN_SCHEDULE.END_TIME
        : ODD_SCHEDULE.END_TIME;

    const getAppointmentsFromWeek = (
        currentDate: Date,
        appointments: Array<IAppointmentReducer>
    ) => {
        const startDayWeek = moment(currentDate).startOf('week');
        const endDayWeek = moment(currentDate).endOf('week');
        return appointments.filter(({ date }: IAppointmentReducer) => {
            const year = Number(date.split('/')[2]);
            const month = Number((date.split('/')[1] as any) - 1);
            const day = Number(date.split('/')[0]);
            return moment(new Date(year, month, day)).isBetween(
                startDayWeek,
                endDayWeek
            );
        });
    };
    return (
        <Layout>
            {isDialogVisible && (
                <AppointmentDialog
                    date={selectedDate}
                    breakTime={getSpecialPeriod(selectedDate)}
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
                        <div className={Styles['container-create-appointment']}>
                            <div className={Styles['selected-date']}>
                                {moment(selectedDate).format(
                                    'dddd, MMMM Do YYYY'
                                )}
                            </div>
                            <Button
                                onClick={onNewAppointment}
                                className={Styles.btn}
                                size="large"
                            >
                                Schedule appointment
                            </Button>
                        </div>
                        <Appointment
                            breakTimeAppointments={getSpecialPeriod(
                                selectedDate
                            )}
                            scheduledAppointments={currentAppointments}
                            currentDate={getInitialDate(
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
                        />
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};
export default Calendar;
