// routes/salesBudget.js
const express = require('express');
const router = express.Router();
const salesBudgetController = require('../controllers/salesBudgetController');

/**
 * @route GET /api/SalesBudget/SalesPerson_Managers_Data
 * @description Get sales person and managers data
 * @access Public
 */
router.get('/SalesPerson_Managers_Data', salesBudgetController.getSalesPersonManagersData);

/**
 * @route GET /api/SalesBudget/GetProductTypes
 * @description Get product types
 * @access Public
 */
router.get('/GetProductTypes', salesBudgetController.getProductTypes);

/**
 * @route GET /api/SalesBudget/GetActualForecastOppAndBudgetDataOnRetrieve
 * @description Get actual forecast opportunity and budget data (retrieve mode)
 * @access Public
 * @queryParams budgetYear, financialYear, budgetStatus, parentCustomer, location, budgetModel
 */
router.get('/GetActualForecastOppAndBudgetDataOnRetrieve', salesBudgetController.getActualForecastOppAndBudgetDataOnRetrieve);

/**
 * @route GET /api/SalesBudget/GetActualForecastOppAndBudgetDataOnGenerate
 * @description Get actual forecast opportunity and budget data (generate mode)
 * @access Public
 * @queryParams budgetYear, financialYear, budgetStatus, parentCustomer, location, budgetModel, budgetSalesPercentage, budgetGrossMarginPercentage
 */
router.get('/GetActualForecastOppAndBudgetDataOnGenerate', salesBudgetController.getActualForecastOppAndBudgetDataOnGenerate);

/**
 * @route GET /api/SalesBudget/GetCustomerData
 * @description Get customer data
 * @access Public
 */
router.get('/GetCustomerData', salesBudgetController.getCustomerData);

/**
 * @route POST /api/SalesBudget/InsertOrUpdateBudgetData
 * @description Insert or update sales budget data
 * @access Public
 */
router.post('/InsertOrUpdateBudgetData', salesBudgetController.insertOrUpdateBudgetData);

/**
 * @route POST /api/SalesBudget/DeleteBudgetData
 * @description Delete sales budget data
 * @access Public
 */
router.post('/DeleteBudgetData', salesBudgetController.deleteBudgetData);

/**
 * @route GET /api/SalesBudget/GetBudgetDropdownData
 * @description Get budget dropdown data
 * @access Public
 */
router.get('/GetBudgetDropdownData', salesBudgetController.getBudgetDropdownData);

/**
 * @route GET /api/SalesBudget/GetLocationData
 * @description Get location data
 * @access Public
 */
router.get('/GetLocationData', salesBudgetController.getLocationData);

/**
 * @route GET /api/SalesBudget/GetHolidaysCount
 * @description Get holidays count by month
 * @access Public
 */
router.get('/GetHolidaysCount', salesBudgetController.getHolidaysCount);

/**
 * @route GET /api/SalesBudget/GetAllSubmittedBudgets
 * @description Get all submitted budgets
 * @access Public
 */
router.get('/GetAllSubmittedBudgets', salesBudgetController.getAllSubmittedBudgets);

module.exports = router;
