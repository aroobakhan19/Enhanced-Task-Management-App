const jwt =  require("jsowebtoken");

function authenticateToken(req, res, next) {
    const authHeader = req.headers.authorization;
  
    if (authHeader) {
      const token = authHeader.split(' ')[1];
  
      jwt.verify(token, 'yourSecretKey', (err, user) => {
        if (err) {
          return res.status(403).json({ message: 'Authentication token required' });
        }
  
        req.user = user;
        next();
      });
    } else {
      res.status(401).json({ message: 'Authentication token required' });
    }
  }
  
  module.exports = authenticateToken;