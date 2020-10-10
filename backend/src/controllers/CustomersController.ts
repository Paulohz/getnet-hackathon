import {Request, Response} from 'express'

import db from '../database/connection';

export default class CustomersController {
    async create(request: Request, response:Response) {
        const {
            name,
            telephone,
            cpf,
            adress,
            email,
            password,
            avatar
        } = request.body;
    
        const trx = await db.transaction();
    
        try {
            const insertedCustomersIds = await trx('customers').insert({
                name,
                telephone,
                cpf,
                adress,
                email,
                password,
                avatar
            });
        
            const user_id = insertedCustomersIds[0];
        
            await trx.commit();
        
            return response.status(201).send();
        } catch(err){
            trx.rollback();
    
            return response.status(400).json({
                error: 'Unexpected error while creating new customer!'
            })
        }
    }
}