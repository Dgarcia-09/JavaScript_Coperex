import Enterprise from "./enterprise.model.js";

export const addEnterprise = async (req, res) => {
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
        ]);

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


export const updateEnterprise = async (req, res) => {
    try {
        const { id } = req.params;
        const  data  = req.body;
         
        const enterprise = await Enterprise.findById(id);

        if(!enterprise){
            return res.status(404).json({
                success: false,
                message: "No se  encontro la empresa"
            })
        }

        const updateEnter = await Enterprise.findByIdAndUpdate(id, data, { new: true });

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
        });
    }
}




