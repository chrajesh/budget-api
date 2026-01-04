// swagger.js - Swagger/OpenAPI Configuration
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
  definition: {
    openapi: '3.0.4',
    info: {
      title: 'BudgetPlanning.API',
      version: '1.0',
      description: 'Budget Planning API - Node.js Express implementation',
      contact: {
        name: 'API Support',
        email: 'support@budgetapi.com'
      }
    },
    servers: [
      {
        url: 'https://budget-api-488099994870.us-south1.run.app',
        description: 'Production server'
      },
      {
        url: 'http://localhost:3000',
        description: 'Development server'
      }
    ],
    components: {
      schemas: {
        LoginRequest: {
          type: 'object',
          properties: {
            email: {
              type: 'string',
              nullable: true
            }
          }
        },
        CogsActualBudgetDto: {
          type: 'object',
          properties: {
            salesMonth: { type: 'string', nullable: true },
            manager_RefId: { type: 'integer', format: 'int32' },
            salesManager: { type: 'string', nullable: true },
            productType: { type: 'string', nullable: true },
            productType_RefId: { type: 'integer', format: 'int32' },
            cogsHeader_RefId: { type: 'integer', format: 'int32', nullable: true },
            cogsLine_RefId: { type: 'integer', format: 'int32', nullable: true },
            budgetStatus_RefId: { type: 'integer', format: 'int32' },
            grossSales_FY: { type: 'number', format: 'double' },
            materialCost_FY: { type: 'number', format: 'double' },
            laborCost_FY: { type: 'number', format: 'double' },
            overheadCost_FY: { type: 'number', format: 'double' },
            grossSales_BY: { type: 'number', format: 'double' },
            materialCost_BY: { type: 'number', format: 'double' },
            laborCost_BY: { type: 'number', format: 'double' },
            overheadCost_BY: { type: 'number', format: 'double' },
            isModified: { type: 'boolean' },
            comments: { type: 'string', nullable: true }
          }
        },
        CogsBudgetInsertOrUpdate: {
          type: 'object',
          properties: {
            cogsHeader_RefId: { type: 'integer', format: 'int32', nullable: true },
            cogsLine_RefId: { type: 'integer', format: 'int32', nullable: true },
            budgetYear: { type: 'string', nullable: true },
            financialYear: { type: 'string', nullable: true },
            parentCustomer: { type: 'integer', format: 'int32', nullable: true },
            salesManager: { type: 'integer', format: 'int32', nullable: true },
            location: { type: 'integer', format: 'int32', nullable: true },
            productType: { type: 'integer', format: 'int32', nullable: true },
            budgetStatus: { type: 'integer', format: 'int32', nullable: true },
            salesMonth: { type: 'integer', format: 'int32', nullable: true },
            isModified: { type: 'boolean', nullable: true },
            comments: { type: 'string', nullable: true },
            materialCost: { type: 'number', format: 'double', nullable: true },
            laborCost: { type: 'number', format: 'double', nullable: true },
            overHeadCost: { type: 'number', format: 'double', nullable: true },
            userName: { type: 'string', nullable: true }
          }
        },
        HRPayrollRequest: {
          type: 'object',
          properties: {
            financialYear: { type: 'string', nullable: true },
            budgetYear: { type: 'string', nullable: true },
            meritIncrease: { type: 'number', format: 'double', nullable: true },
            bonus: { type: 'number', format: 'double', nullable: true },
            payrollTaxPercent: { type: 'number', format: 'double', nullable: true },
            _401KPercent: { type: 'number', format: 'double', nullable: true },
            medicalPercent: { type: 'number', format: 'double', nullable: true },
            dentalPercent: { type: 'number', format: 'double', nullable: true },
            visionPercent: { type: 'number', format: 'double', nullable: true },
            annualHours: { type: 'number', format: 'double', nullable: true },
            action: { type: 'string', nullable: true },
            employeeList: {
              type: 'array',
              items: { $ref: '#/components/schemas/EmployeeListItem' },
              nullable: true
            }
          }
        },
        EmployeeListItem: {
          type: 'object',
          properties: {
            employee_RefId: { type: 'integer', format: 'int32', nullable: true }
          }
        },
        HRPayrollBudgetInsertOrUpdateRequest: {
          type: 'object',
          properties: {
            payrollBudgetList: {
              type: 'array',
              items: { $ref: '#/components/schemas/HRPayrollBudgetInsertOrUpdateItem' },
              nullable: true
            }
          }
        },
        HRPayrollBudgetInsertOrUpdateItem: {
          type: 'object',
          properties: {
            financialYear: { type: 'string', nullable: true },
            budgetYear: { type: 'string', nullable: true },
            employee_RefId: { type: 'integer', format: 'int32' },
            hrPayrollHeader_RefId: { type: 'integer', format: 'int32', nullable: true },
            hrPayrollLine_RefId: { type: 'integer', format: 'int32', nullable: true },
            hourlyRate: { type: 'number', format: 'double' },
            salaryEffectiveDate: { type: 'string', nullable: true },
            salaryAmount: { type: 'number', format: 'double' },
            newAnnualComp: { type: 'number', format: 'double' },
            bonus: { type: 'number', format: 'double' },
            grossPay: { type: 'number', format: 'double' },
            payrollTax: { type: 'number', format: 'double' },
            _401K: { type: 'number', format: 'double' },
            medical: { type: 'number', format: 'double' },
            dental: { type: 'number', format: 'double' },
            vision: { type: 'number', format: 'double' },
            costToCompany: { type: 'number', format: 'double' },
            comments: { type: 'string', nullable: true },
            hrPayrollStatus_RefId: { type: 'integer', format: 'int32' },
            userName: { type: 'string', nullable: true }
          }
        },
        HRPayrollComponentSetupRequest: {
          type: 'object',
          properties: {
            financialYear: { type: 'string', nullable: true },
            budgetYear: { type: 'string', nullable: true },
            meritIncrease: { type: 'number', format: 'double' },
            bonus: { type: 'number', format: 'double' },
            payrollTax: { type: 'number', format: 'double' },
            _401K: { type: 'number', format: 'double' },
            medical: { type: 'number', format: 'double' },
            dental: { type: 'number', format: 'double' },
            vision: { type: 'number', format: 'double' },
            annualHours: { type: 'number', format: 'double' },
            userName: { type: 'string', nullable: true }
          }
        },
        SalesPersonManagerDto: {
          type: 'object',
          properties: {
            salesPerson_RefId: { type: 'integer', format: 'int32' },
            salesPerson: { type: 'string', nullable: true },
            manager_RefId: { type: 'integer', format: 'int32' },
            salesManager: { type: 'string', nullable: true }
          }
        },
        ProductType: {
          type: 'object',
          properties: {
            productType_RefId: { type: 'integer', format: 'int32' },
            productTypeDesc: { type: 'string', nullable: true }
          }
        },
        SalesForecastOppBudgetData: {
          type: 'object',
          properties: {
            salesMonth: { type: 'integer', format: 'int32' },
            productType: { type: 'string', nullable: true },
            salesType: { type: 'string', nullable: true },
            productType_RefId: { type: 'integer', format: 'int32' },
            sales_PrevYear: { type: 'number', format: 'double' },
            grossMargin_PrevYear: { type: 'number', format: 'double' },
            sales_FY: { type: 'number', format: 'double' },
            grossMargin_FY: { type: 'number', format: 'double' },
            annualEstRevenue: { type: 'number', format: 'double' },
            confidence: { type: 'number', format: 'double' },
            grossSales: { type: 'number', format: 'double' },
            budgetHeader_RefId: { type: 'integer', format: 'int32' },
            budgetLine_RefId: { type: 'integer', format: 'int32' },
            budgetStatus_RefId: { type: 'integer', format: 'int32' },
            budgetModelPercent: { type: 'number', format: 'double' },
            isModified: { type: 'boolean' },
            comments: { type: 'string', nullable: true },
            budget_Sales: { type: 'number', format: 'double' },
            budget_GrossMargin: { type: 'number', format: 'double' },
            budget_SalesPercentage: { type: 'number', format: 'double' },
            budget_GrossMarginPercentage: { type: 'number', format: 'double' }
          }
        },
        CustomerDto: {
          type: 'object',
          properties: {
            customer_RefId: { type: 'integer', format: 'int32' },
            customerName: { type: 'string', nullable: true },
            soldToCustomer_RefId: { type: 'integer', format: 'int32' },
            soldToCustomerName: { type: 'string', nullable: true }
          }
        },
        SalesBudgetInsertOrUpdate: {
          type: 'object',
          properties: {
            budgetHeader_RefId: { type: 'integer', format: 'int32', nullable: true },
            budgetLine_RefId: { type: 'integer', format: 'int32', nullable: true },
            budgetYear: { type: 'string', nullable: true },
            financialYear: { type: 'string', nullable: true },
            salesPerson: { type: 'integer', format: 'int32' },
            salesManager: { type: 'integer', format: 'int32' },
            budgetStatus: { type: 'integer', format: 'int32' },
            soldToCustomer: { type: 'integer', format: 'int32' },
            parentCustomer: { type: 'integer', format: 'int32' },
            location: { type: 'integer', format: 'int32' },
            budgetModel: { type: 'integer', format: 'int32' },
            salesMonth: { type: 'integer', format: 'int32' },
            productType_RefId: { type: 'integer', format: 'int32' },
            isModified: { type: 'boolean' },
            budgetSalesPercentage: { type: 'number', format: 'double' },
            budgetGrossMarginPercentage: { type: 'number', format: 'double' },
            comments: { type: 'string', nullable: true },
            budget_Sales: { type: 'number', format: 'double' },
            budget_GrossMargin: { type: 'number', format: 'double' },
            userName: { type: 'string', nullable: true }
          }
        },
        SalesBudgetDelete: {
          type: 'object',
          properties: {
            budgetHeader_RefId: { type: 'integer', format: 'int32' },
            budgetLine_RefId: {
              type: 'array',
              items: { type: 'integer', format: 'int32' },
              nullable: true
            },
            userName: { type: 'string', nullable: true }
          }
        },
        BudgetDropdownResult: {
          type: 'object',
          properties: {
            budgetStatuses: {
              type: 'array',
              items: { $ref: '#/components/schemas/BudgetStatusDropdown' },
              nullable: true
            },
            budgetModelTypes: {
              type: 'array',
              items: { $ref: '#/components/schemas/BudgetModelDropdown' },
              nullable: true
            }
          }
        },
        BudgetStatusDropdown: {
          type: 'object',
          properties: {
            budgetStatus_RefId: { type: 'integer', format: 'int32' },
            budgetStatusDesc: { type: 'string', nullable: true }
          }
        },
        BudgetModelDropdown: {
          type: 'object',
          properties: {
            budgetModel_RefId: { type: 'integer', format: 'int32' },
            modelName: { type: 'string', nullable: true },
            modelPercentage: { type: 'number', format: 'double' }
          }
        },
        LocationDto: {
          type: 'object',
          properties: {
            location_RefId: { type: 'integer', format: 'int32' },
            location: { type: 'string', nullable: true }
          }
        },
        HolidayCount: {
          type: 'object',
          properties: {
            calendarYear: { type: 'integer', format: 'int32' },
            calendarMonth: { type: 'integer', format: 'int32' },
            calendarMonthName: { type: 'string', nullable: true },
            holidaysCount: { type: 'integer', format: 'int32' }
          }
        },
        SalesBudgetDetailDto: {
          type: 'object',
          properties: {
            budgetYear: { type: 'string', nullable: true },
            finYear: { type: 'string', nullable: true },
            salesPeriod: { type: 'string', nullable: true },
            productType_RefId: { type: 'integer', format: 'int32', nullable: true },
            productType: { type: 'string', nullable: true },
            salesPerson_RefId: { type: 'integer', format: 'int32', nullable: true },
            salesPerson: { type: 'string', nullable: true },
            salesManager_RefId: { type: 'integer', format: 'int32', nullable: true },
            salesManager: { type: 'string', nullable: true },
            parentCustomer_RefId: { type: 'integer', format: 'int32', nullable: true },
            parentCustomerName: { type: 'string', nullable: true },
            soldToCustomer_RefId: { type: 'integer', format: 'int32', nullable: true },
            soldToCustomerName: { type: 'string', nullable: true },
            budgetStatus_RefId: { type: 'integer', format: 'int32', nullable: true },
            budgetStatus: { type: 'string', nullable: true },
            budgetModel_RefId: { type: 'integer', format: 'int32', nullable: true },
            modelName: { type: 'string', nullable: true },
            location_RefId: { type: 'integer', format: 'int32', nullable: true },
            location: { type: 'string', nullable: true },
            salesMarginPercent: { type: 'number', format: 'double', nullable: true },
            grossMarginPercent: { type: 'number', format: 'double', nullable: true },
            grossSalesAmount: { type: 'number', format: 'double', nullable: true },
            grossMarginByNetSales: { type: 'number', format: 'double', nullable: true },
            netSalesAmount: { type: 'number', format: 'double', nullable: true }
          }
        },
        SGARequest: {
          type: 'object',
          properties: {
            financialYear: { type: 'string', nullable: true },
            budgetYear: { type: 'string', nullable: true },
            Departments: {
              type: 'array',
              items: { type: 'integer', format: 'int32' },
              nullable: true
            },
            Divisions: {
              type: 'array',
              items: { type: 'integer', format: 'int32' },
              nullable: true
            },
            SgaDriveLine_RefId: { type: 'integer', format: 'int32', nullable: true }
          }
        },
        SGADriveLineRequest: {
          type: 'object',
          properties: {
            budgetYear: { type: 'string', nullable: true },
            financialYear: { type: 'string', nullable: true },
            sgaDriveLineDetail_RefId: { type: 'integer', format: 'int32', nullable: true },
            sgaDriveLine_RefId: { type: 'integer', format: 'int32' },
            department_RefId: { type: 'integer', format: 'int32' },
            division_RefId: { type: 'integer', format: 'int32' },
            expense: { type: 'string', nullable: true },
            jan_BY: { type: 'number', format: 'double' },
            feb_BY: { type: 'number', format: 'double' },
            mar_BY: { type: 'number', format: 'double' },
            apr_BY: { type: 'number', format: 'double' },
            may_BY: { type: 'number', format: 'double' },
            jun_BY: { type: 'number', format: 'double' },
            jul_BY: { type: 'number', format: 'double' },
            aug_BY: { type: 'number', format: 'double' },
            sep_BY: { type: 'number', format: 'double' },
            oct_BY: { type: 'number', format: 'double' },
            nov_BY: { type: 'number', format: 'double' },
            dec_BY: { type: 'number', format: 'double' },
            userName: { type: 'string', nullable: true }
          }
        },
        DirveLineExpensesDelete: {
          type: 'object',
          properties: {
            sgaDriveLineDetail_RefId: {
              type: 'array',
              items: { type: 'integer', format: 'int32' },
              nullable: true
            },
            userName: { type: 'string', nullable: true }
          }
        },
        ProblemDetails: {
          type: 'object',
          properties: {
            type: { type: 'string', nullable: true },
            title: { type: 'string', nullable: true },
            status: { type: 'integer', format: 'int32', nullable: true },
            detail: { type: 'string', nullable: true },
            instance: { type: 'string', nullable: true }
          }
        }
      }
    },
    tags: [
      {
        name: 'Authentication',
        description: 'Authentication endpoints'
      },
      {
        name: 'CogsBudget',
        description: 'Cost of Goods Sold Budget endpoints'
      },
      {
        name: 'HRPayroll',
        description: 'HR Payroll Budget endpoints'
      },
      {
        name: 'SalesBudget',
        description: 'Sales Budget endpoints'
      },
      {
        name: 'SGABudget',
        description: 'Selling, General & Administrative Budget endpoints'
      }
    ]
  },
  apis: ['./swagger-paths.js']
};

const swaggerSpec = swaggerJsdoc(options);

module.exports = swaggerSpec;
