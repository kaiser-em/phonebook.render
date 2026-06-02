const errorHandler = (error, req, res, next) => {
    console.log('ERROR:', error.message)

    if(error.name ==='CastError'){
        res.status(404).json('error: malformatted ifd')

    }
    if(error.name === 'ValidationError'){
        console.log(error.message)
        res.status(500).json({error : error.message})
    }
}

export default errorHandler