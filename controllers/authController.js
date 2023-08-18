const contributorModel = require("../models/contributorModel");
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.registerController = async (req, res) => {
  const { role } = req.body;
  if (role === "user") {
    try {
      const { username, email, password } = req.body;
      //validation
      if (!username || !email || !password) {
        return res.status(400).send({
          success: false,
          message: "Please Fill all fields",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const user = new userModel({ username, email, password: hashedPassword });
      await user.save();
      const token = await user.createJWT()
      return res.status(201).send({
        success: true,
        message: "New User Created",
        details:user,
        token
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Error In Register callback",
        success: false,
        error,
      });
    }
  } else if (role === "contributor") {
    try {
      const { username, email, password } = req.body;
      //validation
      if (!username || !email || !password) {
        return res.status(400).send({
          success: false,
          message: "Please Fill all fields",
        });
      }
      const hashedPassword = await bcrypt.hash(password, 10);
      const contributor = new contributorModel({
        username,
        email,
        password: hashedPassword,
      });
      await contributor.save();

      const token = await contributor.createJWT()

      return res.status(201).send({
        success: true,
        message: "New contributor Created",
        details:contributor,
        token
      });
    } catch (error) {
      console.log(error);
      return res.status(500).send({
        message: "Error In Register callback",
        success: false,
        error,
      });
    }
  }
};

exports.loginController = async (req, res) => {
  const { role, email, password } = req.body;
  if (!email || !password) {
    return res.status(401).send({
      success: false,
      message: "Please provide email/password",
    });
  }
  if (role === "user") {
    
    try {
      const user = await userModel.findOne({ email });
      if (!user) {
        return res.status(200).send({
          success: false,
          message: "Invalid Credentials",
        });
      }
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(401).send({
          success: false,
          message: "Invalid Credentials",
        });
      }
      const token = await user.createJWT();
      return res.status(200).send({
        success: true,
        message: "Login successful",
        details:user,
        token,
      });
    }
    catch(error) {
      return res.status(500).json({
        success:false,
        msg:'Login Failed'
      })
    }

  } else if (role === "contributor") {
    const contributor = await contributorModel.findOne({ email });
    if (!contributor) {
      return res.status(200).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const isMatch = await bcrypt.compare(password, contributor.password);
    if (!isMatch) {
      return res.status(401).send({
        success: false,
        message: "Invalid Credentials",
      });
    }
    const token = contributor.createJWT();
    return res.status(200).send({
      success: true,
      message: "Login successful",
      details:contributor,
      token,
    });
  } else {
    return res.status(500).send({
      success: false,
      message: "Login failed",
    });
  }
};
