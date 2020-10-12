import {Request, Response} from 'express'

import db from '../database/connection';
import getDistanceFromLatLonInKm from '../utils/calculateDistance';

interface ProdutoCompleto{
    name: string;
    description: string;
    photo: string;
    price: number;
    company_id: number;
    category_id: number;
    availability: number;
    latitude: number;
    longitude: number;
}

export default class ProductsController {
    async indexByCompany(request:Request, response:Response){
        const filters = request.query;

        const {companyId} = request.params

        const searchedCategories = await db('categories')
            .distinct()
            .join('products', 'categories.id', '=', 'products.category_id')
            .select('categories.id','categories.name')
            .where('products.company_id',companyId)

        const a = await returnJson()

        return response.json(a)

        async function returnJson(){
            const finalArray = await Promise.all(searchedCategories.map(async category => {
                const products = await db('categories')
                    .join('products', 'categories.id', '=', 'products.category_id')
                    .select('products.*')
                    .where('categories.id', category.id)
                    .where('products.company_id',companyId);
    
                category.products = products;
                return category;
            }))

            return finalArray
        }
    }

    async indexByLikeName(request:Request, response:Response){
        const filters = request.query;

        const name = filters.name as string;
        const userLatitude = filters.userLatitude as unknown as number;
        const userLongitude = filters.userLongitude as unknown as number;
        const radius = filters.radius as unknown as number;

        const searchedProduct = await db('products')
                                .join('companies','products.company_id','=','companies.id')
                                .select('products.*','companies.id','companies.name as companyName','companies.latitude','companies.longitude')
                                .where('products.name','like', `%${name}%`)


        const productsInRegion = searchedProduct.filter(product => {
            const coord1 = {
                latitude: userLatitude,
                longitude: userLongitude
            }

            const coord2 = {
                latitude: product.latitude,
                longitude: product.longitude
            }
            product.distance = getDistanceFromLatLonInKm(userLatitude, userLongitude, product.latitude, product.longitude)
            
            return getDistanceFromLatLonInKm(userLatitude, userLongitude, product.latitude, product.longitude ) <= radius
        })

        return response.json(productsInRegion);
    }

    async create(request: Request, response:Response) {
        const filters = request.query;
        //const company_id = filters.user_id;

        //trocar para const depois
        var {
            name,
            description,
            photo,
            price,
            company_id,
            category_id,
            availability
        } = request.body;

        if(filters.userid){
            company_id = filters.userid
        }
    
        const trx = await db.transaction();
    
        try {
            const insertedProductId = await trx('products').insert({
                name,
                description,
                photo,
                price,
                company_id,
                category_id,
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