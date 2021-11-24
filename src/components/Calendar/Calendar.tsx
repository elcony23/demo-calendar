import React, { FC, useState } from 'react';
import { Calendar as AntCalendar, Layout, Badge } from 'antd';
import moment from 'moment';
import Styles from './Calendar.module.scss';
import { diffDaysInMinutes, EVEN_SCHEDULE, isEvenDay } from '../../utils/utils';

const { Content, Footer, Sider } = Layout;

type TypeListData = {
    type: WarningTypes;
    content?: String;
};
type WarningTypes = 'warning' | 'error' | 'success';

const Calendar: FC = function () {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const getListData = (value: any) => {
        let listData;
        switch (value.date()) {
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
        }
        return listData || [];
    };
    const dateCellRender = (value: any) => {
        const listData = getListData(value);
        return (
            <ul className="events">
                {listData.map((item) => {
                    const { type } = item;
                    return (
                        <li key={item.content}>
                            <Badge status={type as WarningTypes} text="" />
                        </li>
                    );
                })}
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
    return (
        <Layout>
            <Sider className={Styles['sider-layout']} width={400}>
                <h1 style={{ color: 'white' }}>Calendar</h1>
                <AntCalendar
                    disabledDate={disabledDate}
                    dateCellRender={dateCellRender}
                    onChange={(date) => setSelectedDate(date.toDate())}
                />
            </Sider>
            <Layout className="site-layout" style={{ marginLeft: 200 }}>
                <Content style={{ margin: '24px 16px 0', overflow: 'initial' }}>
                    <div
                        className="site-layout-background"
                        style={{ padding: 24, textAlign: 'center' }}
                    >
                        {moment(selectedDate).format(
                            'dddd, MMMM Do YYYY, h:mm'
                        )}
                        <div style={{ color: 'blue' }}>
                            Donaldo
                            {isEvenDay(selectedDate) ? (
                                <>
                                    <Appointment
                                        date={
                                            new Date(
                                                moment(selectedDate)
                                                    .startOf('day')
                                                    .add(
                                                        EVEN_SCHEDULE.OFFICE_HOUR.split(
                                                            '-'
                                                        )[0],
                                                        'hours'
                                                    )
                                                    .toLocaleString()
                                            )
                                        }
                                        countAppointments={diffDaysInMinutes({
                                            startTime: new Date(
                                                moment(selectedDate)
                                                    .startOf('day')
                                                    .add(
                                                        EVEN_SCHEDULE.OFFICE_HOUR.split(
                                                            '-'
                                                        )[0],
                                                        'hours'
                                                    )
                                                    .toLocaleString()
                                            ),
                                            endTime: new Date(
                                                moment(selectedDate)
                                                    .startOf('day')
                                                    .add(
                                                        EVEN_SCHEDULE.OFFICE_HOUR.split(
                                                            '-'
                                                        )[1],
                                                        'hours'
                                                    )
                                                    .toLocaleString()
                                            ),
                                            appointmentDuration: 30
                                        })}
                                    />{' '}
                                </>
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

const Appointment = function ({ countAppointments, date }: any) {
    return (
        <div>
            {[...new Array(countAppointments)].map((value, i) => (
                <div key={10}>
                    <div>
                        {moment(date)
                            .add(30 * i, 'minutes')
                            .format('HH:mm')}
                    </div>

                    <div>
                        {moment(date)
                            .add(30 * (i + 1), 'minutes')
                            .format('HH:mm')}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default Calendar;
