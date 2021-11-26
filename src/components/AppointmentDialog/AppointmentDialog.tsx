import React, { useState, FC, memo } from 'react';
import { Modal, Button, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { appointmentTypes, getAppointmentHours } from '../../utils/utils';
import Styles from './AppointmentDialog.module.scss';
import Dot from '../Dot/Dot';
import { IAppointmentType } from '../../interfaces/interfaces';

const { Option } = Select;

interface Props {
    visible: Boolean;
    onSubmit: any;
    onClose: any;
    date: Date;
    appointmentQuantity: number;
    appointmentDate: any;
}
const AppointmentDialog: FC<Props> = memo(
    ({
        visible,
        onSubmit,
        onClose,
        date,
        appointmentDate,
        appointmentQuantity
    }) => {
        const [appointmentDescription, setAppointmentDescription] =
            useState('');
        const [appointmentType, setAppointmentType] = useState(1);
        const [appointmentHourSelected, setAppointmentHour] = useState(0);
        const appointmentHours = getAppointmentHours(
            appointmentQuantity,
            appointmentDate
        );
        const onSelectChange = (value: any) => {
            setAppointmentType(value);
        };
        const onSubmitBtn = () => {
            const { startTime, endTime } =
                appointmentHours.find(
                    ({ id }) => id === appointmentHourSelected
                ) || {};
            onSubmit({
                date: moment(date).format('DD[/]MM[/]YYYY'),
                startTime,
                endTime,
                appointmentType: appointmentTypes.find(
                    ({ id }) => id === appointmentType
                ),
                description: appointmentDescription
            });
        };
        return (
            <Modal
                title={`Schedule appointment to ${moment(date).format(
                    'DD[/]MM[/]YYYY'
                )}`}
                visible={visible as any}
                okText="Add"
                cancelText="Close"
                onCancel={onClose}
                footer={[
                    <Button key="back" onClick={onClose}>
                        Close
                    </Button>,
                    <Button
                        disabled={!appointmentDescription}
                        key="submit"
                        type="primary"
                        onClick={onSubmitBtn}
                    >
                        Add
                    </Button>
                ]}
            >
                <h4>Hour</h4>
                <Select
                    defaultValue={appointmentHourSelected}
                    className={Styles['select-appointment']}
                    onChange={(value) => setAppointmentHour(value)}
                >
                    {appointmentHours.map((appointmentHour) => (
                        <Option
                            key={appointmentHour.id}
                            value={appointmentHour.id}
                        >
                            <div>{`${appointmentHour.startTime} - ${appointmentHour.endTime}`}</div>
                        </Option>
                    ))}
                </Select>
                <>
                    <h4>Type</h4>
                    <Select
                        defaultValue={appointmentType}
                        className={Styles['select-appointment']}
                        onChange={onSelectChange}
                    >
                        {appointmentTypes.map((type: IAppointmentType) => (
                            <Option
                                key={Number(type.id)}
                                value={Number(type.id)}
                            >
                                <Dot
                                    isVisibleDescription
                                    color={type.color}
                                    description={type.description}
                                />
                            </Option>
                        ))}
                    </Select>
                </>
                <>
                    <h4>Description</h4>
                    <Input
                        type="text"
                        placeholder="Appointment description"
                        value={appointmentDescription}
                        maxLength={50}
                        onChange={(e) =>
                            setAppointmentDescription(e.target.value)
                        }
                    />
                </>
            </Modal>
        );
    }
);
export default AppointmentDialog;
