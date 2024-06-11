import React from 'react';
import {Spinner as Spinners} from "@nextui-org/react";

interface SpinnerProps {}

const Spinner: React.FC<SpinnerProps> = () => {
    return (
        <div className='fixed top-0 left-0 w-full h-full flex justify-center items-center'>
            <Spinners size='lg'/>
        </div>
    );
};

export default Spinner;