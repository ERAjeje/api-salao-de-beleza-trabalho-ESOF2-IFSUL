import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';

import { db } from './src/data/mongo.js';

import v1Route from './src/routes/routes.js';
import ClientRoute from './src/routes/clientRoutes.js';
import ProductRoute from './src/routes/productRoutes.js';
import ProcedureRoute from './src/routes/procedureRoutes.js';

import swaggerUi from 'swagger-ui-express';
import swaggerJsDoc from 'swagger-jsdoc';

// Extended: https://swagger.io/specification/#infoObject
const swaggerOpbions = {
    swaggerDefinition: {
        info: {
            title: "API Salão de Beleza",
            description: "Salão de Beleza API documentation",
            version: "0.1.0",
            contact: {
                name: "Edson Ajeje, Thayron Oliveira"
            },
            license: {
                name: "MIT",
                url: "https://mit-license.org/"
            },
            servers: [
                {
                    url: "https://localhost:3000",
                    description: "A Development server"
                }
            ]
        },
        definitions: {
            user: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        required: true
                    },
                    cpf: {
                        type: "string",
                        required: true
                    },
                    email: {
                        type: "string",
                        required: true
                    },
                    password: {
                        type: "string",
                        required: true
                    }
                },
                examples: {
                    id: "5facaccf382bab01c0092586",
                    name: "Edson Ajeje",
                    email: "edson1@ajeje.com",
                    createdAt: "2020-11-12T03:32:31.826Z",
                    updatedAt: "2020-11-12T03:32:31.826Z",
                    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjoiNWZhY2FjY2YzODJiYWIwMWMwMDkyNTg2IiwiaWF0IjoxNjA1MTUxOTUxLCJleHAiOjE2MDUyMzgzNTF9.JQ4zKArfT8yZckM4BQXXbA20S-L3Wi4VAouvgt_6h7c"
                }
            },
            product: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        uppercase: true,
                        unique: true,
                        required: true
                    },
                    description: {
                        type: "string",
                        required: true
                    },
                    type: {
                        type: "string",
                        required: true
                    },
                    unitQuantity: {
                        type: "number",
                        required: true
                    },
                    purchasePrice: {
                        type: "number",
                        required: true
                    }
                }
            },
            procedure: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        uppercase: true,
                        unique: true,
                        required: true
                    },
                    type: {
                        type: "string",
                        required: true
                    },
                    description: {
                        type: "string",
                        required: true
                    },
                    products: {
                        type: "array",
                        properties: {
                            productId: {
                                type: "string",
                                required: true,
                                unique: true
                            },
                            unit: {
                                type: "string",
                                required: true
                            },
                            amount: {
                                type: "number",
                                required: true
                            },
                            required: true,
                        }
                    }
                }
            },
            procedures: {
                type: "object",
                properties: {
                    procedureId: {
                        type: "string"
                    },
                    userId: {
                        type: "string"
                    },
                    date: {
                        type: "string"
                    },
                    hour: {
                        type: "string"
                    }
                }
            },
            productItem: {
                type: "object",
                properties: {
                    productId: {
                        type: "string",
                        required: true,
                        unique: true
                    },
                    unit: {
                        type: "string",
                        required: true
                    },
                    amount: {
                        type: "number",
                        required: true
                    }
                }
            },
            client: {
                type: "object",
                properties: {
                    name: {
                        type: "string",
                        required: true
                    },
                    cpf: {
                        type: "string",
                        required: true
                    },
                    cellphone: {
                        type: "string",
                        required: true
                    },
                    email: {
                        type: "string",
                        required: true
                    },
                    password: {
                        type: "string",
                        required: true
                    },
                    procedures: {
                        type: "array",
                        properties: {
                            procedureId: {
                                type: "string"
                            },
                            userId: {
                                type: "string"
                            },
                            date: {
                                type: "string"
                            },
                            hour: {
                                type: "string"
                            }
                        }
                    }
                }
            },
        },
        schemes: ["http"],
        securityDefinitions: {
            api_key: {
                type: "http",
                scheme: "bearer",
                bearerFormat: "JWT",
                in: "header"
            },
        }
    },
    apis: ["index.js"]
};

const app = express();
app.use(bodyParser.json());
app.use(cors({
    "origin": "*",
    "methods": "GET,PUT,POST,DELETE"
}));

const swaggerDocs = swaggerJsDoc(swaggerOpbions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


// Routes
/**
 * @swagger
 * /v1/:
 *  get:
 *      description: Use to test API up
 *      responses:
 *          '200':
 *              description: A seccessful response
 * /v1/signup:
 *  post:
 *      description: Use to Signup into API
 *      parameters: 
 *      - in: "body"
 *        name: "json"
 *        description: "A user object that needs to be added to the API"
 *        required: true
 *        schema:
 *          $ref: "#/definitions/user"
 *      responses:
 *          '200':
 *              description: A seccessful response
 * /v1/login:
 *  get:
 *      description: Use to Login into API
 *      parameters: 
 *      - in: "header"
 *        name: "Basic Auth"
 *        description: "A user object that needs to be added to the API. Uses a base64 hash formed of the email and password."
 *        required: true
 *        schema:
 *          $ref: "#/definitions/user"
 *      responses:
 *          '200':
 *              description: A seccessful response
 * /v1/users:
 *  get:
 *      description: Use to Login into API
 *      parameters: 
 *      - in: "header"
 *        name: "Bearer Token"
 *        description: "A user object that needs to be added to the API. Need a JWT token received at login."
 *        required: true
 *        schema:
 *          $ref: "#/definitions/user"
 *      responses:
 *          '200':
 *              description: A seccessful response
 * /v1/me:
 *  get:
 *      description: Use to Login into API
 *      parameters: 
 *      - in: "header"
 *        name: "Bearer Token"
 *        description: "A Bearer token into de header authorization"
 *        required: true
 *        schema:
 *          $ref: "#/definitions/user"
 *      responses:
 *          '200':
 *              description: A seccessful response
 */
app.use('/v1', v1Route);

// Routes
/**
 * @swagger
 * /v1/products/:
 *  get:
 *      description: Use to get all products in API
 *      parameters:
 *        schema:
 *          $ref: "#/definitions/product"
 *      responses:
 *          '200':
 *              description: A seccessful response 
 *  post:
 *      description: Use to create a products in API
 *      parameters:
 *      - in: "header"
 *        name: "Token"
 *        description: "A Bearer token into de header authorization"
 *        required: true
 *      - in: "body"
 *        name: "json"
 *        description: "A product object that needs to be added to the API"
 *        required: true
 *        schema:
 *          $ref: "#/definitions/product"
 *      responses:
 *          '200':
 *              description: A seccessful response 
 * /v1/products/id:
 *  get:
 *      description: Use to get all products in API
 *      parameters:
 *      - in: "header"
 *        name: "Bearer Token"
 *        description: "A Bearer token into de header authorization"
 *        required: true
 *      - in: "body"
 *        name: "id"
 *        type: "string"
 *        description: "A product object that needs to be added to the API. Need json object { 'id': 'string' }"
 *        required: true
 *      responses:
 *          '200':
 *              description: A seccessful response 
 * /v1/products/name:
 *  get:
 *      description: Use to get all products in API
 *      parameters:
 *      - in: "header"
 *        name: "Bearer Token"
 *        description: "A Bearer token into de header authorization"
 *        required: true
 *      - in: "body"
 *        name: "name"
 *        type: "string"
 *        description: "A product object that needs to be added to the API. Need json object { 'name': 'string' }"
 *        required: true
 *      responses:
 *          '200':
 *              description: A seccessful response 
 * /v1/products/type:
 *  get:
 *      description: Use to get all products in API
 *      parameters:
 *      - in: "header"
 *        name: "Bearer Token"
 *        description: "A Bearer token into de header authorization"
 *        required: true
 *      - in: "body"
 *        name: "json"
 *        type: "string"
 *        description: "A product object that needs to be added to the API. Need json object { 'type': 'string' }"
 *        required: true
 *      responses:
 *          '200':
 *              description: A seccessful response 
 * /v1/products/update:
 *  put:
 *      description: Use to get all products in API
 *      parameters:
 *      - in: "header"
 *        name: "Bearer Token"
 *        description: "A Bearer token into de header authorization"
 *        required: true
 *      - in: "body"
 *        name: "json"
 *        type: "string"
 *        description: "A product object that needs to be updated to the API."
 *        required: true
 *      responses:
 *          '200':
 *              description: A seccessful response 
 * /v1/products/delete:
 *  delete:
 *      description: Use to get all products in API
 *      parameters:
 *      - in: "header"
 *        name: "Bearer Token"
 *        description: "A Bearer token into de header authorization"
 *        required: true
 *      - in: "body"
 *        name: "json"
 *        type: "string"
 *        description: "A product object that needs to be delete in the API. Need json object { 'id': 'string' }"
 *        required: true
 *      responses:
 *          '200':
 *              description: A seccessful response 
 * 
 */
app.use('/v1/products', ProductRoute);

// Routes
/**
 * 
 * @swagger
 * /v1/clients:
 *  get:
 *      description: Use to get all clients in API
 *      parameters:
 *      - in: "header"
 *        name: "Bearer Token"
 *        description: "A Bearer token into de header authorization"
 *        required: true
 *      responses:
 *          '200':
 *              description: A seccessful response 
 * /v1/clients/login:
 * get:
 *     description: Use to Client Login into API
 *     parameters: 
 *     - in: "header"
 *       name: "Basic Auth"
 *       description: "A user object that needs to be added to the API. Uses a base64 hash formed of the email and password."
 *       required: true
 *       schema:
 *         $ref: "#/definitions/client"
 *     responses:
 *         '200':
 *             description: A seccessful response
 * 
 */
app.use('/v1/client', ClientRoute);

app.use('/v1/procedure', ProcedureRoute);

app.listen(3001, async () => {
    console.log("api em funcionamento");
    try {
        await db.mongoose.connect(db.url, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("conectado ao banco com sucesso.");
    } catch (err) {
        console.log("error: " + err);
        process.exit();
    }
})