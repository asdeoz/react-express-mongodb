const swaggerJsDoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        info: {
            title: 'KIT API',
            version: '1.0.0',
            description: 'KIT API for use with any front end.'
        },
    },
    apis: ['server.js', 'swaggerOptions.js'],
};

module.exports = swaggerJsDoc(options);