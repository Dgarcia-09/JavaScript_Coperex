import { body} from "express-validator";
import { handleErrors } from "./handle-errors.js";
import { validarCampos } from "./validar-campos.js";
import { validateJWT } from "./validar-jwt.js";
import { enterpriseExists } from "../helpers/validar-db.js";

export const addEnterpriseValidator = [
    validateJWT,
    body("name").custom(enterpriseExists).notEmpty().withMessage("El nombre de la empresa es requerido")
    .isLength({ max: 70 }).withMessage("El nombre de la empresa no debe superar los 70 caracteres"),
    body("impact", "El impacto de la empresa debe ser una de las siguientes: BAJO, MEDIO, ALTO").isIn(["BAJO", "MEDIO", "ALTO"]),
    body("foundingDate", "La fecha de fundacion debe ser una fecha valida en formato YYYY-MM-DD").isDate(),
    body("email", "El correo de la empresa es requerido").isEmail(),
    body("phone", "El telefono de la empresa es requerido").notEmpty()
    .isLength({ max: 8 }).withMessage("El telefono no debe superar los 8 caracteres"),
    body("category", "La categoria debe ser una de las siguientes: TECNOLOGIA, ALIMENTOS, SALUD, SERVICIOS, CONSTRUCCION, FINANZAS, OTROS").isIn(["TECNOLOGIA", "ALIMENTOS", "SALUD", "SERVICIOS", "CONSTRUCCION", "FINANZAS", "OTROS"]),
    body("address", "La direccion de la empresa es requerida").notEmpty()
    .isLength({ max: 150 }).withMessage("La direccion no debe superar los 150 caracteres"),
    validarCampos,
    handleErrors
]


export const updateEnterpriseValidator = [
    validateJWT,
    body("name").custom(enterpriseExists).notEmpty().withMessage("El nombre de la empresa es requerido")
    .isLength({ max: 70 }).withMessage("El nombre de la empresa no debe superar los 70 caracteres"),
    body("impact", "El impacto de la empresa debe ser una de las siguientes: BAJO, MEDIO, ALTO").isIn(["BAJO", "MEDIO", "ALTO"]),
    body("email", "El correo de la empresa es requerido").isEmail(),
    body("phone", "El telefono de la empresa es requerido").notEmpty()
    .isLength({ max: 8 }).withMessage("El telefono no debe superar los 8 caracteres"),
    body("category", "La categoria debe ser una de las siguientes: TECNOLOGIA, ALIMENTOS, SALUD, SERVICIOS,CONSTRUCCION, FINANZAS, OTROS").isIn(["TECNOLOGIA", "ALIMENTOS", "SALUD", "SERVICIOS", "CONSTRUCCION", "FINANZAS", "OTROS"]),
    body("address", "La direccion de la empresa es requerida").notEmpty()
    .isLength({ max: 150 }).withMessage("La direccion no debe superar los 150 caracteres"),
    validarCampos,
    handleErrors
]

export const getEnterprisesValidator =[
    validateJWT,
    validarCampos,
    handleErrors
]

export const generateExcelValidator = [
    validateJWT,
    validarCampos,
    handleErrors
]