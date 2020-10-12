import express from 'express';
import {Request, Response} from 'express'

import AuthenticationController from './controllers/AuthenticationController';
import CategoriesController from './controllers/CategoriesController';
import CompaniesController from './controllers/CompaniesController';
import CustomersController from './controllers/CustomersController';
import LoginController from './controllers/LoginController';
import ProductsController from './controllers/ProductsController';
import SalesController from './controllers/SalesController';

import verifyJWT from './utils/verifyJWT'

const routes = express.Router();

const companiesController = new CompaniesController(); 
const customersController = new CustomersController();
const productsController = new ProductsController();
const salesController = new SalesController();
const categoriesController = new CategoriesController();
const authenticationController = new AuthenticationController();
const loginController = new LoginController();

//Retirar verifyJWT para testar sem precisar passar token 

routes.post('/loginCustomer', loginController.loginCustomer) //Validado
routes.post('/loginCompany', loginController.loginCompany) //Validado
routes.post('/logout', loginController.logout) //Validado

routes.get('/companies/create', companiesController.create) //Validado
routes.get('/companies/indexByLikeName', verifyJWT, companiesController.indexByLikeName) //Validado
routes.get('/companies/index/:companyId', verifyJWT, companiesController.IndexById) //Validado

routes.post('/customers/create', customersController.create) //Validado
routes.get('/customers/IndexById/:customerId', verifyJWT, customersController.IndexById) //Validado

routes.post('/categories/create', verifyJWT, categoriesController.create) //Validado
routes.get('/categories/indexByCompany/:companyId', verifyJWT, categoriesController.indexByCompanyId) //Validado

routes.post('/products/create', verifyJWT, productsController.create)//Validado
routes.get('/products/indexByCompany/:companyId', verifyJWT, productsController.indexByCompany)//Validado
routes.get('/products/indexByName', verifyJWT, productsController.indexByLikeName)//Validado

routes.post('/sales/create', verifyJWT, salesController.create) //Validado
routes.get('/sales/indexByCompany/:companyId', verifyJWT, salesController.indexByCompany) //Validado
routes.get('/sales/indexByCustomer/:customerId', verifyJWT, salesController.indexByCustomer) //Validado
routes.get('/sales/indexByCompanyByMonth', verifyJWT, salesController.indexByCompanyByMonth) //Validado
routes.get('/sales/authenticationGetNet', verifyJWT, authenticationController.authToken)//Validado

export default routes;