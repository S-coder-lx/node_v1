const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  const authHeader = req.header('Authorization');
  console.log(authHeader, "authHeader");

  // Check for token in Authorization header and handle "Bearer" prefix
  if (!authHeader) {
    return res.status(401).json({ message: 'No token, authorization denied' });
  }

  const token = authHeader.startsWith('Bearer ') ? authHeader.split(' ')[1] : authHeader;

  try {
    console.log("Token received:", token);
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET || 'SANTOSH'); // Use environment variable or fallback for local testing
    console.log(decoded, "decoded"); 
    req.user = decoded; // Attach decoded payload (user info) to the request
    next();
  } catch (err) {
    console.error("Token verification failed: ", err.message);
    res.status(401).json({ message: 'Token is not valid' });
  }
};

module.exports = auth;
