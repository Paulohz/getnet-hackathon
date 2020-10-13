import React, { useEffect, useState, useCallback } from 'react';
import { useLocation } from 'react-router-dom';
import Button from '../../Components/Button';
import api from '../../services/api';

import {  useHistory } from 'react-router-dom';

import { FiShoppingCart } from 'react-icons/fi'

import { Container, ContainerProducts, Content } from './styles';
import Header from '../../Components/Header';

interface CompanyCategory {
    id: number;
    name: string;
    products: CompanyProducts[];
}

interface CompanyProducts {
    sku?: string;
    availability?: number;
    category_id?: number;
    company_id?: number;
    id: number;
    name: string;
    description: string;
    photo?: string;
    price: string;
    quantity: number;
}

/*interface BuyProducts {
    customer_id: number;
    company_id: number;
    paymentForm: string;
    finalPrice: number;
    products: CompanyProducts[];
}*/

const DisplayCompany: React.FC = () => {

    const history = useHistory();

    const [categories, setCategories] = useState<CompanyCategory[]>([]);

    //const [product, setProducts] = useState<CompanyProducts[]>([]);
    const [quantity, setQuantity] = useState<number>(0);

    const [cart, setCart] = useState<CompanyProducts[]>([]);

    let location = useLocation();
    useEffect(() => {
        api.get<CompanyCategory[]>(`products/indexByCompany/${location.state}`).then(response => {
            setCategories(response.data);

            response.data.map(category => (

                category.products.map(product => {
                    product.quantity = 1;
                    const valor = product.price as string;
                    product.price = valor.replace("R$","")
                    console.log(product)
                    return product;
                }
                )
            ));




        });
    }, [location]);

    const handleCart = async (products: CompanyProducts) => {

        setCart([...cart, products]);

        console.log(cart);
        setQuantity(quantity + 1);
    }

    const handlePlus = (products: CompanyProducts) => {
        products.quantity++;

    }

    const handleMinus = (products: CompanyProducts) => {
        if (products.quantity > 1) {
            products.quantity--;
        }

    }

    const handleSubmit = useCallback(
        async () => {
            try {
                const ultimatePrice = cart.reduce((accum,obj) => accum + parseFloat(obj.price),0);
                console.log(ultimatePrice);
                await api.post('/sales/create', {
                    customer_id: 1,
                    company_id: 1,
                    paymentForm: 'Débito',
                    finalPrice:  ultimatePrice,
                    products: cart.map((product: CompanyProducts) => {
                        delete product.availability;
                        delete product.category_id;
                        delete product.company_id;
                        delete product.photo;
                        product.sku = "";

                    })
                    ,
                });

                history.push('/home');


            } catch (err) {

                console.log('erro no cadastro')

            }
        },
        [cart, history],
    );


    return (
        <>
            <Header />
            <Container>


                <div>
                    <FiShoppingCart size={20} />
                    {quantity}

                    <Button type="submit" onClick={() => handleSubmit()} >Finalizar compra</Button>
                </div>

                {categories.map(category => (
                    <div key={category.id}>
                        <h2>{category.name}</h2>


                        <ContainerProducts >

                            {category.products.map((products) => (
                                <Content key={products.id}>


                                    <div>
                                        <h3>{products.id}. {products.name}</h3>
                                        <p> {products.description} </p>
                                        <span>{products.price}</span>

                                        <Button type="submit" onClick={() => { handleCart(products) }} >Adicionar</Button>
                                        <br />
                                        <br />

                                        <button type="submit" onClick={() => { handlePlus(products) }}>
                                            +
                                    </button>

                                        <button type="submit" onClick={() => { handleMinus(products) }}>
                                            -
                                    </button>

                                    </div>
                                    <div>
                                        <img src={products.photo} alt={products.name} />
                                    </div>


                                </Content>
                            ))}
                        </ContainerProducts>
                    </div>
                ))}
            </Container>

        </>
    );
}

export default DisplayCompany;