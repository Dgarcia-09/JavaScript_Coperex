import ExcelJS from "exceljs"
import Enterprise from "./enterprise.model.js"
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)



export const addEnterprise = async (req, res)=>{
    try {
        const { name, impact, foundingDate, email, phone, category, address } = req.body;
        const newEnterprise = new Enterprise({
            name, 
            impact,
            foundingDate,
            email,
            phone,
            category,
            address
        })

        await newEnterprise.save();

        return res.status(201).json({
            success: true, 
            message: "Su empresa ha sido agregada a nuestro sistema, tenga un excelente día :)",
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al agregar los datos de la empresa",
            error: err.message 
        })
    }
}

export const getEnterprises = async (req, res) => {
    try {
        const { desde = 0, filtro, category } = req.query
        const query = {}

        if (category) {
            query.category = category
        }

        let option = {}
        switch (filtro) {
            case "trayectoria":
                option = { foundingDate: 1 }
                break;
            case "A-Z":
                option = { name: 1 }
                break;
            case "Z-A":
                option = { name: -1 }
                break;
            default:
                option = {}
        }

        const [total, enterprises] = await Promise.all([
            Enterprise.countDocuments(query),
            Enterprise.find(query)
                .sort(option)
                .skip(Number(desde))
        ])

        const enterpriseTrajectory = enterprises.map(enterprise => {
            const enterpriseObject = enterprise.toObject();
            return {
                ...enterpriseObject,
                trajectory: enterprise.obtenerTrayectoria()
            }
        })

        return res.status(200).json({
            success: true,
            total,
            enterprises: enterpriseTrajectory
        })

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Error al listar las empresas",
            error: err.message
        })
    }
}



export const updateEnterprise = async (req, res)=>{
    try {
        const { id } = req.params;
        const data = req.body;
         
        const enterprise = await Enterprise.findById(id);

        if(!enterprise){
            return res.status(404).json({
                success: false,
                message: "No se encontró la empresa"
            })
        }

        const updateEnter = await Enterprise.findByIdAndUpdate(id, data, { new: true })

        res.status(200).json({
            success: true,
            message: "Se han actualizado los datos exitosamente",
            enterprise: updateEnter,
        });
    } catch (err) {
        res.status(500).json({
            success: false,
            message: "Error al actualizar los datos de la empresa",
            error: err.message
        })
    }
}



export const generateExcel = async (req, res)=>{
    try{
        const enterprises = await Enterprise.find()

        const workbook = new ExcelJS.Workbook()

        const worksheet = workbook.addWorksheet("Reporte")

        worksheet.columns = [
            { header: "Nombre", key: 'name', width: 30 },
            { header: "Impacto", key: 'impact', width: 20 },
            { header: "Categoria", key: 'category', width: 20 },
            { header: "Fecha fundacion", key: 'foundingDate', width: 20 },
            { header: "Email", key: 'email', width: 30 },
            { header: "Telefono", key: 'phone', width: 20 },
            { header: "Direccion", key: 'address', width: 30 }
        ]

        enterprises.forEach(enterprise =>{
            worksheet.addRow({
                name: enterprise.name,
                impact: enterprise.impact,
                foundingDate: enterprise.foundingDate,
                category: enterprise.category,
                email: enterprise.email,
                phone: enterprise.phone,
                address: enterprise.address
            })
        })

        const reportsExcel = path.join(__dirname, '../../public/reports')

        const fileName = `report-${Date.now()}.xlsx`;
        const filePath = path.join(reportsExcel, fileName)

        await workbook.xlsx.writeFile(filePath)

        const fileUrl = `/uploads/reports/${fileName}`;

        res.status(200).json({
            success: true,
            message: "Excel generado exitosamente",
            fileUrl
        })
    }catch(err){
        res.status(500).json({
            success: false,
            message: "Ha habido un error al generar el excel",
            error: err.message
        })
    }
}
