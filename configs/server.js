import express from "express";
import cors from "cors"
import helmet from "helmet"
import morgan from "morgan"
import {dbConnection} from "./mongo.js"
import authRoutes from "../src/auth/auth.routes.js"
import userRoutes from "../src/user/user.routes.js"
import enterRoutes from "../src/enterprise/enterprise.routes.js"
import apiLimiter from "../src/middlewares/rate-limit-validator.js";
import {swaggerDocs, swaggerUi} from "./swagger.js"


const middlewares = (app) =>{
    app.use(express.urlencoded({extended: false}));
    app.use(express.json());
    app.use(cors());
    app.use(helmet());
    app.use(morgan("dev"));
    app.use(apiLimiter);

}

const routes = (app) =>{
    app.use("/coperex/v1/auth", authRoutes)
    app.use("/coperex/v1/user", userRoutes)
    app.use("/coperex/v1/enterprise", enterRoutes)
    app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs))
}

const conectarDb = async () =>{
    try{
        await dbConnection()

    }catch(err){
        console.log(`Database connection failed: ${err}`)
        process.exit(1)
    }
}

export const initServer = () =>{
    const app = express()
    try{
        middlewares(app);
        conectarDb();
        routes(app);
        const port = process.env.PORT || 3001;
        app.listen(port, () =>{
            console.log(`Server running on port ${port}`)
        })


    }catch(err){
        console.log(`Server init failed: ${err}`)
    }
}