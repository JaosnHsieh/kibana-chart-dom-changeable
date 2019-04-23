const express = require('express');
const app = express();

app.use((req, res, next) => {
  res.setHeader('Content-Security-Policy', `script-src 'none'`);
  return next();
});
app.get('/test', (req, res) => {
  res.type('.html');
  res.send(`<!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Document</title>
    </head>
    <body>
        <div id="test">test</div>
        
    </body>
    </html>`);
});

const port = 3334;
app.listen(port, () => console.log('listent to port ' + port));
