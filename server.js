require('dotenv').config();

const Db = require('./server/db/db');
const express = require('express');
const app = express();
const port = process.env.PORT || 3001;

const v1 = require('./server/routes/v1');

const specs = require('./server/docs/swaggerOptions.js');
const swaggerUi = require('swagger-ui-express');

app.use(express.json());

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

app.get('/courses', (req, res) => {
    Db.Get().then(result => {
        res.send(result);
    }, (err) => {
        res.sendStatus(500);
    });
});

app.use('/v1', v1);

app.listen(port, () => `Listening on port ${port}`);

