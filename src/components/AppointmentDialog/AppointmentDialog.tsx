import React, { useState, FC } from 'react';
import { Modal, Button, Input, Select } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { appointmentTypes } from '../../utils/utils';
import Styles from './AppointmentDialog.module.scss';

const { Option } = Select;

interface Props {
    visible: Boolean;
    onSubmit: any;
    onClose: any;
    date: Date;
}
const AppointmentDialog: FC<Props> = function ({
    visible,
    onSubmit,
    onClose,
    date
}) {
    const [appointmentDescription, setAppointmentDescription] = useState('');
    const [appointmentType, setAppointmentType] = useState(1);
    const onSelectChange = (value: any) => {
        setAppointmentType(value);
    };
    const onSubmitBtn = () => {
        onSubmit({
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
            <>
                <h4>Hour</h4>
                <Select
                    defaultValue={appointmentType}
                    className={Styles['select-appointment']}
                    onChange={onSelectChange}
                >
                    {appointmentTypes.map((type) => (
                        <Option key={type.id} value={type.id}>
                            <AppointmentOption type={type} />
                        </Option>
                    ))}
                </Select>
            </>

            <br />
            <br />
            <>
                <h4>Appointmet type</h4>
                <Select
                    defaultValue={appointmentType}
                    className={Styles['select-appointment']}
                    onChange={onSelectChange}
                >
                    {appointmentTypes.map((type) => (
                        <Option key={type.id} value={type.id}>
                            <AppointmentOption type={type} />
                        </Option>
                    ))}
                </Select>
            </>
            <br />
            <br />
            <>
                <h4>Appointment description</h4>
                <Input
                    type="text"
                    placeholder="Appointment description"
                    value={appointmentDescription}
                    maxLength={50}
                    onChange={(e) => setAppointmentDescription(e.target.value)}
                />
            </>
        </Modal>
    );
};
const AppointmentOption = function ({ type }: any) {
    return (
        <div className={Styles['option-container']}>
            <div
                className={Styles.dot}
                style={{ backgroundColor: type.color }}
            />
            <div>{type.description}</div>
        </div>
    );
};
export default AppointmentDialog;
