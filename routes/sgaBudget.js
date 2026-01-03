// routes/sgaBudget.js
const express = require('express');
const router = express.Router();
const sgaBudgetController = require('../controllers/sgaBudgetController');

/**
 * @route POST /api/SGABudget/ForecastData
 * @description Get SGA forecast data
 * @access Public
 */
router.post('/ForecastData', sgaBudgetController.getForecastData);

/**
 * @route POST /api/SGABudget/GETDriveLineExpenses
 * @description Get drive line expenses
 * @access Public
 */
router.post('/GETDriveLineExpenses', sgaBudgetController.getDriveLineExpenses);

/**
 * @route POST /api/SGABudget/SaveDriveLineExpenses
 * @description Save drive line expenses
 * @access Public
 */
router.post('/SaveDriveLineExpenses', sgaBudgetController.saveDriveLineExpenses);

/**
 * @route GET /api/SGABudget/metadata
 * @description Get SGA budget metadata
 * @access Public
 */
router.get('/metadata', sgaBudgetController.getMetadata);

/**
 * @route POST /api/SGABudget/DeleteDriveLineExpenses
 * @description Delete drive line expenses
 * @access Public
 */
router.post('/DeleteDriveLineExpenses', sgaBudgetController.deleteDriveLineExpenses);

module.exports = router;
