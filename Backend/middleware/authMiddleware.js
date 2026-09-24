const protect = (req, res, next) => {
  console.log("Protect middleware running");
  next();
};

const adminOnly = (req, res, next) => {
  console.log("Admin middleware running");
  next();
};

export { protect, adminOnly };
