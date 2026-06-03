require('dotenv').config();
const fs = require('fs');
const path = require('path');

const appJsonPath = path.join(__dirname, 'app.json');
let appJsonRaw = fs.readFileSync(appJsonPath, 'utf8');
appJsonRaw = appJsonRaw.replace(/\/\*[\s\S]*?\*\//g, ''); // remove block comments
appJsonRaw = appJsonRaw.replace(/\/\/.*$/gm, ''); // remove line comments
const appJson = JSON.parse(appJsonRaw);

module.exports = () => ({
  ...appJson,
  expo: {
    ...appJson.expo,
    extra: {
      ...(appJson.expo?.extra || {}),
      API_URL: process.env.API_URL,
      AI_ENDPOINT: process.env.AI_ENDPOINT,
    },
  },
});