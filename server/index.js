const express = require('express');
const app = express();
const path = require('path');
const port = process.env.PORT || 8080;
const root = path.join(__dirname, '../dist/');

app.use(express.static(root));

app.get('/', (req, res) => {
  res.sendFile(`${root}index.html`);
});

app.listen(port, () => {
  console.log(`Started on localhost:${port}`);
});