import moment from 'moment';
import React, { FC } from 'react';
import Dot from '../Dot/Dot';
import Styles from './AppointmentCard.module.scss';

interface Props {
    startTime: string;
    endTime: string;
    appointmentsRange: Array<any>;
}
const AppointmentCard: FC<Props> = function ({
    startTime,
    endTime,
    appointmentsRange
}) {
    return (
        <div className={Styles['item-appointment']}>
            <div
                className={Styles['appointment-hour']}
            >{`${startTime} - ${endTime}`}</div>
            <div className={Styles['dot-container']}>
                {appointmentsRange.map((range: any, index) => (
                    <Dot
                        key={index}
                        color={range.appointmentType.color}
                        description={range.description}
                        isVisibleDescription
                    />
                ))}
            </div>
        </div>
    );
};

export default AppointmentCard;
