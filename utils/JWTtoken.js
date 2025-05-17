

export const GenerateJwtToken = (user, message, statusCode, res)=>{
    const Token = user.GenerateJsonWebToken();
    const CookieName  = user.role === 'Admin'?"AdminToken": "PatientToken";
    res.status(statusCode).cookie(CookieName,Token,{
        expires: new Date(Date.now()+ process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000), // day*hr*min*s*ms
        httpOnly:true,  
    }).json({
        message:message,
        success:true,
        user,
        Token,
    });
} 