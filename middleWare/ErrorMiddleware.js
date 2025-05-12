class Errorhandler extends Error{
    constructor(message,statusCode){
        super(message);
        this.statusCode = statusCode;
    }
}

export const ErrorMiddlewareMesg = (err,req, res, next)=>{
    err.message = err.message || "Internal Server Error";
    err.statusCode = err.statusCode || 500;
    
    if(err.status===11000){
       const message = "Duplicate values";
       err = new Errorhandler(message, 400);    
    }

    if(err.name==="JsonWebTokenError"){
        const message = "Json Webtoken Error.Try Again";
        err = new Errorhandler(message,400);
    }
    if(err.name==="TokenExpiredError"){
        const message = "Json Webtoken is expired.Try Again";
        err = new Errorhandler(message,400);
    }
    if(err.name==="CastError"){
    const message = `Invalid ${err.path}`;
        err = new Errorhandler(message,400);
    }

    const errMessageStg = err.errors ? Object.values(err.errors).map((error)=>error.message).join(", "):err.message;

    return res.status(err.statusCode).json({
        success: false,
        message : errMessageStg,
    });

}

export default Errorhandler;