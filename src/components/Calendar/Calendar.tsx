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
    getInitialDate,
    isEvenDay
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
        let listData;
        const currentDate = moment(value).format('YYYY-MM-DD');
        return currentAppointments.filter(
            (currentAppointment: any) =>
                moment(currentAppointment.date).format('YYYY-MM-DD') ===
                currentDate
        );
        /* switch (value) {
            case 8:
                listData = [
                    { type: 'warning', content: 'This is warning event.' },
                    { type: 'success', content: 'This is usual event.' }
                ];
                break;
            case 10:
                listData = [
                    { type: 'warning', content: 'This is warning event.' },
                    { type: 'success', content: 'This is usual event.' },
                    { type: 'error', content: 'This is error event.' }
                ];
                break;
            case 15:
                listData = [
                    { type: 'warning', content: 'This is warning event' },
                    {
                        type: 'success',
                        content: 'This is very long usual event。。....'
                    },
                    { type: 'error', content: 'This is error event 1.' },
                    { type: 'error', content: 'This is error event 2.' },
                    { type: 'error', content: 'This is error event 3.' },
                    { type: 'error', content: 'This is error event 4.' }
                ];
                break;
            default:
                listData = [{ type: '', content: '' }];
                break;
        } */
    };
    const dateCellRender = (value: any) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item: any) => (
                    <li key={item.date}>
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
        dispatch(
            setAppointment({
                ...data,
                date: moment().format('YYYY-MM-DD HH:mm')
            })
        );
        setVisibleDialog(false);
    };
    return (
        <Layout>
            <AppointmentDialog
                visible={visibleDialog}
                onSubmit={onSubmitDialog}
                onClose={() => setVisibleDialog(false)}
            />
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
                            Donaldo
                            {isEvenDay(selectedDate) ? (
                                <Appointment
                                    onClick={onAppoinmentClick}
                                    date={getInitialDate(
                                        selectedDate,
                                        EVEN_SCHEDULE.OFFICE_HOUR.split('-')[0],
                                        'hours'
                                    )}
                                    countAppointments={diffDaysInMinutes({
                                        startTime: getInitialDate(
                                            selectedDate,
                                            EVEN_SCHEDULE.OFFICE_HOUR.split(
                                                '-'
                                            )[0],
                                            'hours'
                                        ),
                                        endTime: getInitialDate(
                                            selectedDate,
                                            EVEN_SCHEDULE.OFFICE_HOUR.split(
                                                '-'
                                            )[1],
                                            'hours'
                                        ),
                                        appointmentDuration: 30
                                    })}
                                />
                            ) : (
                                'rojo'
                            )}
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
            {[...new Array(countAppointments)].map((value, i) => {
                const startHour = addDate({
                    date,
                    quantity: 30 * i,
                    type: 'minutes'
                }).format('HH:mm');
                const endHour = addDate({
                    date,
                    quantity: 30 * (i + 1),
                    type: 'minutes'
                }).format('HH:mm');
                return (
                    <div
                        role="none"
                        onClick={() => onClick(date)}
                        key={`${startHour} - ${endHour}`}
                    >{`${startHour} - ${endHour}`}</div>
                );
            })}
        </div>
    );
};
export default Calendar;
