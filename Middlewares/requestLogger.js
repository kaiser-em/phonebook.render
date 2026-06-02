
const requestLogger = (req, res, next)=>{
    console.log('Method', req.method)
    console.log('Path:', req.path)
    console.log('body:', req.body)
    console.log('---')
    next()
}

export default requestLogger