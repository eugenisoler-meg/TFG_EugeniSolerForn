require('dotenv').config();
const fs = require('fs');
const path = require('path');

const appJson = require('./app.json');

module.exports = ({ config }) => ({
  ...config,
  ...appJson,
  expo: {
    ...config.expo,
    ...appJson.expo,
    extra: {
      ...(appJson.expo?.extra || {}),
      API_URL: process.env.API_URL,
      AI_ENDPOINT: process.env.AI_ENDPOINT,
    },
  },
});