const express = require('express');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev, dir: './client' });
const handle = app.getRequestHandler();
const PORT = process.env.PORT || 3000;

app.prepare().then(() => {
  const server = express();

  server.get('*', (req, res) => handle(req, res));

  server.listen(PORT, err => {
    if (err) throw err;
    console.log(`> Ready On ${PORT}`);
  });
});
