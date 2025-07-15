const express = require('express');
const config = require('./config');
const morgan = require('morgan');

const createController = require('./modules/controller');
const createRouter = require('./modules/routes');

const app = express();

//Middleware
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: true}));


//configuración
app.set('port', config.app.port)

//rutas dinámicas
app.use('/api/clientes', createRouter(createController('clientes')));
app.use('/api/products', createRouter(createController('tb_products', 'id_product')));
app.use('/api/customers', createRouter(createController('tb_customers', 'customer_id')));
app.use('/api/employees', createRouter(createController('tb_employees', 'employee_id')));
app.use('/api/sales', createRouter(createController('tb_sales', 'sale_id')));
app.use('/api/sale_details', createRouter(createController('tb_sale_details', 'detail_id')));
app.use('/api/suppliers', createRouter(createController('tb_suppliers', 'supplier_id')));

module.exports = app