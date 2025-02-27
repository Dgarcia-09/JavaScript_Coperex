import Enterprise from "./enterprise.model.js";

export const addEnterprise = async (req, res) => {
    try {
        const { name, impact, foundingDate, email, phone, address } = req.body;
        const newEnterprise = new Enterprise({
            name, 
            impact,
            foundingDate,
            email,
            phone,
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

