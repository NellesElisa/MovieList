import * as React from 'react';
import styled  from 'styled-components';

interface ButtonProps {
    label: string;
    click: () => void;
    active: boolean;
}

const But1 = styled.button`
        width: 25%;
        border-radius: 20px;
        box-shadow: 4px 4px 60px rgba(0, 0, 0, 0.2);
        font-family: Montserrat, sans-serif;
        background: rgba(68, 56, 236, 0.596);
        margin-top: 20px;
        margin-bottom: 20px;
        color: white;
      }
`

const Button:React.FC<ButtonProps> = (props : ButtonProps) => {
    return (
                <But1
                    onClick={props.click}
                    className={props.active ? 'active' : 'passive'}
                >
                    {props.label}
                </But1>
    )
};

export default Button;