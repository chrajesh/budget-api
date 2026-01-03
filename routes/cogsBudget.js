// routes/cogsBudget.js
const express = require('express');
const router = express.Router();
const cogsBudgetController = require('../controllers/cogsBudgetController');

/**
 * @route GET /api/CogsBudget/GetCogsActualBudget
 * @description Get COGS actual budget data
 * @access Public
 * @queryParams financialYear, budgetYear, parentCustomer, location
 */
router.get('/GetCogsActualBudget', cogsBudgetController.getCogsActualBudget);

/**
 * @route POST /api/CogsBudget/InsertOrUpdateCogsBudgetData
 * @description Insert or update COGS budget data
 * @access Public
 */
router.post('/InsertOrUpdateCogsBudgetData', cogsBudgetController.insertOrUpdateCogsBudgetData);

module.exports = router;
