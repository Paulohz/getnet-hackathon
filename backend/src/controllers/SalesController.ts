import {Request, Response} from 'express'

import db from '../database/connection';
import axios from 'axios'
import AuthenticationController from './AuthenticationController'

interface Products {
    product_id?: number;
    id?: number;
    name: string;
    description: string;
    value?: string;
    price?: string;
    quantity: number
    sku: string;
}

interface Customers {
    first_name?: string;
    last_name?: string;
    telephone?: string;
    cpf?: string;
    adress?: string;
    number?: number;
    complementary?: string;
    neighborhood?: string;
    city?: string;
    state?: string;
    zipcode?: string;
    country?: string;
    email?: string;
}

interface Token{
    access_token: string
}

export default class SalesController {
    async indexByCompany(request:Request, response:Response){
        const {companyId} = request.params

        const searchedSales = await db('sales')
            .distinct()
            .select('*')
            .where('sales.company_id',companyId)

        const a = await returnJson()

        return response.json(a)

        async function returnJson(){
            const finalArray = await Promise.all(searchedSales.map(async sale => {
                const salesItens = await db('sales')
                    .join('carts', 'sales.id', '=', 'carts.sale_id')
                    .join('products', 'carts.product_id', '=', 'products.id')
                    .select('carts.id', 'carts.product_id', 'carts.value', 'carts.quantity', 'products.name')
                    .where('sales.company_id',companyId)
                    .where('sales.id',sale.id);
    
                sale.items = salesItens;
                return sale;
            }))

            return finalArray
        }
    }

    async indexByCompanyByMonth(request:Request, response:Response){
        const filters = request.query;

        const companyId = filters.companyId as unknown as number;
        const initialDate = filters.initialDate; //No formato AAAA-MM-DD
        const finalDate = filters.finalDate;

        const searchedSales = await db('sales')
            .distinct()
            .select('*')
            .where('sales.company_id',companyId)
            .where('sales.created_at', '>=', `${initialDate} 00:00:00`)
            .where('sales.created_at', '<', `${finalDate} 00:00:00`)

        const a = await returnJson()

        return response.json(a)

        async function returnJson(){
            const finalArray = await Promise.all(searchedSales.map(async sale => {
                const salesItens = await db('sales')
                    .join('carts', 'sales.id', '=', 'carts.sale_id')
                    .join('products', 'carts.product_id', '=', 'products.id')
                    .select('carts.id', 'carts.product_id', 'carts.value', 'carts.quantity', 'products.name')
                    .where('sales.company_id',companyId)
                    .where('sales.id',sale.id)
                    .where('sales.created_at', '>=', `${initialDate}T00:00:00Z`)
                    .where('sales.created_at', '<', `${finalDate}T00:00:00Z`)
    
                sale.items = salesItens;
                return sale;
            }))

            return finalArray
        }
    }

    async indexByCustomer(request:Request, response:Response){
        const {customerId} = request.params

        const searchedSales = await db('sales')
            .distinct()
            .select('*')
            .where('sales.customer_id',customerId)

        const a = await returnJson()

        return response.json(a)

        async function returnJson(){
            const finalArray = await Promise.all(searchedSales.map(async sale => {
                const salesItens = await db('sales')
                    .join('carts', 'sales.id', '=', 'carts.sale_id')
                    .join('products', 'carts.product_id', '=', 'products.id')
                    .select('carts.id', 'carts.product_id', 'carts.value', 'carts.quantity', 'products.name')
                    .where('sales.customer_id',customerId)
                    .where('sales.id',sale.id);
    
                sale.items = salesItens;
                return sale;
            }))

            return finalArray
        }
    }

    async create(request: Request, response:Response) {
        const filters = request.query;

        const x_access_token = request.headers['x-access-token']
        
        var {
            customer_id,
            company_id,
            paymentForm,
            finalPrice,
            products
        } = request.body;

        if(filters.userid){
            customer_id = filters.userid
        }

        const trx = await db.transaction();
    
        try {
            const insertedSaleId = await trx('sales').insert({
                customer_id,
                company_id,
                paymentForm,
                finalPrice,  
            });
        
        const arrayIds = await Promise.all(products.map(async(product: Products) => {
            const {product_id, value, quantity} = product;

            const insertedCartId = await trx('carts').insert({
                sale_id: insertedSaleId,
                product_id,
                value,
                quantity
            })
            return insertedCartId
        }))
        
        await trx.commit();

        let token = ''
        
        await axios.get('http://localhost:3333/sales/authenticationGetNet', {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': x_access_token
            }
        }).then(res => {
            token = res.data.access_token
        })

        let customer: Customers = {}

        await axios.get('http://localhost:3333/companies/index/'+customer_id, {
            headers: {
                'Content-Type': 'application/json',
                'x-access-token': x_access_token
            }
        }).then(res => {
             customer = res.data[0]
        })

        const modifiedProducts = products.map((product: Products) => {
            product.value = product.price
            const valor = product.value as string
            product.value = valor.replace("R$","")
            delete product.price;
            delete product.id;
            return product;
        })

            const finalJson = {
                "data-getnet-sellerid": "4e9d2443-a0b4-4c33-abda-80ac7c2a2eac",
                "data-getnet-token": "Bearer "+token,
                "data-getnet-amount": finalPrice,
                "data-getnet-customerid": customer_id,
                "data-getnet-orderid": insertedSaleId,
                "data-getnet-button-class": "Trocar por nome do botão que chama o checkout",
                "data-getnet-installments": 1,
                "data-getnet-first-name": customer.first_name,
                "data-getnet-last-name": customer.last_name,
                "data-getnet-customer-document-type": "CPF",
                "data-getnet-customer-document-number": customer.cpf,
                "data-getnet-customer-email": customer.email,
                "data-getnet-customer-phone-number": customer.telephone,
                "data-getnet-customer-address-street": customer.adress,
                "data-getnet-customer-address-street-number": customer.number,
                "data-getnet-customer-address-complementary": customer.complementary,
                "data-getnet-customer-address-neighborhood": customer.neighborhood,
                "data-getnet-customer-address-city": customer.city,
                "data-getnet-customer-address-state": customer.state,
                "data-getnet-customer-address-zipcode": customer.zipcode,
                "data-getnet-customer-country": customer.country,
                "data-getnet-items": modifiedProducts,
                "data-getnet-url-callback":"https://ecommerce.com.br/sucesso - Trocar por página que demonstra que deu certo"
            }
        
            return response.json(finalJson);
        } catch(err){
            trx.rollback();
    
            return response.status(400).json({
                error: 'Unexpected error while creating new sale!'
            })
        }
    }
}