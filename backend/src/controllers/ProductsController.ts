import {Request, Response} from 'express'

import db from '../database/connection';

export default class ProductsController {
    async index(request:Request, response:Response){
        const filters = request.query;

        const name = filters.name as string;

        const searchedProducts = await db('categories')
        .join('contacts', 'users.id', '=', 'contacts.user_id')
        .select('users.id', 'contacts.phone')
        
        return response.json(searchedProducts);
    }

    async indexByLikeName(request:Request, response:Response){
        const filters = request.query;

        const id = filters.id as string;
        const userLatitude = filters.latitude;
        const userLongitude = filters.longitude;
        const radius = filters.radius

        const searchedProduct = await db('products').select('*').where('id', `${id}`)

        //Codar solução para buscar produtos dentro do raio de distancia enviado pela requisição
        //Em ../utils existe uma função que calcula distancias baseando-se na distancias do usuário e da empresa
        
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