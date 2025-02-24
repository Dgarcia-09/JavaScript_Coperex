import { body, param } from "express-validator";
import { emailExists, usernameExists, userExists } from "../helpers/validar-db.js";
import { validarCampos } from "./validar-campos.js";
import { handleErrors } from "./handle-errors.js";
import {validateJWT} from "./validar-jwt.js"

export const registerValidator = [
    body("username").notEmpty().withMessage("El username es requerido"),
    body("email").notEmpty().withMessage("El email es requerido"),
    body("email").isEmail().withMessage("No es un email válido"),
    body("email").custom(emailExists),
    body("username").custom(usernameExists),
    body("password").isStrongPassword({
        minLength: 8,
        minLowercase:0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols:0
    }),
    validarCampos,
    handleErrors
]

export const loginValidator = [
    body("email").optional().isEmail().withMessage("No es un email válido"),
    body("username").optional().isString().withMessage("Username es en formáto erróneo"),
    body("password").isLength({min: 8}).withMessage("El password debe contener al menos 8 caracteres"),
    validarCampos,
    handleErrors
]

export const updatePasswordValidator = [
    validateJWT,
    param("uid").custom(userExists),
    body("newPassword").isStrongPassword({
        minLength: 8,
        minLowercase:0,
        minUppercase: 0,
        minNumbers: 0,
        minSymbols: 0
    }),
    validarCampos,
    handleErrors
]

