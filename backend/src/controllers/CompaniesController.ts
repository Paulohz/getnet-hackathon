import {Request, Response} from 'express'

import db from '../database/connection';

export default class CompaniesController {
    async index(request:Request, response:Response){
        const filters = request.query;

        const name = filters.name as string;

        const searchedCompanies = await db('companies').select('id','name','email','cnpj','adress','number','latitude','longitude','telephone','avatar').where('name', 'like', `%${name}%`)
        
        return response.json(searchedCompanies);
    }

    async IndexById(request:Request, response:Response){
        const {companyId} = request.params;

        const searchedCompany = await db('companies').select('id','name','email','cnpj','adress','number','latitude','longitude','telephone','avatar').where('id', companyId)

        return response.json(searchedCompany)
    }


    async create(request: Request, response:Response) {
        const {
            name,
            email,
            cnpj,
            adress,
            number,
            latitude,
            longitude,
            telephone,
            password,
            avatar
        } = request.body;
    
        const trx = await db.transaction();
    
        try {
            await trx('companies').insert({
                name,
                email,
                cnpj,
                adress,
                number,
                latitude,
                longitude,
                telephone,
                password,
                avatar
            });
        
            await trx.commit();
        
            return response.status(201).send();
        } catch(err){
            console.log(err)
            trx.rollback();
    
            return response.status(400).json({
                error: 'Unexpected error while creating new company!'
            })
        }
    }
}