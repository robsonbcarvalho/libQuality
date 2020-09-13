require('dotenv').config();
const { options } = require('./swagger/options.swagger.js')
const express = require('express');
const app = express();
const expressSwagger = require('express-swagger-generator')(app);
const statsController = require('./controllers/stats.controller');

app.get('/health', (request, response) => {
  response.json({
    uptime: process.uptime()
  }).status(200);
});

app.get('/api/v1/issues', statsController.getStats);
app.get('/collect_issues', statsController.collectLibIssues);

const port = process.env.PORT || 3000;
const stage = process.env.NODE_ENV || 'development'

expressSwagger(options);

app.listen(port, () => {
  console.log('='.repeat(80));
  console.log(`  ${process.env.APP_NAME} Service running on port ${port} [${stage.toUpperCase()} stage]`);
  console.log(`  MongoDB URI config: mongodb://${process.env.MONGODB_HOST}:${process.env.MONGODB_PORT}`);
  console.log(`  Start Time: ${new Date()}`);
  console.log('='.repeat(80));
});
