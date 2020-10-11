import React from 'react';
import Input from '../../Components/Input';

import { Container, Content } from './styles';

const SignUp: React.FC = () => {
    return (
        <Container>

            <Content>
                <h1>Faça seu login</h1>

                <Input name="Nome completo" />
                <Input name="Email" />
                <Input name="Senha" />
                <Input name="CPF" />
                <Input name="Telefone" />
                <Input name="Endereço" />

                <button>Entrar</button>

                <span>Sou empresario</span>

            </Content>


        </Container>
    );
};

export default SignUp;