module.exports = (err, req, res ,next)=>{
    const code = err.code || 500
    res.status(code).json({
        status: 'failed',
        message: err.message
   })
}