const jwt=require( 'jsonwebtoken');

module.exports= function (req, res, next) {
  const accessToken = req.headers['x-webnc-kahoot-access-token'];
  if (accessToken) {
    try {
      const jwtOptions = {
        ignoreExpiration: true,
      };
      const decoded = jwt.verify(accessToken, process.env.SECRET_KEY,jwtOptions);
      if (new Date().getTime()>decoded.exp*1000){
        return res.status(401).json({
          message: 'Invalid accessToken',
          expired:true
        });
      }
      req.user = decoded;
      next();
    } catch (err) {
      console.error(err);
      return res.status(401).json({
        message: 'Invalid accessToken'
      });
    }
  } else {
    return res.status(401).json({
      message: 'AccessToken not found.'
    })
  }
}