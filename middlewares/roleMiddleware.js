export const isAdmin= (req, res, next) => {
    if (req.user?.role === 'admin') return next();
    return res.status(403).json({ message: 'Admin access only' });
  };
  
  export const isManager = (req, res, next) => {
    if (req.user?.role === 'manager') return next();
    return res.status(403).json({ message: 'Manager access only' });
  };
  
  export const isAdminOrManager = (req, res, next) => {
    if (['admin', 'manager'].includes(req.user?.role)) return next();
    return res.status(403).json({ message: 'Admin or Manager access only' });
  };
  