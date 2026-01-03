// routes/hrPayroll.js
const express = require('express');
const router = express.Router();
const hrPayrollController = require('../controllers/hrPayrollController');

/**
 * @route POST /api/HRPayroll/GetCurrentFYCompensationAndBudgetData
 * @description Get current FY compensation and budget data
 * @access Public
 */
router.post('/GetCurrentFYCompensationAndBudgetData', hrPayrollController.getCurrentFYCompensationAndBudgetData);

/**
 * @route POST /api/HRPayroll/InsertOrUpdatePayrollBudgetData
 * @description Insert or update payroll budget data
 * @access Public
 */
router.post('/InsertOrUpdatePayrollBudgetData', hrPayrollController.insertOrUpdatePayrollBudgetData);

/**
 * @route GET /api/HRPayroll/GetPayrollLineLogInfo
 * @description Get payroll line log information
 * @access Public
 * @queryParams headerRefId, lineRefId
 */
router.get('/GetPayrollLineLogInfo', hrPayrollController.getPayrollLineLogInfo);

/**
 * @route POST /api/HRPayroll/SetupPayrollComponents
 * @description Setup payroll components
 * @access Public
 */
router.post('/SetupPayrollComponents', hrPayrollController.setupPayrollComponents);

/**
 * @route GET /api/HRPayroll/GetPayrollSetupInfo
 * @description Get payroll setup information
 * @access Public
 */
router.get('/GetPayrollSetupInfo', hrPayrollController.getPayrollSetupInfo);

/**
 * @route GET /api/HRPayroll/metadata
 * @description Get HR payroll metadata
 * @access Public
 */
router.get('/metadata', hrPayrollController.getMetadata);

module.exports = router;
