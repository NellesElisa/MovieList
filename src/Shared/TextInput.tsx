import * as React from 'react';

interface InputProps {
    name?: string;
    label: string;
    type: string;
    value: string | null;
    action: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput:React.FC<InputProps> = (props:InputProps) => {

    return (
        <div>
            <label htmlFor={props.name}>
                {props.label}
            </label>
            <input
                type={props.type}
                name={props.name}
                value={props.value != null ? props.value : ''}
                onChange={event => props.action(event)}
            />
        </div>
    );
};

export default TextInput;