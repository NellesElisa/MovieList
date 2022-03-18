import * as React from 'react';
import styled  from 'styled-components';

interface ButtonProps {
    label: string;
    click: () => void;
    active: boolean;
}

const But = styled.button`
    width:130px;
        border-radius: 20px;
        font-family: Montserrat, sans-serif;
        background:white;
`

const Button2: React.FC<ButtonProps> = (props: ButtonProps) => {
    return (
        <But
            onClick={props.click}
            className={props.active ? 'active' : 'passive'}
        >
            {props.label}
        </But>
    )
};

export default Button2;