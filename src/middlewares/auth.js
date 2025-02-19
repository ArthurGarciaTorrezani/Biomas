export default async (req, res, next) => {
     if (req.session.user) {
       return next();
     }
     return res.status(401).json({
       success: false,
       error: "Você precisa se logar",
       status: 401
     });
   };