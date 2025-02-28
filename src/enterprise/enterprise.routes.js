import { Router } from "express"
import { addEnterpriseValidator, updateEnterpriseValidator, getEnterprisesValidator, generateExcelValidator } from "../middlewares/enterprise-validator.js"
import { addEnterprise, updateEnterprise, getEnterprises, generateExcel} from "./enterprise.controller.js"

const router = Router()

/**
 * @swagger
 * /agregarEmpresa:
 *   post:
 *     summary: Agregar una nueva empresa
 *     tags: [Enterprise]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Empresa XYZ"
 *               impact:
 *                 type: string
 *                 enum: ["BAJO", "MEDIO", "ALTO"]
 *                 example: "MEDIO"
 *               foundingDate:
 *                 type: string
 *                 format: date
 *                 example: "2000-01-01"
 *               email:
 *                 type: string
 *                 example: "empresa@xyz.com"
 *               phone:
 *                 type: string
 *                 example: "12345678"
 *               category:
 *                 type: string
 *                 enum: ["TECNOLOGIA", "ALIMENTOS", "SALUD", "SERVICIOS", "CONSTRUCCION", "FINANZAS", "OTROS"]
 *                 example: "TECNOLOGIA"
 *               address:
 *                 type: string
 *                 example: "Calle Falsa 123"
 *     responses:
 *       201:
 *         description: Empresa agregada exitosamente
 *       400:
 *         description: Error de validación
 *       500:
 *         description: Error interno del servidor
 */
router.post("/agregarEmpresa", addEnterpriseValidator, addEnterprise)

/**
 * @swagger
 * /actualizarEmpresa/{id}:
 *   put:
 *     summary: Actualizar una empresa existente
 *     tags: [Enterprise]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: ID de la empresa
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 example: "Empresa XYZ"
 *               impact:
 *                 type: string
 *                 enum: ["BAJO", "MEDIO", "ALTO"]
 *                 example: "MEDIO"
 *               email:
 *                 type: string
 *                 example: "empresa@xyz.com"
 *               phone:
 *                 type: string
 *                 example: "12345678"
 *               category:
 *                 type: string
 *                 enum: ["TECNOLOGIA", "ALIMENTOS", "SALUD", "SERVICIOS", "CONSTRUCCION", "FINANZAS", "OTROS"]
 *                 example: "TECNOLOGIA"
 *               address:
 *                 type: string
 *                 example: "Calle Falsa 123"
 *     responses:
 *       200:
 *         description: Empresa actualizada exitosamente
 *       400:
 *         description: Error de validación
 *       404:
 *         description: Empresa no encontrada
 *       500:
 *         description: Error interno del servidor
 */
router.put("/actualizarEmpresa/:id", updateEnterpriseValidator,  updateEnterprise)

/**
 * @swagger
 * /filtrarEmpresas:
 *   get:
 *     summary: Obtener una lista de empresas
 *     tags: [Enterprise]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: query
 *         name: desde
 *         schema:
 *           type: integer
 *         description: Número de empresas a omitir
 *       - in: query
 *         name: filtro
 *         schema:
 *           type: string
 *           enum: ["trayectoria", "A-Z", "Z-A"]
 *         description: Filtro para ordenar las empresas
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *           enum: ["TECNOLOGIA", "ALIMENTOS", "SALUD", "SERVICIOS", "CONSTRUCCION", "FINANZAS", "OTROS"]
 *         description: Categoría de la empresa
 *     responses:
 *       200:
 *         description: Lista de empresas obtenida exitosamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/filtrarEmpresas", getEnterprisesValidator, getEnterprises)

/**
 * @swagger
 * /generarReporte:
 *   get:
 *     summary: Generar un reporte en Excel de las empresas
 *     tags: [Enterprise]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Reporte generado exitosamente
 *       500:
 *         description: Error interno del servidor
 */
router.get("/generarReporte",  generateExcelValidator, generateExcel)

export default router