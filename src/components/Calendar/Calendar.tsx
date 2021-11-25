import React, { FC, useState } from 'react';
import { Calendar as AntCalendar, Layout, Badge } from 'antd';
import moment from 'moment';
import { useDispatch, useSelector } from 'react-redux';
import Item from 'antd/lib/list/Item';
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

const { Content, Footer, Sider } = Layout;

type TypeListData = {
    type: WarningTypes;
    content?: String;
};
type WarningTypes = 'warning' | 'error' | 'success';

const Calendar: FC = function () {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [visibleDialog, setVisibleDialog] = useState(false);
    const dispatch = useDispatch();
    const currentAppointments = useSelector(selectAppointments);

    const getListData = (value: any) => {
        const currentDate = moment(value).format('DD[/]MM[/]YYYY');
        return currentAppointments
            .filter(
                (currentAppointment: any) =>
                    currentAppointment.date === currentDate
            )
            .map((appointment: any, idx: any) => ({ ...appointment, idx }));
    };
    const dateCellRender = (value: any) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item: any) => (
                    <li key={item.idx}>
                        <div
                            className="dot"
                            style={{
                                backgroundColor: item.appointmentType.color
                            }}
                        />
                    </li>
                ))}
            </ul>
        );
    };
    const disabledDate = (currentDay: any) => {
        let disabled = false;
        switch (currentDay.isoWeekday()) {
            case 6:
                disabled = !isEvenDay(currentDay);
                break;
            case 7:
                disabled = true;
                break;
            default:
        }
        return disabled;
    };
    const onAppoinmentClick = (hour: any) => {
        setVisibleDialog(true);
    };
    const onSubmitDialog = (data: any) => {
        dispatch(setAppointment(data));
        setVisibleDialog(false);
    };
    const scheduleStartTime = isEvenDay(selectedDate)
        ? EVEN_SCHEDULE.OFFICE_HOUR.split('-')[0]
        : ODD_SCHEDULE.OFFICE_HOUR.split('-')[0];
    const scheduleEndTime = isEvenDay(selectedDate)
        ? EVEN_SCHEDULE.OFFICE_HOUR.split('-')[1]
        : ODD_SCHEDULE.OFFICE_HOUR.split('-')[1];

    return (
        <Layout>
            {visibleDialog && (
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
                    visible={visibleDialog}
                    onSubmit={onSubmitDialog}
                    onClose={() => setVisibleDialog(false)}
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
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div
                        className="site-layout-background"
                        style={{ padding: 24, textAlign: 'center' }}
                    >
                        {moment(selectedDate).format('dddd, MMMM Do YYYY')}
                        <div style={{ color: 'blue' }}>
                            <Appointment
                                onClick={onAppoinmentClick}
                                date={getInitialDate(
                                    selectedDate,
                                    scheduleStartTime,
                                    'hours'
                                )}
                                countAppointments={diffDaysInMinutes({
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
                    </div>
                </Content>
            </Layout>
        </Layout>
    );
};

const Appointment = function ({ countAppointments, date, onClick }: any) {
    return (
        <div className={Styles['grid-container']}>
            {getAppointmentHours(countAppointments, date).map(
                (appointmentHour) => (
                    <div
                        role="none"
                        onClick={onClick}
                        key={appointmentHour.id}
                    >{`${appointmentHour.startTime} - ${appointmentHour.endTime}`}</div>
                )
            )}
        </div>
    );
};
export default Calendar;
