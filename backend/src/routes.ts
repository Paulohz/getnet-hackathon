import express from 'express';
import {Request, Response} from 'express'

import CompaniesController from './controllers/CompaniesController';
import CustomersController from './controllers/CustomersController';
import ProductsController from './controllers/ProductsController';
import SalesController from './controllers/SalesController';

const routes = express.Router();
const companiesController = new CompaniesController(); 
const customersController = new CustomersController();
const productsController = new ProductsController();
const salesController = new SalesController();

routes.get('/companies/create', companiesController.create)
routes.get('/companies/index', companiesController.index)

routes.post('/customers/create', customersController.create)

routes.post('/products/create', productsController.create)
routes.get('/products/index', productsController.index)
routes.get('/products/indexById:id', productsController.indexByLikeName)

routes.get('/sales/create', salesController.create)
routes.get('/sales/indexByCompany:company_id', salesController.indexByCompany)
routes.get('/sales/indexByCustomer:id', salesController.indexByCustomer)

export default routes;