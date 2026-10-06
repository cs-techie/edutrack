const protect = (req, res, next) => {
  if (req.session && req.session.user) {
    return next();
  }
  return res.status(401).json({ message: 'Not authorized, session expired or invalid' });
};

const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.session || !req.session.user) {
      return res.status(401).json({ message: 'Not authorized' });
    }
    if (!roles.includes(req.session.user.role)) {
      return res.status(403).json({ message: `User role '${req.session.user.role}' is not authorized to access this route` });
    }
    next();
  };
};

module.exports = { protect, authorize };
