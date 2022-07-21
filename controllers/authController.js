const catchAsync = require("../utils/catchAsync");
const AppError = require("../utils/appError");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const secretKey = process.env.SECRET_KEY;
const bcrypt=require("bcrypt")
const randomstring=require("randomstring")

async function validateRefreshToken(userId, refreshToken) {
  var user = await User.findOne({
    _id: userId,
    refreshToken: refreshToken,
  });

  if (!user) {
    return false;
  }

  return true;
};



const register=catchAsync(async(req,res,next)=>{
  const {username,password} = req.body;

  // check user existance
  var user=await User.findOne({username:username});
  if (user){
    return next(new AppError(500,"User is existed!"))
  }

  var user=new User({
    username:username,
    password:password
  });
  user.password=await bcrypt.hash(password,10);
  user.save().then(result=>{
    delete result._doc.password
    res.status(201).json(result);
  })
})

const login = catchAsync(async (req, res, next) => {
  const user = await User.findOne({ username: req.body.username });
  if (user === null) {
    res.status(401).json({
      authenticated: false,
      message: "User is not existed!",
    });
  }

  const isValidPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!isValidPassword) {
    res.status(401).json({
      authenticated: false,
      message: "Wrong password!",
    });
  }

  delete user.password;

  const payload = {
    userId: user._id,
    username: user.username,
  };

  const jwtOptions = {
    expiresIn: process.env.JWT_EXPIRED_TIME,
  };

  const accessToken = jwt.sign(payload, secretKey, jwtOptions);

  const refreshToken = randomstring.generate(30) + Date.now().toString(16);

  await User.updateOne(
    { _id: user.user_id },
    {
      refreshToken: refreshToken,
    }
  );

  res.json({
    authenticated: true,
    accessToken,
    refreshToken,
  });
});

const refreshToken = catchAsync((req, res, next) => {
  const { accessToken, refreshToken } = req.body;
  try {
    const jwtOptions = {
      ignoreExpiration: true,
    };
    const { userId, username } = jwt.verify(
      accessToken,
      secretKey,
      jwtOptions
    );
    const isValidRefreshToken = validateRefreshToken(userId, refreshToken);
    if (isValidRefreshToken) {
      const payload = {
        userId,
        username,
      };
      const jwtOptions = {
        expiresIn: process.env.JWT_EXPIRED_TIME,
      };
      const newAccessToken = jwt.sign(payload, secretKey, jwtOptions);
      return res.json({
        accessToken: newAccessToken,
      });
    }

    return res.status(401).json({
      message: "refreshToken is revoked!",
    });
  } catch (err) {
    console.error(err);
    return res.status(401).json({
      message: "Invalid accessToken!",
    });
  }
});

module.exports = { login, refreshToken,register };
