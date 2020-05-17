const http = require('http');

const servidor = http.createServer((req, resp) => {
    
    let html = '';

    if (req.url == '/') {
        html = `
            <html>
                <head>
                    <meta charset='utf-8'>
                </head>
                <body>
                    <h1>Livraria do Tio Candinho</h1>
                </body>
            </html>
        `;    
    } else if ('/livros') {
        html = `
            <html>
                <head>
                    <meta charset='utf-8'>
                </head>
                <body>
                    <h1>Livros do Tio Candinho</h1>
                </body>
            </html>
        `;    
    }

    resp.end(html);
});

servidor.listen(3000);
