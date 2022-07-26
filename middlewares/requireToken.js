import jwt from "jsonwebtoken";
export const requireToken = (req, res, next) => {
  try {
    let token = req.headers?.authorization;

    console.log(token);
    if (!token) throw new Error("No existe el token en el header usar bearer");
    token = token.split(" ")[1];
    const { uid } = jwt.verify(token, process.env.JWT_SECRET);
    req.uid = uid;
    next();
  } catch (error) {
    console.log(error.message);
    const TokenVerificationErrors = {
      ["invalid signature"]: "La firma del JWT no es válida",
      ["jwt expired"]: "JWT expirado",
      ["invalid token"]: "Token no válido",
      ["No Bearer"]: "Utilizar formato Bearer",
    };
    return res
      .status(401)
      .json({ error: TokenVerificationErrors[error.message] });
  }
};
