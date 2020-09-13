require('dotenv').config();
const port = process.env.PORT || 3000;

exports.options = {
  swaggerDefinition: {
    info: {
      description: 'API Documentation',
      title: 'Lib Quality',
      version: '1.0.0',
    },
    host: `localhost:${port}`,
    basePath: '/',
    produces: [
      "application/json",
    ],
    schemes: ['http', 'https'],
    securityDefinitions: {
      JWT: {
        type: 'apiKey',
        in: 'header',
        name: 'Authorization',
        description: "",
      }
    }
  },
  basedir: __dirname,
  files: ['../controllers/*.js', './*.js']
};
