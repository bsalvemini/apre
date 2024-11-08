/**
 * Author: Professor Krasso
 * Date: 7 August 2024
 * File: app.js
 * Description: Application setup. Autogenerated using Express generator.
 */

'use strict';

// require statements
const express = require('express');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const { notFoundHandler, errorHandler } = require('./utils/error-handler');

// Importing the index router
const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const securityRouter = require('./routes/security');
const dashboardRouter = require('./routes/dashboard');
const salesReportsRouter = require('./routes/reports/sales');
const agentPerformanceReportsRouter = require('./routes/reports/agent-performance');
const customerFeedbackReportsRouter = require('./routes/reports/customer-feedback');
const agentDataByRegionRouter = require('./routes/reports/agent-performance/agent-data-by-region');

// Variable declaration for the express app
let app = express();

// CORS configuration
app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*'); // This allows all origins
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS'); // Allowed request methods
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept'); // Allowed headers
  next();
});

// Express app configuration
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Routing configuration
app.use('/api', indexRouter);
app.use('/api/users', usersRouter);
app.use('/api/security', securityRouter);
app.use('/api/dashboard', dashboardRouter);
app.use('/api/reports/sales', salesReportsRouter);
app.use('/api/reports/agent-performance', agentPerformanceReportsRouter);
app.use('/api/reports/agent-performance/region', agentDataByRegionRouter);
app.use('/api/reports/customer-feedback', customerFeedbackReportsRouter);

// Use the error handling middleware
app.use(notFoundHandler);
app.use(errorHandler);

// Export the app
module.exports = app;
