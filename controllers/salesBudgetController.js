// controllers/salesBudgetController.js
const pool = require('../config/database');
const logger = require('../config/logger');

/**
 * GET /api/SalesBudget/SalesPerson_Managers_Data
 * Get sales person and managers data
 */
exports.getSalesPersonManagersData = async (req, res) => {
  try {
    logger.info('GetSalesPersonManagersData - Request received');
    
    // TODO: Implement actual database query
    const mockData = [
      {
        salesPerson_RefId: 1,
        salesPerson: 'Alice Johnson',
        manager_RefId: 10,
        salesManager: 'Bob Smith'
      },
      {
        salesPerson_RefId: 2,
        salesPerson: 'Charlie Brown',
        manager_RefId: 10,
        salesManager: 'Bob Smith'
      }
    ];

    logger.debug('GetSalesPersonManagersData - Returning data', { recordCount: mockData.length });
    res.status(200).json(mockData);
  } catch (error) {
    logger.logError(error, { endpoint: 'GetSalesPersonManagersData' });
    res.status(404).json({
      type: 'https://tools.ietf.org/html/rfc7231#section-6.5.4',
      title: 'Not Found',
      status: 404,
      detail: error.message
    });
  }
};

/**
 * GET /api/SalesBudget/GetProductTypes
 * Get product types
 */
exports.getProductTypes = async (req, res) => {
  try {
    logger.info('GetProductTypes - Request received');
    
    // TODO: Implement actual database query
    const mockData = [
      {
        productType_RefId: 1,
        productTypeDesc: 'Hardware'
      },
      {
        productType_RefId: 2,
        productTypeDesc: 'Software'
      },
      {
        productType_RefId: 3,
        productTypeDesc: 'Services'
      }
    ];

    logger.debug('GetProductTypes - Returning data', { productTypeCount: mockData.length });
    res.status(200).json(mockData);
  } catch (error) {
    logger.logError(error, { endpoint: 'GetProductTypes' });
    res.status(404).json({
      type: 'https://tools.ietf.org/html/rfc7231#section-6.5.4',
      title: 'Not Found',
      status: 404,
      detail: error.message
    });
  }
};

/**
 * GET /api/SalesBudget/GetActualForecastOppAndBudgetDataOnRetrieve
 * Get actual forecast opportunity and budget data (retrieve mode)
 */
exports.getActualForecastOppAndBudgetDataOnRetrieve = async (req, res) => {
  try {
    const { budgetYear, financialYear, budgetStatus, parentCustomer, location, budgetModel } = req.query;

    // TODO: Implement actual database query
    const mockData = [
      {
        salesMonth: 1,
        productType: 'Hardware',
        salesType: 'Direct',
        productType_RefId: 1,
        sales_PrevYear: 50000.00,
        grossMargin_PrevYear: 15000.00,
        sales_FY: 55000.00,
        grossMargin_FY: 16500.00,
        annualEstRevenue: 60000.00,
        confidence: 85.5,
        grossSales: 58000.00,
        budgetHeader_RefId: 1000,
        budgetLine_RefId: 2000,
        budgetStatus_RefId: 1,
        budgetModelPercent: 10.0,
        isModified: false,
        comments: 'Sample sales data',
        budget_Sales: 60000.00,
        budget_GrossMargin: 18000.00,
        budget_SalesPercentage: 10.0,
        budget_GrossMarginPercentage: 30.0
      }
    ];

    res.status(200).json(mockData);
  } catch (error) {
    res.status(404).json({
      type: 'https://tools.ietf.org/html/rfc7231#section-6.5.4',
      title: 'Not Found',
      status: 404,
      detail: error.message
    });
  }
};

/**
 * GET /api/SalesBudget/GetActualForecastOppAndBudgetDataOnGenerate
 * Get actual forecast opportunity and budget data (generate mode)
 */
exports.getActualForecastOppAndBudgetDataOnGenerate = async (req, res) => {
  try {
    const { 
      budgetYear, 
      financialYear, 
      budgetStatus, 
      parentCustomer, 
      location, 
      budgetModel,
      budgetSalesPercentage,
      budgetGrossMarginPercentage
    } = req.query;

    // TODO: Implement actual generation logic
    const mockData = [
      {
        salesMonth: 1,
        productType: 'Hardware',
        salesType: 'Direct',
        productType_RefId: 1,
        sales_PrevYear: 50000.00,
        grossMargin_PrevYear: 15000.00,
        sales_FY: 55000.00,
        grossMargin_FY: 16500.00,
        annualEstRevenue: 60000.00,
        confidence: 85.5,
        grossSales: 58000.00,
        budgetHeader_RefId: 1000,
        budgetLine_RefId: 2000,
        budgetStatus_RefId: 1,
        budgetModelPercent: parseFloat(budgetSalesPercentage) || 10.0,
        isModified: false,
        comments: 'Generated budget data',
        budget_Sales: 65000.00,
        budget_GrossMargin: 19500.00,
        budget_SalesPercentage: parseFloat(budgetSalesPercentage) || 10.0,
        budget_GrossMarginPercentage: parseFloat(budgetGrossMarginPercentage) || 30.0
      }
    ];

    res.status(200).json(mockData);
  } catch (error) {
    res.status(404).json({
      type: 'https://tools.ietf.org/html/rfc7231#section-6.5.4',
      title: 'Not Found',
      status: 404,
      detail: error.message
    });
  }
};

/**
 * GET /api/SalesBudget/GetCustomerData
 * Get customer data
 */
exports.getCustomerData = async (req, res) => {
  try {
    // TODO: Implement actual database query
    const mockData = [
      {
        customer_RefId: 1,
        customerName: 'ABC Corporation',
        soldToCustomer_RefId: 101,
        soldToCustomerName: 'ABC Corp - Main Office'
      },
      {
        customer_RefId: 2,
        customerName: 'XYZ Industries',
        soldToCustomer_RefId: 102,
        soldToCustomerName: 'XYZ Industries - HQ'
      }
    ];

    res.status(200).json(mockData);
  } catch (error) {
    res.status(404).json({
      type: 'https://tools.ietf.org/html/rfc7231#section-6.5.4',
      title: 'Not Found',
      status: 404,
      detail: error.message
    });
  }
};

/**
 * POST /api/SalesBudget/InsertOrUpdateBudgetData
 * Insert or update sales budget data
 */
exports.insertOrUpdateBudgetData = async (req, res) => {
  const client = await pool.connect();
  
  try {
    const budgetData = req.body;
    
    logger.info('InsertOrUpdateBudgetData - Request received', {
      recordCount: Array.isArray(budgetData) ? budgetData.length : 0,
      userId: req.user?.id || 'anonymous'
    });

    // Validate input
    if (!Array.isArray(budgetData) || budgetData.length === 0) {
      logger.warn('InsertOrUpdateBudgetData - Invalid input', {
        isArray: Array.isArray(budgetData),
        length: budgetData?.length
      });
      
      return res.status(400).json({
        type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
        title: 'Bad Request',
        status: 400,
        detail: 'Budget data must be a non-empty array'
      });
    }

    await client.query('BEGIN');
    logger.debug('Transaction started');

    const insertedRecords = [];
    const updatedRecords = [];
    const startTime = Date.now();

    for (const record of budgetData) {
      // Check if record exists based on budget_header_ref_id and budget_line_ref_id
      const checkQuery = `
        SELECT id FROM budget.sales_budget 
        WHERE budget_header_ref_id = $1 AND budget_line_ref_id = $2
      `;
      const checkResult = await client.query(checkQuery, [
        record.budgetHeader_RefId,
        record.budgetLine_RefId
      ]);

      if (checkResult.rows.length > 0) {
        // Update existing record
        const updateQuery = `
          UPDATE budget.sales_budget 
          SET 
            budget_year = $1,
            financial_year = $2,
            sales_person = $3,
            sales_manager = $4,
            budget_status = $5,
            sold_to_customer = $6,
            parent_customer = $7,
            location = $8,
            budget_model = $9,
            sales_month = $10,
            product_type_ref_id = $11,
            is_modified = $12,
            budget_sales_percentage = $13,
            budget_gross_margin_percentage = $14,
            comments = $15,
            budget_sales = $16,
            budget_gross_margin = $17,
            user_name = $18,
            updated_at = CURRENT_TIMESTAMP
          WHERE budget_header_ref_id = $19 AND budget_line_ref_id = $20
          RETURNING id
        `;
        
        const updateResult = await client.query(updateQuery, [
          record.budgetYear,
          record.financialYear,
          record.salesPerson,
          record.salesManager,
          record.budgetStatus,
          record.soldToCustomer,
          record.parentCustomer,
          record.location,
          record.budgetModel,
          record.salesMonth,
          record.productType_RefId,
          record.isModified,
          record.budgetSalesPercentage,
          record.budgetGrossMarginPercentage,
          record.comments,
          record.budget_Sales,
          record.budget_GrossMargin,
          record.userName,
          record.budgetHeader_RefId,
          record.budgetLine_RefId
        ]);
        
        updatedRecords.push(updateResult.rows[0].id);
        logger.debug('Record updated', { 
          id: updateResult.rows[0].id,
          budgetHeaderRefId: record.budgetHeader_RefId,
          budgetLineRefId: record.budgetLine_RefId
        });
      } else {
        // Insert new record
        const insertQuery = `
          INSERT INTO budget.sales_budget (
            budget_header_ref_id, budget_line_ref_id, budget_year, financial_year,
            sales_person, sales_manager, budget_status, sold_to_customer, parent_customer,
            location, budget_model, sales_month, product_type_ref_id, is_modified,
            budget_sales_percentage, budget_gross_margin_percentage,
            comments, budget_sales, budget_gross_margin, user_name
          ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, $17, $18, $19, $20
          )
          RETURNING id
        `;
        
        const insertResult = await client.query(insertQuery, [
          record.budgetHeader_RefId,
          record.budgetLine_RefId,
          record.budgetYear,
          record.financialYear,
          record.salesPerson,
          record.salesManager,
          record.budgetStatus,
          record.soldToCustomer,
          record.parentCustomer,
          record.location,
          record.budgetModel,
          record.salesMonth,
          record.productType_RefId,
          record.isModified,
          record.budgetSalesPercentage,
          record.budgetGrossMarginPercentage,
          record.comments,
          record.budget_Sales,
          record.budget_GrossMargin,
          record.userName
        ]);
        
        insertedRecords.push(insertResult.rows[0].id);
        logger.debug('Record inserted', { 
          id: insertResult.rows[0].id,
          budgetHeaderRefId: record.budgetHeader_RefId,
          budgetLineRefId: record.budgetLine_RefId
        });
      }
    }

    await client.query('COMMIT');
    
    const duration = Date.now() - startTime;
    logger.info('InsertOrUpdateBudgetData - Transaction completed', {
      totalRecords: budgetData.length,
      inserted: insertedRecords.length,
      updated: updatedRecords.length,
      duration: `${duration}ms`
    });

    res.status(200).json({
      success: true,
      message: 'Sales budget data saved successfully',
      recordsProcessed: budgetData.length,
      inserted: insertedRecords.length,
      updated: updatedRecords.length,
      insertedIds: insertedRecords,
      updatedIds: updatedRecords
    });
  } catch (error) {
    await client.query('ROLLBACK');
    
    logger.logError(error, {
      endpoint: 'InsertOrUpdateBudgetData',
      recordCount: req.body?.length || 0
    });
    
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
        title: 'Bad Request',
        status: 400,
        detail: error.message
      });
    }

    res.status(500).json({
      error: 'Internal server error',
      message: error.message,
      detail: error.detail || 'An error occurred while processing the request'
    });
  } finally {
    client.release();
  }
};

/**
 * POST /api/SalesBudget/DeleteBudgetData
 * Delete sales budget data
 */
exports.deleteBudgetData = async (req, res) => {
  try {
    const deleteRequest = req.body;

    // Validate input
    if (!deleteRequest.budgetHeader_RefId) {
      return res.status(400).json({
        type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
        title: 'Bad Request',
        status: 400,
        detail: 'budgetHeader_RefId is required'
      });
    }

    // TODO: Implement actual database delete logic
    res.status(200).json({
      success: true,
      message: 'Sales budget data deleted successfully'
    });
  } catch (error) {
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
        title: 'Bad Request',
        status: 400,
        detail: error.message
      });
    }

    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};

/**
 * GET /api/SalesBudget/GetBudgetDropdownData
 * Get budget dropdown data
 */
exports.getBudgetDropdownData = async (req, res) => {
  try {
    // TODO: Implement actual database query
    const mockData = {
      budgetStatuses: [
        {
          budgetStatus_RefId: 1,
          budgetStatusDesc: 'Draft'
        },
        {
          budgetStatus_RefId: 2,
          budgetStatusDesc: 'Submitted'
        },
        {
          budgetStatus_RefId: 3,
          budgetStatusDesc: 'Approved'
        }
      ],
      budgetModelTypes: [
        {
          budgetModel_RefId: 1,
          modelName: 'Conservative',
          modelPercentage: 5.0
        },
        {
          budgetModel_RefId: 2,
          modelName: 'Moderate',
          modelPercentage: 10.0
        },
        {
          budgetModel_RefId: 3,
          modelName: 'Aggressive',
          modelPercentage: 15.0
        }
      ]
    };

    res.status(200).json(mockData);
  } catch (error) {
    res.status(404).json({
      type: 'https://tools.ietf.org/html/rfc7231#section-6.5.4',
      title: 'Not Found',
      status: 404,
      detail: error.message
    });
  }
};

/**
 * GET /api/SalesBudget/GetLocationData
 * Get location data
 */
exports.getLocationData = async (req, res) => {
  try {
    // TODO: Implement actual database query
    const mockData = [
      {
        location_RefId: 1,
        location: 'New York Office'
      },
      {
        location_RefId: 2,
        location: 'Los Angeles Office'
      },
      {
        location_RefId: 3,
        location: 'Chicago Office'
      }
    ];

    res.status(200).json(mockData);
  } catch (error) {
    res.status(404).json({
      type: 'https://tools.ietf.org/html/rfc7231#section-6.5.4',
      title: 'Not Found',
      status: 404,
      detail: error.message
    });
  }
};

/**
 * GET /api/SalesBudget/GetHolidaysCount
 * Get holidays count by month
 */
exports.getHolidaysCount = async (req, res) => {
  try {
    // TODO: Implement actual database query
    const mockData = [
      {
        calendarYear: 2024,
        calendarMonth: 1,
        calendarMonthName: 'January',
        holidaysCount: 2
      },
      {
        calendarYear: 2024,
        calendarMonth: 2,
        calendarMonthName: 'February',
        holidaysCount: 1
      },
      {
        calendarYear: 2024,
        calendarMonth: 12,
        calendarMonthName: 'December',
        holidaysCount: 3
      }
    ];

    res.status(200).json(mockData);
  } catch (error) {
    res.status(404).json({
      type: 'https://tools.ietf.org/html/rfc7231#section-6.5.4',
      title: 'Not Found',
      status: 404,
      detail: error.message
    });
  }
};

/**
 * GET /api/SalesBudget/GetAllSubmittedBudgets
 * Get all submitted budgets
 */
exports.getAllSubmittedBudgets = async (req, res) => {
  try {
    // TODO: Implement actual database query
    const mockData = [
      {
        budgetYear: '2024',
        finYear: 'FY2024',
        salesPeriod: 'Q1 2024',
        productType_RefId: 1,
        productType: 'Hardware',
        salesPerson_RefId: 1,
        salesPerson: 'Alice Johnson',
        salesManager_RefId: 10,
        salesManager: 'Bob Smith',
        parentCustomer_RefId: 1,
        parentCustomerName: 'ABC Corporation',
        soldToCustomer_RefId: 101,
        soldToCustomerName: 'ABC Corp - Main Office',
        budgetStatus_RefId: 2,
        budgetStatus: 'Submitted',
        budgetModel_RefId: 2,
        modelName: 'Moderate',
        location_RefId: 1,
        location: 'New York Office',
        salesMarginPercent: 25.0,
        grossMarginPercent: 30.0,
        grossSalesAmount: 150000.00,
        grossMarginByNetSales: 45000.00,
        netSalesAmount: 135000.00
      }
    ];

    res.status(200).json(mockData);
  } catch (error) {
    res.status(404).json({
      type: 'https://tools.ietf.org/html/rfc7231#section-6.5.4',
      title: 'Not Found',
      status: 404,
      detail: error.message
    });
  }
};
