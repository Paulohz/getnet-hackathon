import {Request, Response} from 'express'

import db from '../database/connection';

interface Produtos {
    product_id: number;
    dayPrice: number;
    quantity: number
}

export default class SalesController {
    async indexByCompany(request:Request, response:Response){
        const {companyId} = request.params

        const searchedSales = await db('sales')
            .distinct()
            .select('*')
            .where('sales.company_id',companyId)
        
            console.log(searchedSales)

        const a = await returnJson()

        return response.json(a)

        async function returnJson(){
            const finalArray = await Promise.all(searchedSales.map(async sale => {
                const salesItens = await db('sales')
                    .join('carts', 'sales.id', '=', 'carts.sale_id')
                    .join('products', 'carts.product_id', '=', 'products.id')
                    .select('carts.id', 'carts.product_id', 'carts.dayPrice', 'carts.quantity', 'products.name')
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
        
            console.log(searchedSales)

        const a = await returnJson()

        return response.json(a)

        async function returnJson(){
            const finalArray = await Promise.all(searchedSales.map(async sale => {
                const salesItens = await db('sales')
                    .join('carts', 'sales.id', '=', 'carts.sale_id')
                    .join('products', 'carts.product_id', '=', 'products.id')
                    .select('carts.id', 'carts.product_id', 'carts.dayPrice', 'carts.quantity', 'products.name')
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
        
            console.log(searchedSales)

        const a = await returnJson()

        return response.json(a)

        async function returnJson(){
            const finalArray = await Promise.all(searchedSales.map(async sale => {
                const salesItens = await db('sales')
                    .join('carts', 'sales.id', '=', 'carts.sale_id')
                    .join('products', 'carts.product_id', '=', 'products.id')
                    .select('carts.id', 'carts.product_id', 'carts.dayPrice', 'carts.quantity', 'products.name')
                    .where('sales.customer_id',customerId)
                    .where('sales.id',sale.id);
    
                sale.items = salesItens;
                return sale;
            }))

            return finalArray
        }
    }

    async create(request: Request, response:Response) {
        const {
            customer_id,
            company_id,
            paymentForm,
            finalPrice,
            products
        } = request.body;

        const trx = await db.transaction();
    
        try {
            const insertedSaleId = await trx('sales').insert({
                customer_id,
                company_id,
                paymentForm,
                finalPrice,  
            });
        
        const arrayIds = await Promise.all(products.map(async(product: Produtos) => {
            const {product_id, dayPrice, quantity} = product;

            const insertedCartId = await trx('carts').insert({
                sale_id: insertedSaleId,
                product_id,
                dayPrice,
                quantity
            })
            return insertedCartId
        }))

        console.log(insertedSaleId)
        console.log(arrayIds)
        
            await trx.commit();
        
            return response.status(201).send();
        } catch(err){
            console.log(err)
            trx.rollback();
    
            return response.status(400).json({
                error: 'Unexpected error while creating new sale!'
            })
        }
    }
}