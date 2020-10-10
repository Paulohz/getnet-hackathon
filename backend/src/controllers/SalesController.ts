import {Request, Response} from 'express'

import db from '../database/connection';

export default class SalesController {
    async indexByCompany(request:Request, response:Response){
        
        const {company_id} = request.params;

        const searchedCompanies = await db('sales').select('*').where('company_id', `%${company_id}%`)
        
        return response.json(searchedCompanies);
    }

    async indexByCustomer(request:Request, response:Response){
        
        const {customer_id} = request.params;

        const searchedCompanies = await db('sales').select('*').where('customer_id', `%${customer_id}%`)
        
        return response.json(searchedCompanies);
    }

    async indexById(request:Request, response:Response){
        const filters = request.query;

        const id = filters.id as string;

        const searchedProduct = await db('products').select('*').where('name', 'ilike', `${id}`)
        
        return response.json(searchedProduct);
    }

    async create(request: Request, response:Response) {
        const {
            name,
            description,
            photo,
            price,
            company_id,
            availability
        } = request.body;
    
        const trx = await db.transaction();
    
        try {
            const insertedProductId = await trx('customers').insert({
                name,
                description,
                photo,
                price,
                company_id,
                availability
            });
        
            await trx.commit();
        
            return response.status(201).send();
        } catch(err){
            trx.rollback();
    
            return response.status(400).json({
                error: 'Unexpected error while creating new product!'
            })
        }
    }
}