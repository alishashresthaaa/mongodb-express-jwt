const jwt = require("jsonwebtoken");
const { UnauthentiactedError } = require("../errors");

const authMiddleware = async (req, res, next) => {
  // While requesting for the route, the user add addtional param of authorization inside the headers object.
  // It is then accesed by using req params
  console.log(req.headers);
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    throw new UnauthentiactedError(`No token provided`);
  }

  // Get the token value
  const token = authHeader.split(" ")[1];
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    const { id, username } = decoded;
    req.user = { id, username };
    next();
  } catch (error) {
    throw new UnauthentiactedError("Not authorized to access this route");
  }
};

module.exports = authMiddleware;
