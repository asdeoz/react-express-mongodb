const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: 'Express API',
            version: '1.0.0',
            description: 'Express API for use with any front end.',
            contact: {
                email: 'asdeoz@github.com'
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