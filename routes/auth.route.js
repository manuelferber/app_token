import express from "express";
import { login, register, infoUser } from "../controllers/auth.controller.js";
import { body, validationResult } from "express-validator";
import { validationResultExpress } from "../middlewares/validationResultExpress.js";
import { requireToken } from "../middlewares/requireToken.js";
const router = express.Router();

router.post(
  "/register",
  [
    body("email", "Formato de email incorreto")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password", "Minimo 8 caracteres").trim().isLength({ min: 8 }),
    body("password", "Formato de password incorrecto").custom(
      (value, { req }) => {
        if (value !== req.body.repassword) {
          throw new Error("No conciden las contraseñas");
        }
        return value;
      }
    ),
  ],
  validationResultExpress,
  register
);
router.post(
  "/login",
  [
    body("email", "Formato de email incorreto")
      .trim()
      .isEmail()
      .normalizeEmail(),
    body("password", "Minimo 8 caracteres").trim().isLength({ min: 8 }),
  ],
  validationResultExpress,
  login
);

router.get("/protected", requireToken, infoUser);

export default router;
