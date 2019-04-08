const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: 'KIT API',
            version: '1.0.0',
            description: 'KIT API for use with any front end.',
            contact: {
                email: 'carles.garciabercial@phoenix.edu'
            }
        },
        host: 'localhost:3001',
        basePath: '/v1',
        tags: [
            {
                name: 'customers',
                description: 'CRUD operations for customers'
            },
            {
                name: 'example',
                description: 'example calls to the API'
            }
        ],
    },
    apis: ['server.js', 'swaggerOptions.js', 'swaggerModels.js', './server/routes/v1/*.js'],
};

module.exports = swaggerJsDoc(options);