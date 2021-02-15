const Login = require("../services/Login");
module.exports = {
  async store(req, res) {
    try {
      const { email, password } = req.body;
      if (!email || !password)
        return res
          .status(400)
          .json({ message: "Email and Password is required" });

      const { user, token } = await Login({ email, password });

      return res.json({
        user,
        token,
      });
    } catch (error) {
      return res
        .status(error.status || 500)
        .json({ message: error.message || "Internal Server Error" });
    }
  },
};
