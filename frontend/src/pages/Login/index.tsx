import React from 'react';
import { Link } from 'react-router-dom';
import Input from '../../Components/Input';

import { Container, Content } from './styles';


const Login: React.FC = () => {
    return (
        <Container>

            <Content>
                <h1>Faça seu login</h1>

                <Input name="Email" />
                <Input name="Senha" />


                <button>Entrar</button>

                <Link to="/signup">Não tem uma conta? Registre-se</Link>

            </Content>


        </Container>
    );
};

export default Login;