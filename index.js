var html_to_pdf = require('html-pdf-node');
const fs = require('fs');
const express = require('express');
const app = express();
var cors = require('cors');


app.use(
    cors({
        credentials: true,
        origin: true
    })
);
app.use(express.urlencoded({ extended: true }))

app.options('*', cors());

app.get('', async (req, res) => {
    console.log(path.join(__dirname + '/../../SpotifyGuessHTML/index.html'));
    res.sendFile(path.join(__dirname + '/../../SpotifyGuessHTML/index.html'));
})

app.get('/search', async (req, res) => {
    search = req.query.q;
    var file = { url: search };
    html_to_pdf.generatePdf(file, options).then(pdfBuffer => {       
        res.send(pdfBuffer)
    });
});


app.listen(process.env.PORT || 30850, function () {
    console.log('server running on port 30850', '');
});


let options = { format: 'A4' };
// Example of options with args //
// let options = { format: 'A4', args: ['--no-sandbox', '--disable-setuid-sandbox'] };

// var file = { content: "<h1>Welcome to html-pdf-node</h1>" };
// or //
