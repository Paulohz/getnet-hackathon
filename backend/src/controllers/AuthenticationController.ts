import {Request, Response} from 'express'
import axios from 'axios'
import querystring from 'querystring'

import db from '../database/connection';

interface AuthResponse {
    acess_token: string;
    token_type: string;
    expires_in: number;
    scope: string
}

export default class AuthenticationController {

    async authToken(request: Request, response: Response){
        const url = "https://api-sandbox.getnet.com.br/auth/oauth/v2/token"
        const formData = "scope=oob&grant_type=client_credentials"

        const key = process.env.API_CLIENT_ID
        console.log(key)
        try{
        await axios.post(url, querystring.stringify({
            scope: "oob",
            grant_type: "client_credentials"
        }),{
            headers: {
                "Accept": "application/json, text/plain, */*",
                "Content-Type": "application/x-www-form-urlencoded",
                "Authorization": "Basic " + "NGYyYjdlMDAtYWYxMS00ZTVjLTlkOTEtMjFjM2ViOTA5NGRjOjFlNWRjMTFlLTUzNzUtNDE3OS1iMjA1LWNhYzUyMDU3ODMyNQ=="
            }                              
        }).then(res => {
            return response.json(res.data)
        })
    }catch(res){
        console.log(res)
        return response.json(res)
    }
    }
}