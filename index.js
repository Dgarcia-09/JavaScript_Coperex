import {config} from "dotenv"
import {initServer} from "./configs/server.js"
import crearAdmin from "./src/auth/auth.controller.js"

config()
initServer()
crearAdmin()