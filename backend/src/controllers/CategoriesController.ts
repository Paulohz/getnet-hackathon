import {Request, Response} from 'express'

import db from '../database/connection';

export default class CategoriesController {
    async indexByCompanyId(request:Request, response:Response){
        const {companyId} = request.params;
        
        const searchedCategories = await db('categories').select('*').where('company_id', companyId)

        return response.json(searchedCategories);
    }

    async create(request: Request, response:Response) {
        const {
            name,
            company_id
        } = request.body;
    
        const trx = await db.transaction();
    
        try {
            const insertedCompaniesIds = await trx('categories').insert({
                name,
                company_id
            });
        
            await trx.commit();
        
            return response.status(201).send();
        } catch(err){
            trx.rollback();
    
            return response.status(400).json({
                error: 'Unexpected error while creating new category!'
            })
        }
    }
}