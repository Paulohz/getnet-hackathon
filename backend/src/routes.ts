import express from 'express';
import {Request, Response} from 'express'
import AuthenticationController from './controllers/AuthenticationController';
import CategoriesController from './controllers/CategoriesController';

import CompaniesController from './controllers/CompaniesController';
import CustomersController from './controllers/CustomersController';
import ProductsController from './controllers/ProductsController';
import SalesController from './controllers/SalesController';

const routes = express.Router();
const companiesController = new CompaniesController(); 
const customersController = new CustomersController();
const productsController = new ProductsController();
const salesController = new SalesController();
const categoriesController = new CategoriesController();
const authenticationController = new AuthenticationController();

routes.get('/companies/create', companiesController.create) //Validado
routes.get('/companies/indexByLikeName', companiesController.indexByLikeName) //Validado
routes.get('/companies/index/:companyId', companiesController.IndexById) //Validado

routes.post('/customers/create', customersController.create) //Validado
routes.get('/customers/IndexById/:customerId', customersController.IndexById) //Validado

routes.post('/categories/create', categoriesController.create) //Validado
routes.get('/categories/indexByCompany/:companyId', categoriesController.indexByCompanyId) //Validado

routes.post('/products/create', productsController.create)//Validado
routes.get('/products/indexByCompany', productsController.indexByCompany)//Validado
routes.get('/products/indexByName', productsController.indexByLikeName)//Validado

routes.get('/sales/create', salesController.create) //Validado
routes.get('/sales/indexByCompany/:companyId', salesController.indexByCompany) //Validado
routes.get('/sales/indexByCustomer/:customerId', salesController.indexByCustomer) //Validado
routes.get('/sales/indexByCompanyByMonth', salesController.indexByCompanyByMonth) //Validado
routes.get('/sales/authenticationGetNet', authenticationController.authToken)//Validado

export default routes;