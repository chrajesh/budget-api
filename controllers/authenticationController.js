// controllers/authenticationController.js
const logger = require('../config/logger');

/**
 * POST /api/Authentication/Login
 * User login endpoint
 */
exports.login = async (req, res) => {
  try {
    const { email } = req.body;

    logger.info('Login attempt', { email });

    // TODO: Implement actual authentication logic
    // This is a mock response
    if (!email) {
      logger.warn('Login failed - Missing email');
      return res.status(400).json({
        error: 'Email is required'
      });
    }

    // Mock successful login response
    logger.info('Login successful', { email });
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        email: email,
        token: 'mock-jwt-token-' + Date.now()
      }
    });
  } catch (error) {
    logger.logError(error, { endpoint: 'login', email: req.body?.email });
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};
