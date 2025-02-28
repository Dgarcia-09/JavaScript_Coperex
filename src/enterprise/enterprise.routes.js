import { Router } from "express"
import { addEnterpriseValidator } from "../middlewares/enterprise-validator.js"
import { addEnterprise } from "./enterprise.controller.js"


const router = Router()

router.post("/agregarEmpresa", addEnterpriseValidator, addEnterprise)

export default router