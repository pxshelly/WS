const express = require('express');
const app = express();
const port = process.env.PORT || 3000;
const path = require('path');
const { getItemById } = require('./controllers');

app.use(express.static(path.join(__dirname, '../dist/')));

app.get('/api/products/:id', (req, res) => {
  const { id } = req.params;
  const item = getItemById(id);

  if (item) {
    res.status(200).send(item);
  } else {
    res.status(404).send(`Product '${id}' cannot be found.`);
  }
});

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../dist/index.html'));
});

app.listen(port, () => console.log(`Server listening on ${port}`));