const { User } = require("../models/index");
const AppError = require('../Errors/AppError')
module.exports = async ({email, password}) => {
  const user = await User.findOne({ where: { email } });
  if (!user)
    throw new AppError(404, 'User not found')
  
  if (!(await user.checkPassword(password)))
    throw new AppError(401, 'Incorrect password')
  
  return {user, token: user.generateToken()}
};
