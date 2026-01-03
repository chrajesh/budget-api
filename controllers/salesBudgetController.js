// controllers/salesBudgetController.js

/**
 * GET /api/SalesBudget/SalesPerson_Managers_Data
 * Get sales person and managers data
 */
exports.getSalesPersonManagersData = async (req, res) => {
  try {
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
 * GET /api/SalesBudget/GetProductTypes
 * Get product types
 */
exports.getProductTypes = async (req, res) => {
  try {
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
  try {
    const budgetData = req.body;

    // Validate input
    if (!Array.isArray(budgetData) || budgetData.length === 0) {
      return res.status(400).json({
        type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1',
        title: 'Bad Request',
        status: 400,
        detail: 'Budget data must be a non-empty array'
      });
    }

    // TODO: Implement actual database insert/update logic
    res.status(200).json({
      success: true,
      message: 'Sales budget data saved successfully',
      recordsProcessed: budgetData.length
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
