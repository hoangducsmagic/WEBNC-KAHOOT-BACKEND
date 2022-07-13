module.exports = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || "error";

    if (err.isOperational) {
        res.status(err.statusCode).json({
            status: err.status,
            message: err.message,
        });
    } else {
        console.error('💥 ERROR: ', err);
        res.status(500).json({
            status: 'Unhandled Error',
            message: err,
        }); 
    }
    
};
