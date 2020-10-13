import React, { useCallback, useRef } from 'react';

import { Link, useHistory } from 'react-router-dom';
import { FiArrowLeft } from 'react-icons/fi';

import api from '../../services/api';

import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';

import Input from '../../Components/Input';
import Button from '../../Components/Button';


import { Container, Content } from './styles';


interface SignUpFormData {
    first_name: string;
    last_name: string;
    telephone: string;
    cpf: string;
    adress: string;
    number: number;
    complementary: string;
    neighborhood: string;
    city: string;
    state: string;
    zipcode: string;
    country: string;
    email: string;
    password: string;
    avatar: string;
}

const SignUp: React.FC = () => {
    const formRef = useRef<FormHandles>(null);
    const history = useHistory();

    const handleSubmit = useCallback(
        async (data: SignUpFormData) => {
            try {
                //formRef.current?.setErrors({});
               //console.log(data);

                await api.post('/customers/create', data);

               history.push('/');


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
                    <Input  name="first_name" placeholder="Primeiro nome" />
                    <Input  name="last_name" placeholder="Último nome" />
                    <Input  name="telephone" placeholder="Telefone" />
                    <Input  name="cpf" placeholder="CPF" />
                    <Input  name="adress" placeholder="Endereço" />
                    <Input  name="number" placeholder="Número" />
                    <Input  name="complementary" placeholder="Complemento" />
                    <Input  name="neighborhood" placeholder="Bairro" />
                    <Input  name="city" placeholder="Cidade" />
                    <Input  name="state" placeholder="Estado" />
                    <Input  name="zipcode" placeholder="CEP" />
                    <Input  name="country" placeholder="País" />
                    <Input  name="email" placeholder="Email" />
                    <Input  name="password" placeholder="Senha" />
                    <Input  name="avatar" placeholder="Avatar" />



                    <Button type="submit">Cadastrar</Button>
                </Form>



                <span>Sou empresario</span>

                <Link to="/">
                    <FiArrowLeft />
            Voltar para logon
          </Link>

            </Content>


        </Container>
    );
};

export default SignUp;