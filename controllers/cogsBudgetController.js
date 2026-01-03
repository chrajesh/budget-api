// controllers/cogsBudgetController.js

/**
 * GET /api/CogsBudget/GetCogsActualBudget
 * Get COGS actual budget data
 */
exports.getCogsActualBudget = async (req, res) => {
  try {
    const { financialYear, budgetYear, parentCustomer, location } = req.query;

    // TODO: Implement actual database query
    // This is a mock response
    const mockData = [
      {
        salesMonth: '2024-01',
        manager_RefId: 1,
        salesManager: 'John Doe',
        productType: 'Product A',
        productType_RefId: 1,
        cogsHeader_RefId: 100,
        cogsLine_RefId: 200,
        budgetStatus_RefId: 1,
        grossSales_FY: 100000.00,
        materialCost_FY: 40000.00,
        laborCost_FY: 20000.00,
        overheadCost_FY: 10000.00,
        grossSales_BY: 110000.00,
        materialCost_BY: 45000.00,
        laborCost_BY: 22000.00,
        overheadCost_BY: 11000.00,
        isModified: false,
        comments: 'Sample COGS data'
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
 * POST /api/CogsBudget/InsertOrUpdateCogsBudgetData
 * Insert or update COGS budget data
 */
exports.insertOrUpdateCogsBudgetData = async (req, res) => {
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
    // This is a mock response
    res.status(200).json({
      success: true,
      message: 'COGS budget data saved successfully',
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
