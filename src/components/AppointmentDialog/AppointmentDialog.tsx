import React, { useState, FC } from 'react';
import { Modal, Button, Input, Select } from 'antd';
import { appointmentTypes } from '../../utils/utils';
import Styles from './AppointmentDialog.module.scss';

const { Option } = Select;

interface Props {
    visible: Boolean;
}
const AppointmentDialog: FC<Props> = function ({ visible }) {
    const [appointmentDescription, setAppointmentDescription] = useState('');
    const [appointmentType, setAppointmentType] = useState(1);
    const onSelectChange = (value: any) => {
        setAppointmentType(value);
    };
    const onClose = () => {};
    const onSubmit = () => {
        console.log(
            appointmentTypes.find(({ id }) => id === appointmentType),
            appointmentDescription
        );
    };
    return (
        <Modal
            title="Appointment Dialog"
            visible={visible as any}
            okText="Add"
            cancelText="Close"
            footer={[
                <Button key="back">Close</Button>,
                <Button
                    disabled={!appointmentDescription}
                    key="submit"
                    type="primary"
                    onClick={onSubmit}
                >
                    Add
                </Button>
            ]}
        >
            <Select
                defaultValue={appointmentType}
                className={Styles['select-appointment']}
                onChange={onSelectChange}
            >
                {appointmentTypes.map((type) => (
                    <Option key={type.id} value={type.id}>
                        <div className={Styles['option-container']}>
                            <div
                                className={Styles.dot}
                                style={{ backgroundColor: type.color }}
                            />
                            <div>{type.description}</div>
                        </div>
                    </Option>
                ))}
            </Select>
            <Input
                type="text"
                placeholder="Appointment description"
                value={appointmentDescription}
                maxLength={50}
                onChange={(e) => setAppointmentDescription(e.target.value)}
            />
        </Modal>
    );
};

export default AppointmentDialog;