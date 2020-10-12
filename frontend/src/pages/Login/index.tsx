import React, { useCallback, useRef } from 'react';

import api from '../../services/api';

import { Link, useHistory } from 'react-router-dom';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import Input from '../../Components/Input';
import Button from '../../Components/Button';

import { Container, Content } from './styles';

interface SignInFormData {
    email: string;
    password: string;

}


const Login: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();

    const handleSubmit = useCallback(
        async (data: SignInFormData) => {
            try {
                //formRef.current?.setErrors({});
               //console.log(data);

                await api.post('/loginCustomer', data);

               history.push('/home');


            } catch (err) {

                console.log('erro no cadastro')

            }
        },
        [history],
    );

    return (
        <Container>

            <Content>
                <h1>Faça seu login</h1>

                <Form ref={formRef} onSubmit={handleSubmit}>
                    <Input name="email" placeholder="Email" />
                    <Input name="password" placeholder="Senha" type="password" />
                    
                    <Button type="submit">Entrar</Button>

                </Form>

                <span>
                    <Link to="/signup">Não tem uma conta? (Cliente)</Link>
                    <br />
                    <Link to="/signup">Não tem uma conta? (Empreendedor)</Link>
                </span>


            </Content>


        </Container>
    );
};

export default Login;