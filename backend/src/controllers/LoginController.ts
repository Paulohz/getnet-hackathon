import express, {Request, Response} from 'express';
import db from '../database/connection';
var jwt = require('jsonwebtoken');

export default class LoginController{

    async loginCompany(request: Request, response: Response){
        const {email, password} = request.body;

        const user = await db('companies')
                    .count('id as count')
                    .select('id')
                    .where('email', email)
                    .where('password', password)

        if(user[0].count !== 0){
            const id = user[0].id
    
            var token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: 18000 //Expires in 5 hours
            });

            return response.json({ auth: true, token: token });
        } else {
            response.status(500).json({
                message: "Login Inválido!"
            });
        }
    }

    async loginCustomer(request: Request, response: Response){
        const {email, password} = request.body;

        const user = await db('customers')
                    .count('id as count')
                    .select('id')
                    .where('email', email)
                    .where('password', password)

        if(user[0].count !== 0){
            const id = user[0].id
    
            var token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: 7200 //Expires in 2 hours
            });

            return response.json({ auth: true, token: token });
        } else {
            response.status(500).json({
                message: "Login Inválido!"
            });
        }
    }

    async logout(request: Request, response: Response){
        response.json({
            auth: false,
            token: null
        })
    }
}