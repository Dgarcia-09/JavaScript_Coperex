import { Router } from "express"
import { addEnterpriseValidator, updateEnterpriseValidator } from "../middlewares/enterprise-validator.js"
import { addEnterprise, updateEnterprise, getEnterprises, generateExcel} from "./enterprise.controller.js"


const router = Router()

router.post("/agregarEmpresa", addEnterpriseValidator, addEnterprise)
router.put("/actualizarEmpresa/:id", updateEnterpriseValidator,  updateEnterprise)
router.get("/filtrarEmpresas", getEnterprises)
router.get("/generarReporte", generateExcel)

export default router