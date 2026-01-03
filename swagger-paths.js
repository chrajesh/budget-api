// swagger-paths.js - API Path Definitions

/**
 * @swagger
 * /api/Authentication/Login:
 *   post:
 *     tags:
 *       - Authentication
 *     summary: User login
 *     description: Authenticate a user with their email
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginRequest'
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/CogsBudget/GetCogsActualBudget:
 *   get:
 *     tags:
 *       - CogsBudget
 *     summary: Get COGS actual budget
 *     description: Retrieve Cost of Goods Sold actual budget data
 *     parameters:
 *       - in: query
 *         name: financialYear
 *         schema:
 *           type: string
 *       - in: query
 *         name: budgetYear
 *         schema:
 *           type: string
 *       - in: query
 *         name: parentCustomer
 *         schema:
 *           type: integer
 *           format: int32
 *       - in: query
 *         name: location
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CogsActualBudgetDto'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProblemDetails'
 */

/**
 * @swagger
 * /api/CogsBudget/InsertOrUpdateCogsBudgetData:
 *   post:
 *     tags:
 *       - CogsBudget
 *     summary: Insert or update COGS budget data
 *     description: Create or update Cost of Goods Sold budget data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/CogsBudgetInsertOrUpdate'
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProblemDetails'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/HRPayroll/GetCurrentFYCompensationAndBudgetData:
 *   post:
 *     tags:
 *       - HRPayroll
 *     summary: Get current FY compensation and budget data
 *     description: Retrieve current fiscal year compensation and budget information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HRPayrollRequest'
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/HRPayroll/InsertOrUpdatePayrollBudgetData:
 *   post:
 *     tags:
 *       - HRPayroll
 *     summary: Insert or update payroll budget data
 *     description: Create or update payroll budget information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HRPayrollBudgetInsertOrUpdateRequest'
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/HRPayroll/GetPayrollLineLogInfo:
 *   get:
 *     tags:
 *       - HRPayroll
 *     summary: Get payroll line log info
 *     description: Retrieve log information for a specific payroll line
 *     parameters:
 *       - in: query
 *         name: headerRefId
 *         schema:
 *           type: integer
 *           format: int32
 *       - in: query
 *         name: lineRefId
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/HRPayroll/SetupPayrollComponents:
 *   post:
 *     tags:
 *       - HRPayroll
 *     summary: Setup payroll components
 *     description: Configure payroll components like merit increase, bonuses, taxes, etc.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/HRPayrollComponentSetupRequest'
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/HRPayroll/GetPayrollSetupInfo:
 *   get:
 *     tags:
 *       - HRPayroll
 *     summary: Get payroll setup information
 *     description: Retrieve current payroll setup configuration
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/HRPayroll/metadata:
 *   get:
 *     tags:
 *       - HRPayroll
 *     summary: Get HR payroll metadata
 *     description: Retrieve metadata information for HR payroll
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/SalesBudget/SalesPerson_Managers_Data:
 *   get:
 *     tags:
 *       - SalesBudget
 *     summary: Get sales person and managers data
 *     description: Retrieve list of sales persons and their managers
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SalesPersonManagerDto'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProblemDetails'
 */

/**
 * @swagger
 * /api/SalesBudget/GetProductTypes:
 *   get:
 *     tags:
 *       - SalesBudget
 *     summary: Get product types
 *     description: Retrieve list of available product types
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/ProductType'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProblemDetails'
 */

/**
 * @swagger
 * /api/SalesBudget/GetActualForecastOppAndBudgetDataOnRetrieve:
 *   get:
 *     tags:
 *       - SalesBudget
 *     summary: Get actual forecast opportunity and budget data (retrieve mode)
 *     description: Retrieve actual forecast, opportunity, and budget data
 *     parameters:
 *       - in: query
 *         name: budgetYear
 *         schema:
 *           type: string
 *       - in: query
 *         name: financialYear
 *         schema:
 *           type: string
 *       - in: query
 *         name: budgetStatus
 *         schema:
 *           type: integer
 *           format: int32
 *       - in: query
 *         name: parentCustomer
 *         schema:
 *           type: integer
 *           format: int32
 *       - in: query
 *         name: location
 *         schema:
 *           type: integer
 *           format: int32
 *       - in: query
 *         name: budgetModel
 *         schema:
 *           type: integer
 *           format: int32
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SalesForecastOppBudgetData'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProblemDetails'
 */

/**
 * @swagger
 * /api/SalesBudget/GetActualForecastOppAndBudgetDataOnGenerate:
 *   get:
 *     tags:
 *       - SalesBudget
 *     summary: Get actual forecast opportunity and budget data (generate mode)
 *     description: Generate actual forecast, opportunity, and budget data with percentages
 *     parameters:
 *       - in: query
 *         name: budgetYear
 *         schema:
 *           type: string
 *       - in: query
 *         name: financialYear
 *         schema:
 *           type: string
 *       - in: query
 *         name: budgetStatus
 *         schema:
 *           type: integer
 *           format: int32
 *       - in: query
 *         name: parentCustomer
 *         schema:
 *           type: integer
 *           format: int32
 *       - in: query
 *         name: location
 *         schema:
 *           type: integer
 *           format: int32
 *       - in: query
 *         name: budgetModel
 *         schema:
 *           type: integer
 *           format: int32
 *       - in: query
 *         name: budgetSalesPercentage
 *         schema:
 *           type: number
 *           format: double
 *       - in: query
 *         name: budgetGrossMarginPercentage
 *         schema:
 *           type: number
 *           format: double
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SalesForecastOppBudgetData'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProblemDetails'
 */

/**
 * @swagger
 * /api/SalesBudget/GetCustomerData:
 *   get:
 *     tags:
 *       - SalesBudget
 *     summary: Get customer data
 *     description: Retrieve list of customers
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/CustomerDto'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProblemDetails'
 */

/**
 * @swagger
 * /api/SalesBudget/InsertOrUpdateBudgetData:
 *   post:
 *     tags:
 *       - SalesBudget
 *     summary: Insert or update sales budget data
 *     description: Create or update sales budget information
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/SalesBudgetInsertOrUpdate'
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProblemDetails'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/SalesBudget/DeleteBudgetData:
 *   post:
 *     tags:
 *       - SalesBudget
 *     summary: Delete sales budget data
 *     description: Delete sales budget entries
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SalesBudgetDelete'
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProblemDetails'
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/SalesBudget/GetBudgetDropdownData:
 *   get:
 *     tags:
 *       - SalesBudget
 *     summary: Get budget dropdown data
 *     description: Retrieve dropdown options for budget statuses and models
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/BudgetDropdownResult'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProblemDetails'
 */

/**
 * @swagger
 * /api/SalesBudget/GetLocationData:
 *   get:
 *     tags:
 *       - SalesBudget
 *     summary: Get location data
 *     description: Retrieve list of locations
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/LocationDto'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProblemDetails'
 */

/**
 * @swagger
 * /api/SalesBudget/GetHolidaysCount:
 *   get:
 *     tags:
 *       - SalesBudget
 *     summary: Get holidays count
 *     description: Retrieve count of holidays by month
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/HolidayCount'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProblemDetails'
 */

/**
 * @swagger
 * /api/SalesBudget/GetAllSubmittedBudgets:
 *   get:
 *     tags:
 *       - SalesBudget
 *     summary: Get all submitted budgets
 *     description: Retrieve list of all submitted sales budgets
 *     responses:
 *       200:
 *         description: OK
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/SalesBudgetDetailDto'
 *       404:
 *         description: Not Found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProblemDetails'
 */

/**
 * @swagger
 * /api/SGABudget/ForecastData:
 *   post:
 *     tags:
 *       - SGABudget
 *     summary: Get SGA forecast data
 *     description: Retrieve Selling, General & Administrative forecast data
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SGARequest'
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/SGABudget/GETDriveLineExpenses:
 *   post:
 *     tags:
 *       - SGABudget
 *     summary: Get drive line expenses
 *     description: Retrieve SGA drive line expenses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SGARequest'
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/SGABudget/SaveDriveLineExpenses:
 *   post:
 *     tags:
 *       - SGABudget
 *     summary: Save drive line expenses
 *     description: Create or update SGA drive line expenses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/SGADriveLineRequest'
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/SGABudget/metadata:
 *   get:
 *     tags:
 *       - SGABudget
 *     summary: Get SGA budget metadata
 *     description: Retrieve metadata information for SGA budget
 *     responses:
 *       200:
 *         description: OK
 *       500:
 *         description: Internal Server Error
 */

/**
 * @swagger
 * /api/SGABudget/DeleteDriveLineExpenses:
 *   post:
 *     tags:
 *       - SGABudget
 *     summary: Delete drive line expenses
 *     description: Delete SGA drive line expenses
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: array
 *             items:
 *               $ref: '#/components/schemas/DirveLineExpensesDelete'
 *     responses:
 *       200:
 *         description: OK
 *       400:
 *         description: Bad Request
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/ProblemDetails'
 *       500:
 *         description: Internal Server Error
 */
