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

                    console.log(user)
                    console.log(process.env.SECRET)
        if(user[0].count !== 0){
            const id = user[0].id
        

            var token = jwt.sign({ id }, process.env.SECRET, {
                expiresIn: 1800 //Expires in 30 minutes
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

        const user = db('')
    }
}