import {Request, Response} from 'express'

import db from '../database/connection';

export default class CategoriesController {
    async create(request: Request, response:Response) {
        const {
            name,
            email,
            cnpj,
            adress,
            telephone,
            password,
            avatar
        } = request.body;
    
        const trx = await db.transaction();
    
        try {
            const insertedCompaniesIds = await trx('users').insert({
                name,
                email,
                cnpj,
                adress,
                telephone,
                password,
                avatar
            });
        
            await trx.commit();
        
            return response.status(201).send();
        } catch(err){
            trx.rollback();
    
            return response.status(400).json({
                error: 'Unexpected error while creating new company!'
            })
        }
    }
}