import moment from 'moment';
import React, { FC } from 'react';
import Dot from '../Dot/Dot';
import Styles from './AppointmentCard.module.scss';

interface Props {
    startTime: string;
    endTime: string;
    appointmentsRange: Array<any>;
    isBreakTime?: Boolean;
}
const AppointmentCard: FC<Props> = function ({
    startTime,
    endTime,
    appointmentsRange,
    isBreakTime
}) {
    return (
        <div className={Styles['item-appointment']}>
            <div
                className={Styles['appointment-hour']}
            >{`${startTime} - ${endTime}`}</div>
            <div className={Styles['dot-container']}>
                {isBreakTime ? (
                    <div>Break time</div>
                ) : (
                    appointmentsRange.map((range: any, index) => (
                        <Dot
                            key={index}
                            color={range.appointmentType.color}
                            description={range.description}
                            isVisibleDescription
                        />
                    ))
                )}
            </div>
        </div>
    );
};

AppointmentCard.defaultProps = {
    isBreakTime: false
};
export default AppointmentCard;
