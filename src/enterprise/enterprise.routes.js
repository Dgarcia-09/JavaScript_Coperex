import { Router } from "express"
import { addEnterprise } from "./enterprise.controller.js"


const router = Router()

router.post("/agregarEmpresa", addEnterprise)

export default router