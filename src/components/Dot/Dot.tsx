import React, { FC } from 'react';
import Styles from './Dot.module.scss';

interface DotProps {
    color: string;
    isVisibleDescription?: Boolean;
    description?: String;
}
const Dot: FC<DotProps> = function ({
    color,
    isVisibleDescription,
    description
}) {
    return (
        <div className={Styles['option-container']}>
            <div className={Styles.dot} style={{ backgroundColor: color }} />
            {isVisibleDescription && <div>{description}</div>}
        </div>
    );
};

Dot.defaultProps = {
    isVisibleDescription: false,
    description: ''
};
export default Dot;
