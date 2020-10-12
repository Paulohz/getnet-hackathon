import {Request, Response} from 'express'
var jwt = require('jsonwebtoken');

export default function verifyJWT(request: Request, response:Response, next: any){
    var token = request.headers['x-access-token'];
    if (!token) return response.status(401).json({ auth: false, message: 'No token provided.' });
    
    jwt.verify(token, process.env.SECRET, function(err: any, decoded: any) {
      if (err) return response.status(500).json({ auth: false, message: 'Failed to authenticate token.' });
      
      // se tudo estiver ok, salva no request para uso posterior
        request.query.userid = decoded.id
        next();
    });
}
