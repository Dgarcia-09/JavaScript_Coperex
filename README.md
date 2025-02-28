# JavaScript_Coperex

Este proyecto es una API RESTful desarrollada con Node.js, Express y MongoDB que soluciona de  forma eficiente la incorporacion de nuevos socios y empresas a su feria "Interfer" 

## Características

- Inicio de Sesion: Registro e inicio de sesión con generación de tokens JWT.

- Registro de empresas: Se proporciona un formulario para que las empresas puedan registrarse a la feria.

- Visualizacion de las empresas: permite a los administradores listar y filtarr a todas las empresas

- Generacion de reportes: Se recompila la informacion de todas las empresas registradas y genera un reporte de excel

## Filtrar 

```
http://127.0.0.1:3001/coperex/v1/enterprise/filtrarEmpresas

```

Ejemplo de cómo usar la ruta:


Filtrar por categoría (sin ordenar ni paginar):

```

http://127.0.0.1:3001/coperex/v1/enterprise/filtrarEmpresas?category=tecnologia

```


Ordenar de la A a la Z 

```
http://127.0.0.1:3001/coperex/v1/enterprise/filtrarEmpresas?filtro=A-Z

```

Ordenar de la Z a la A 

```
http://127.0.0.1:3001/coperex/v1/enterprise/filtrarEmpresas?filtro=Z-A

```


Ordenar por trayectoria 

```
http://127.0.0.1:3001/coperex/v1/enterprise/filtrarEmpresas?filtro=trayectoria

```



## Uso

Puedes importar la colección de Postman incluida en el proyecto para probar fácilmente los endpoints.

```
Config/endpoint-colection

```



## Documentación de la API (Swagger)

La documentación completa de la API está disponible a través de Swagger. Puedes acceder a ella una vez que el servidor esté en funcionamiento.

### Ruta de acceso:

```
http://127.0.0.1:3001/api-docs

```



## Tecnologías

- Node.js

- Express

- MongoDB (Mongoose)

- JSON Web Tokens (JWT)

- Bcrypt.js (para el cifrado de contraseñas)


## Instalación

### Clona el repositorio:

```

git clone https://github.com/tu_usuario/gestor-opiniones.git

```

### Instala las dependencias:


```

npm install

```

### Configura las variables de entorno en un archivo .env:

```

PORT=3000
MONGO_URI=tu_conexion_mongo
SECRETORPRIVATEKEY=tu_secreto_jwt

```

Inicia el servidor:

```

npm run dev

```


