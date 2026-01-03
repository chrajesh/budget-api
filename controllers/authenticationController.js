// controllers/authenticationController.js

/**
 * POST /api/Authentication/Login
 * User login endpoint
 */
exports.login = async (req, res) => {
  try {
    const { email } = req.body;

    // TODO: Implement actual authentication logic
    // This is a mock response
    if (!email) {
      return res.status(400).json({
        error: 'Email is required'
      });
    }

    // Mock successful login response
    res.status(200).json({
      success: true,
      message: 'Login successful',
      data: {
        email: email,
        token: 'mock-jwt-token-' + Date.now()
      }
    });
  } catch (error) {
    res.status(500).json({
      error: 'Internal server error',
      message: error.message
    });
  }
};
