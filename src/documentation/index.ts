import { SERVER_HOST, SERVER_PORT } from '../secret/secret'
import swaggerJSDoc, { OAS3Definition } from 'swagger-jsdoc'




const swaggerDefinition: OAS3Definition = {
    openapi: '3.0.3',
    info: {
        title: "API ficha RPG ",
        description: "API",
        version: "1.0.0"
    },
    components: {
        securitySchemes: {
            bearerAuth: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT"
            }
        }
    },
    servers: [
        {
            url: `http://${SERVER_HOST}:${SERVER_PORT}`,
        },
    ],
}

const options: swaggerJSDoc.Options = {
    swaggerDefinition,
    apis: ['./src/routes/*.routes.ts', 'src/entities/**/*.ts']
}
export const swaggerSpec = swaggerJSDoc(options)
