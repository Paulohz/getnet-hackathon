import {Request, Response} from 'express'

import db from '../database/connection';

export default class CustomersController {
    async IndexById(request:Request, response:Response){
        const {customerId} = request.params;

        const searchedCustomer = await db('customers').select('id','first_name','last_name','telephone','cpf','adress','number','complementary','neighborhood','city', 'state', 'zipcode', 'country', 'email').where('id', customerId)

        return response.json(searchedCustomer)
    }

    async create(request: Request, response:Response) {
        const {
            first_name,
            last_name,
            telephone,
            cpf,
            adress,
            number,
            complementary,
            neighborhood,
            city,
            state,
            zipcode,
            country,
            email,
            password,
            avatar
        } = request.body;
    
        const trx = await db.transaction();
    
        try {
            const insertedCustomersIds = await trx('customers').insert({
                first_name,
                last_name,
                telephone,
                cpf,
                adress,
                number,
                complementary,
                neighborhood,
                city,
                state,
                zipcode,
                country,
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