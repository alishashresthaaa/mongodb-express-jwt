// check username, password in post(login) request
// if exist create new JWT
// send back to front end

// setup authentication so only the request with JWT can access the dashboard

// Before issuing the token check if username and password has been provided
// 1 - mongoose schema validation
// 2 - layer of validation sits before request - Joi
// 3 - checking value manually in controller --- we are using this

const jwt = require("jsonwebtoken");
const { BadRequestError } = require("../errors");

const login = async (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  if (!username || !password) {
    throw new BadRequestError(`Please provide email and password`);
  }
  // manual id is generated since it is not connected to db
  const id = new Date().getDate();
  // just for demo, for production use long unguessable string value
  const token = jwt.sign({ id, username }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
  res.status(200).json({ msg: "User Created", token });
};

const dashboard = async (req, res) => {
  const luckyNumber = Math.floor(Math.random() * 100);
  res.status(200).json({
    msg: `Hello, ${req.user.username}`,
    secret: `Here is your authorized data, your lucky number is ${luckyNumber}`,
  });
};

module.exports = {
  login,
  dashboard,
};
