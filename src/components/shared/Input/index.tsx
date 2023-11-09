import React from 'react';
import { Input } from 'reactstrap';
import { InputType } from 'reactstrap/types/lib/Input';

interface InputsProps {
    className?: string;
    type?: InputType; // Use the correct type from 'reactstrap'
    props?: object;
    placeholder?: string
}

const Inputs: React.FC<InputsProps> = ({
    className,
    type,
    placeholder,
    ...props
}) => {
    return (
        <Input className={`${className} border-[1px] dark:bg-dark_light_bg_ dark:text-dark_text_ dark:border-dark_border_ dark:placeholder:text-dark_text_ border-light_border_`} {...props} type={type} placeholder={placeholder} />
    );
};

export default Inputs;
