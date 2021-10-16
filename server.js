const express = require('express');
const path = require('path');
const app = express();
const DEFAULT_PORT = 3000;

const args = process.argv.slice(2);
const portArg = args.map(arg => arg.split('=')).find(arg => arg[0] === 'port');
const PORT = portArg && portArg[1] ? portArg[1] : DEFAULT_PORT;
const HOST = PORT === DEFAULT_PORT ? 'localhost' : '0.0.0.0';

app.use(express.static(path.join(__dirname, '/dist/')));

app.get('/*', function (req, res) {
  res.sendFile(path.join(__dirname, '/dist/index.html'));
});

app.listen(PORT, HOST);
