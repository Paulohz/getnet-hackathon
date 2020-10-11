import React from 'react';

import { Container } from './styles'

interface InputProps {
    name: string;
}

const Input: React.FC<InputProps> = ({ name }) => {
    return (
        <>
            <Container>

                <span>{name}</span>
                <input type="text" />
            </Container>
        </>

    )
}

export default Input;